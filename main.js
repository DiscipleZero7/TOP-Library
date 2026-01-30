let myLibrary = [];
const libraryContainer = document.querySelector(".libraryContainer");
const addBookBtn = document.querySelector(".add-book-btn");
const bookForm = document.querySelector(".book-form");
const modal = document.querySelector(".modal-form");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const submitBookBtn = document.querySelector(".submit-book-btn");

// Array / Backend

class Book {
    constructor(title, author, pages, read) {
        let status = "No read";
        if (read) {
            status = "Yes read";
        }

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = status;
        this.id = crypto.randomUUID();

        this.status = function() {
            (this.read === "Yes read") ? this.read = "No read" : this.read = "Yes read"
        }
    }
}

// DOM / Frontend / New Object
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);

    // Add new book container to library container
    const bookCardContainer = document.createElement("div");
    bookCardContainer.classList.add("book-card-container");
    libraryContainer.appendChild(bookCardContainer);

    // Creates each section of the card
    const bookDeleteBtn = document.createElement("button");
    bookDeleteBtn.classList.add("book-delete-btn")
    bookDeleteBtn.textContent = "X";
    bookCardContainer.appendChild(bookDeleteBtn);

    const bookTitle = document.createElement("h2");
    bookTitle.classList.add("book-title")
    bookTitle.textContent = book.title;
    bookCardContainer.appendChild(bookTitle);

    const bookAuthor = document.createElement("h3");
    bookAuthor.classList.add("book-author")
    bookAuthor.textContent = book.author;
    bookCardContainer.appendChild(bookAuthor);

    const bookPages = document.createElement("h3");
    bookPages.classList.add("book-pages")
    bookPages.textContent = `Page count: ${book.pages}`;
    bookCardContainer.appendChild(bookPages);

    const bookStatus = document.createElement("button");
    bookStatus.classList.add("book-status");
    if(book.read === "Yes read") {
        bookStatus.classList.toggle("have-read");
    }

    bookStatus.textContent = book.read;
    bookCardContainer.appendChild(bookStatus);

    // Read status toggle
    bookStatus.addEventListener("click", () => {
        book.status();
        bookStatus.textContent = book.read;
        bookStatus.classList.toggle("have-read");
    })

    // Remove book
    bookDeleteBtn.addEventListener("click", () => {
        myLibrary = myLibrary.filter((e) => {
            return e.id !== book.id
        })
        bookCardContainer.remove();
    })
}

// Default books for testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Animal Farm", "George Orwell", 84, true);
addBookToLibrary("Treasure Island", "Robert Louise Stevenson", 271, false);
addBookToLibrary("Lord of the Flies", "William Golding", 189, false);
addBookToLibrary("Alice in Wonderland", "Lewis Carroll", 62, true);
addBookToLibrary("Tuesdays with Morrie", "Mitch Albom", 131, true);
addBookToLibrary("Strange Case of Dr. Jekyll and Mr. Hyde", "Robert Louise Stevenson", 97, false);
addBookToLibrary("1984", "George Orwell", 209, false);

addBookBtn.addEventListener("click", () => {
    bookForm.reset();
    modal.showModal();
})

modalCloseBtn.addEventListener("click", () => {
    modal.close();
})

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const bookTitle = document.querySelector("#title");
    const bookAuthor = document.querySelector("#author");
    const bookPages = document.querySelector("#pages");
    const bookReadStatus = document.querySelector("#read-status");

    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookReadStatus.checked)

    modal.close();
})