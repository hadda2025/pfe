db.createUser({
    user: "appuser",
    pwd: "securepassword",
    roles: [
        { role: "readWrite", db: "mydatabase" }
    ]
});

// Example of creating initial collections or inserting default data
db.createCollection("users");
db.users.insertMany([
    { username: "admin", email: "admin@example.com", role: "admin" }
]);