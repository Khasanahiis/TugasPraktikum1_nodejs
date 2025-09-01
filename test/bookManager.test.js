const Book = require('../book');
const BookManager = require('../bookManager');

describe('BookManager', () => {
    let bookManager;

    beforeEach(() => {
        bookManager = new BookManager();
    });

    test('Test menambahkan buku', () => {
        const book = new Book("Test Book", "Test Author", 2023);
        bookManager.addBook(book);
        expect(bookManager.getBookCount()).toBe(1);
    });

    test('Test menghapus buku yang ada', () => {
        const book = new Book("To Remove", "Author", 2023);
        bookManager.addBook(book);
        const removed = bookManager.removeBook("To Remove");
        expect(removed).toBe(true);
        expect(bookManager.getBookCount()).toBe(0);
    });

    test('Test menghapus buku yang tidak ada', () => {
        const book = new Book("Existing Book", "Author", 2023);
        bookManager.addBook(book);
        const removed = bookManager.removeBook("Non Existing Book");
        expect(removed).toBe(false);
        expect(bookManager.getBookCount()).toBe(1);
    });

    test('Test mencari buku berdasarkan author', () => {
        const book1 = new Book("Book 1", "Andi", 2020);
        const book2 = new Book("Book 2", "Andi", 2021);
        const book3 = new Book("Book 3", "Budi", 2022);
        
        bookManager.addBook(book1);
        bookManager.addBook(book2);
        bookManager.addBook(book3);
        
        const booksByAndi = bookManager.findBooksByAuthor("Andi");
        expect(booksByAndi.length).toBe(2);
        expect(booksByAndi.every(book => book.author === "Andi")).toBe(true);
    });

    test('Test mendapatkan semua buku', () => {
        const book1 = new Book("Book 1", "Author 1", 2020);
        const book2 = new Book("Book 2", "Author 2", 2021);
        
        bookManager.addBook(book1);
        bookManager.addBook(book2);
        
        const allBooks = bookManager.getAllBooks();
        expect(allBooks.length).toBe(2);
        expect(allBooks).toContainEqual(book1);
        expect(allBooks).toContainEqual(book2);
    });

    test('Test validasi judul null', () => {
        expect(() => {
            new Book(null, "Author", 2020);
        }).toThrow("Title cannot be null or empty");
    });

    test('Test validasi tahun invalid', () => {
        expect(() => {
            new Book("Title", "Author", 1999);
        }).toThrow("Year must be between 2000 and 2100");
    });
});