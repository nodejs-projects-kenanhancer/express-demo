const books = [
    {
        id: 1,
        title: "Software Engineering at Google",
        author: "Richard Helm, Ralph Johnson, John Vlissides",
        year: 1994,
        pages: 416
    },
    {
        id: 2,
        title: "Clean Code",
        author: "Robert Martin",
        year: 2008,
        pages: 464
    },
    {
        id: 3,
        title: "Head First Design Patterns",
        author: "",
        year: 2004,
        pages: 694
    },
    {
        id: 4,
        title: "Head First Java",
        author: "Kathy Sierra",
        year: 2005,
        pages: 720
    }
];


module.exports.booksProvider = () => books;