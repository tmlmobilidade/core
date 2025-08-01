#!/bin/bash

set -euo pipefail

echo "+----------------------------------------------+"
echo "|    Initializing MongoDB Entrypoint Script    |"
echo "+----------------------------------------------+"

# ================================
# Configurable parameters
# ================================
REPLICA_SET_NAME="rs0"

PRIMARY_HOST="mongo1:27017"
SECONDARY1_HOST="mongo2:27017"
SECONDARY2_HOST="mongo3:27017"

MONGO_INIT_RETRY_DELAY=5
MONGO_INIT_MAX_RETRIES=30

OUTPUT_DIR="/secrets"
ENV_FILE="$OUTPUT_DIR/.env"

collections=( agencies alerts files roles sessions users verification_tokens plans validations census districts localities municipalities parishes )

mkdir -p "$OUTPUT_DIR"
: > "$ENV_FILE"

# ================================
# Helper functions
# ================================
# Define allowed characters for passwords (only alphanumeric characters since MongoDB transforms special characters)
ALLOWED_CHARACTERS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

# Function to generate a random password of given length
generate_password() {
    local length=$1
    local password=""
    for i in $(seq 1 $length); do
        # Generate a random index based on the length of ALLOWED_CHARACTERS
        local index=$((RANDOM % ${#ALLOWED_CHARACTERS}))
        # Append the character at the random index to the password
        password="${password}${ALLOWED_CHARACTERS:$index:1}"
    done
    echo "$password"
}

# Function to get password from .env file or generate a new one
get_or_generate_password() {
    local username=$1
    local var_name="${username}_PASSWORD"
    local password=""
    
    # Check if .env file exists and contains the password
    if [[ -f "$ENV_FILE" ]] && grep -q "^${var_name}=" "$ENV_FILE"; then
        # Extract password from existing .env file
        password=$(grep "^${var_name}=" "$ENV_FILE" | cut -d'=' -f2)
        echo "======> Using existing password for $username"
    else
        # Generate new password
        password=$(generate_password 30)
        echo "${var_name}=${password}" >> "$ENV_FILE"
        echo "======> Generated new password for $username"
    fi
    
    # Export the password as environment variable
    export "${var_name}"="$password"
}

to_uppercase() {
  echo "$1" | tr '[:lower:]' '[:upper:]'
}

# ================================
# Load existing .env or create new file
# ================================
if [[ -f "$ENV_FILE" ]]; then
    echo "======> Found existing .env file, loading existing passwords..."
    # Source the existing .env file to load variables
    set -a  # automatically export all variables
    source "$ENV_FILE"
    set +a  # turn off automatic export
else
    echo "======> Creating new .env file..."
    touch "$ENV_FILE"
fi

# ================================
# Generate passwords
# ================================
echo "======> Generating user passwords..."

# General users
for user in ADMIN READ WRITE BACKUP; do
  get_or_generate_password "$user"
done

# Collection-based users
for coll in "${collections[@]}"; do
  for role in READER WRITER ADMIN; do
    get_or_generate_password "$(to_uppercase "$coll")_${role}"
  done
done

# ================================
# Initiate replica set
# ================================
echo "======> Initiating replica set..."
mongosh --host "$PRIMARY_HOST" <<EOF
rs.initiate({
  _id: "$REPLICA_SET_NAME",
  members: [
    { _id: 0, host: "$PRIMARY_HOST", priority: 1 },
    { _id: 1, host: "$SECONDARY1_HOST", priority: 0.5 },
    { _id: 2, host: "$SECONDARY2_HOST", priority: 0.5 }
  ]
})
EOF

# ================================
# Wait for PRIMARY
# ================================
echo "======> Waiting for PRIMARY to be elected..."
for ((i=1;i<=MONGO_INIT_MAX_RETRIES;i++)); do
  STATUS=$(mongosh --quiet --host "$PRIMARY_HOST" --eval 'rs.isMaster().ismaster')
  if [[ "$STATUS" == "true" ]]; then
    echo "======> PRIMARY is ready."
    break
  fi
  echo "======> Waiting ($i/$MONGO_INIT_MAX_RETRIES)..."
  sleep "$MONGO_INIT_RETRY_DELAY"
done

if [[ "$STATUS" != "true" ]]; then
  echo "======> Replica set initialization timed out."
  exit 1
fi

# ================================
# Generate JS snippets for roles and users
# ================================
collection_list=$(printf '"%s",' "${collections[@]}")
collection_list="[${collection_list%,}]"

USER_CREATION_JS=""
for coll in "${collections[@]}"; do
  uc_coll=$(to_uppercase "$coll")
  reader_pass="${uc_coll}_READER_PASSWORD"
  writer_pass="${uc_coll}_WRITER_PASSWORD"
  admin_pass="${uc_coll}_ADMIN_PASSWORD"

  echo "======> Creating user ${coll}Reader..."
  echo "======> Creating user ${coll}Writer..."
  echo "======> Creating user ${coll}Admin..."

  USER_CREATION_JS+="
  db.createUser({ user: '${coll}Reader', pwd: '${!reader_pass}', roles: ['${coll}Reader'] });
  db.createUser({ user: '${coll}Writer', pwd: '${!writer_pass}', roles: ['${coll}Writer'] });
  db.createUser({ user: '${coll}Admin', pwd: '${!admin_pass}', roles: ['${coll}Admin'] });
"
done

# ================================
# Create roles and users
# ================================
echo "======> Creating roles and users..."

mongosh --host "$PRIMARY_HOST" <<EOF
const collections = $collection_list;

db = db.getSiblingDB("production");

collections.forEach(coll => {
  db.createRole({
    role: coll + "Reader",
    privileges: [{ resource: { db: "production", collection: coll }, actions: ["find"] }],
    roles: []
  });

  db.createRole({
    role: coll + "Writer",
    privileges: [{ resource: { db: "production", collection: coll }, actions: ["insert", "update", "remove"] }],
    roles: [coll + "Reader"]
  });

  db.createRole({
    role: coll + "Admin",
    privileges: [{ resource: { db: "production", collection: coll }, actions: ["createIndex"] }],
    roles: [coll + "Reader", coll + "Writer"]
  });
});

echo "======> Creating users Custom Users..."

$USER_CREATION_JS

db.createUser({
  user: "admin",
  pwd: "$ADMIN_PASSWORD",
  roles: ["root"]
});

db.createUser({
  user: "read",
  pwd: "$READ_PASSWORD",
  roles: ["read"]
});

db.createUser({
  user: "write",
  pwd: "$WRITE_PASSWORD",
  roles: ["readWrite"]
});

db.createUser({
  user: "backup",
  pwd: "$BACKUP_PASSWORD",
  roles: [{ role: "read", db: "production" }]
});
EOF

echo "+----------------------------------------------+"
echo "|  MongoDB initialization completed            |"
echo "|  Passwords saved in:                         |"
echo "|     $ENV_FILE                                |"
echo "|     $LOG_FILE                                |"
echo "+----------------------------------------------+"