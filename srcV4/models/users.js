const users = [
    {
        id: 1,
        firstName: "Kenan",
        lastName: "Hancer",
        mail: "kh@hotmail.com",
        userName: "kenanhancer",
        password: "123456"
    },
    {
        id: 2,
        firstName: "Hakan",
        lastName: "Demir",
        mail: "hd@gmail.com",
        userName: "hakandemir",
        password: "384419"
    },
    {
        id: 3,
        firstName: "Josh",
        lastName: "Volta",
        mail: "jv@yahoo.com",
        userName: "joshvolta@mynet.com",
        password: "991133"
    }
];

module.exports.usersProvider = () => users;