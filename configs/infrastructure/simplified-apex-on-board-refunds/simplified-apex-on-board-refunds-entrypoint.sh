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
	pwd: "$TML_INTERFACE_SIMPLIFIED_APEX_ON_BOARD_REFUNDS_ADMIN_PASSWORD",
	roles: ["root"]
})

// Authenticate as admin to create other users
// db.auth("admin", "$TML_INTERFACE_SIMPLIFIED_APEX_ON_BOARD_REFUNDS_ADMIN_PASSWORD")

// Create a read-only user
db.createUser({
	user: "read",
	pwd: "$TML_INTERFACE_SIMPLIFIED_APEX_ON_BOARD_REFUNDS_READ_PASSWORD",
	roles: [ { role: "read", db: "production" } ]
})

// Create a read-write user
db.createUser({
	user: "write",
	pwd: "$TML_INTERFACE_SIMPLIFIED_APEX_ON_BOARD_REFUNDS_WRITE_PASSWORD",
	roles: [ { role: "readWrite", db: "production" } ]
})
EOF