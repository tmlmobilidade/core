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
	pwd: "admin",
	roles: ["root"]
})

// Create a read-only user
db.createUser({
	user: "read",
	pwd: "read",
	roles: [ { role: "read", db: "production" } ]
})

// Create a read-write user
db.createUser({
	user: "write",
	pwd: "write",
	roles: [ { role: "readWrite", db: "production" } ]
})
EOF

echo "+----------------------------------------------+"
echo "|      MongoDB replica set initialized         |"
echo "+----------------------------------------------+"