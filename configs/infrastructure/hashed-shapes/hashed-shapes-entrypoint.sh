#!/bin/bash

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
	pwd: "$HASHED_SHAPES_ADMIN_PASSWORD",
	roles: ["root"]
})

// Authenticate as admin to create other users
// db.auth("admin", "$HASHED_SHAPES_ADMIN_PASSWORD")

// Create a read-only user
db.createUser({
	user: "read",
	pwd: "$HASHED_SHAPES_READ_PASSWORD",
	roles: [ { role: "read", db: "production" } ]
})

// Create a read-write user
db.createUser({
	user: "write",
	pwd: "$HASHED_SHAPES_WRITE_PASSWORD",
	roles: [ { role: "readWrite", db: "production" } ]
})
EOF