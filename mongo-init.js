// Switch to the soutenance database
db = db.getSiblingDB('soutenance');

// Create database user (optional - you can remove this if not needed)
db.createUser({
    user: "appuser",
    pwd: "securepassword",
    roles: [
        { role: "readWrite", db: "soutenance" }
    ]
});

// Create the users collection
db.createCollection("users");

// Insert the admin user
db.users.insertOne({
    firstName: "Ridha",
    lastName: "Azizi",
    email: "Admin.Azizi@gmail.com",
    phone: "98012365",
    adress: "sousse",
    password: "$argon2id$v=19$m=65536,t=3,p=4$t/2agynVEuHD4V0Xjl0ntA$mnBKR442dTiVat6piXaRZkVrT5BGUcYkvHnS5a7+eTM",
    cin: "01236547",
    statut: "active",

    role: "Admin",
    createdAt: new Date("2025-05-20T10:55:00.683Z"),
    updatedAt: new Date("2025-06-17T10:37:02.476Z"),
    __v: 0,
    refreshToken: "$argon2id$v=19$m=65536,t=3,p=4$0OvP/K6dS4iyjhrfh/wj0Q$70JN/vm/g6P2rJqgssq81llQUOxbMMp7aH0KIsTr3M0"
});

// Log success
print("Admin user created successfully in soutenance database");

// Optional: Create additional collections if needed
db.createCollection("soutenances");
db.createCollection("sessions");

print("Database initialization completed");