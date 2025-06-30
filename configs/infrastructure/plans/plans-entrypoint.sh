#!/bin/bash

echo "+----------------------------------------------+"
echo "|    Initializing MongoDB Entrypoint Script    |"
echo "+----------------------------------------------+"

mongosh <<EOF
use admin

// Initialize the replica set
rs.initiate()

// Wait for replica set initiation
while (!rs.isMaster().ismaster) {
	sleep(1000);
}

// Create the admin user
db.createUser({
	user: "admin",
	pwd: "$PLANS_ADMIN_PASSWORD",
	roles: ["root"]
})

// Create a read-only user
db.createUser({
	user: "read",
	pwd: "$PLANS_READ_PASSWORD",
	roles: [ { role: "read", db: "production" } ]
})

// Create a read-write user
db.createUser({
	user: "write",
	pwd: "$PLANS_WRITE_PASSWORD",
	roles: [ { role: "readWrite", db: "production" } ]
})
EOF

echo "+----------------------------------------------+"
echo "|      MongoDB replica set initialized         |"
echo "+----------------------------------------------+"