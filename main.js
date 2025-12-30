let myLibrary = [];
const libraryContainer = document.querySelector(".libraryContainer");
const addBookBtn = document.querySelector(".add-book-btn");

const bookForm = document.querySelector(".book-form");

const modal = document.querySelector(".modal-form");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const submitBookBtn = document.querySelector(".submit-book-btn");

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new operator to call the constructor'");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);

    //add new book to library

    const bookCardContainer = document.createElement("div");
    const bookCard = document.createElement("div");
    const bookDeleteBtn = document.createElement("button");

    bookCard.textContent = `${book.title}, ${book.author}, ${book.pages} pages - Status: ${book.read}`;
    bookDeleteBtn.textContent = "X";

    bookDeleteBtn.addEventListener("click", () => {
        console.log(book.title);

        myLibrary = myLibrary.filter((e) => {
            return e.id !== book.id
        })

        bookCardContainer.remove();
    })

    libraryContainer.appendChild(bookCardContainer);
    bookCardContainer.appendChild(bookCard);
    bookCardContainer.appendChild(bookDeleteBtn);
}


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Have read");
addBookToLibrary("Animal Farm", "George Orwell", 84, "Have read");
addBookToLibrary("Treasure Island", "Robert Louise Stevenson", 271, "Haven't read");


addBookBtn.addEventListener("click", () => {
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
    let bookReadStatus = document.querySelector("#read-status");

    if (bookReadStatus.checked === true) {
        bookReadStatus = "Have read";
    } else {
        bookReadStatus = "Haven't read";
    }

    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookReadStatus)

    modal.close();

    console.log(myLibrary)
})