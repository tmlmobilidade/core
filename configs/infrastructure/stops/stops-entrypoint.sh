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
	pwd: "$STOPS_ADMIN_PASSWORD",
	roles: ["root"]
})

// Authenticate as admin to create other users
// db.auth("admin", "$STOPS_ADMIN_PASSWORD")

// Create a read-only user
db.createUser({
	user: "read",
	pwd: "$STOPS_READ_PASSWORD",
	roles: [ { role: "read", db: "production" } ]
})

// Create a read-write user
db.createUser({
	user: "write",
	pwd: "$STOPS_WRITE_PASSWORD",
	roles: [ { role: "readWrite", db: "production" } ]
})
EOF

echo "+----------------------------------------------+"
echo "|      MongoDB replica set initialized         |"
echo "+----------------------------------------------+"