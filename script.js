
/**
 * HELPER FUNCTIONS
 */

function Book(title, author, pages, read, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${(this.read)?'read':'not read yet'}, ${this.rating} star rating.`;
    };
}

function addBookToLibrary(title, author, pages, read, rating) {
    const newBook = new Book(title, author, pages, read, rating);
    myLibrary.push(newBook);
    displayLibrary();
}

function verifyAllFormInputs() {
    let check = true;
    const pagesRegex = /^[0-9]{1,4}$/;
    const ratingRegex = /^[1-5]$/;

    if(!titleInput.value) {
        titleInput.classList.add('red-border');
        check = false;
    } else { titleInput.classList.remove('red-border'); }
    if(!authorInput.value) {
        authorInput.classList.add('red-border');
        check = false;
    } else { authorInput.classList.remove('red-border'); }

    if(!pagesInput.value.match(pagesRegex) || pagesInput.value <= 0) {
        pagesInput.classList.add('red-border');
        check = false;
    } else { pagesInput.classList.remove('red-border'); }
    if(!ratingInput.value.match(ratingRegex)) {
        ratingInput.classList.add('red-border');
        check = false;
    } else { ratingInput.classList.remove('red-border'); }

    return check;

}

function addBookFromForm() {
    if(verifyAllFormInputs()) {
        addBookToLibrary(titleInput.value, authorInput.value, parseInt(pagesInput.value), readInput.checked, parseInt(ratingInput.value));
        addBookPopup.style.display = 'none';
    } else {
        alert("Missing one or more required inputs.");
    }
}

function updateBookFromForm() {
    let idx; 
    for(let i=0; i<myLibrary.length; i++) {
        if(myLibrary[i].title === currentBookTitle) {
            idx = i;
            break;
        }
    }

    if(verifyAllFormInputs()) {
        myLibrary[idx].title = titleInput.value;
        myLibrary[idx].author = authorInput.value;
        myLibrary[idx].pages = pagesInput.value;
        myLibrary[idx].rating = ratingInput.value;
        myLibrary[idx].read = readInput.checked;
        addBookPopup.style.display = 'none';
        displayLibrary();
    } else {
        alert("Missing one or more required inputs.");
    }
}

function updateBookRead(e) {
    let bookTitle = e.target.parentElement.firstChild.textContent;
    for(let i=0; i<myLibrary.length; i++) {
        if(myLibrary[i].title === bookTitle) {
            myLibrary[i].read = !myLibrary[i].read;
        }
    }
    displayLibrary();
}

function deleteBook(e) {
    let bookTitle = e.target.parentElement.firstChild.textContent;
    for(let i=0; i<myLibrary.length; i++) {
        if(myLibrary[i].title === bookTitle) {
            myLibrary.splice(i, 1);
            break;
        }
    }
    displayLibrary();
}

function editBook(e) {
    currentBookTitle = e.target.parentElement.firstChild.textContent;
    let idx; 
    for(let i=0; i<myLibrary.length; i++) {
        if(myLibrary[i].title === currentBookTitle) {
            idx = i;
            break;
        }
    }
    addBookPopup.style.display = 'flex';
    formAddBtn.style.display = 'none';
    formUpdateBtn.style.display = 'inline';
    titleInput.value = myLibrary[idx].title;
    authorInput.value = myLibrary[idx].author;
    pagesInput.value = myLibrary[idx].pages;
    ratingInput.value = myLibrary[idx].rating;
    readInput.checked = myLibrary[idx].read;

}

function clearForm() {
    const formInputs = document.querySelectorAll('#add-book-form > div > input');
    formInputs.forEach( e => {e.value = ''; e.classList.remove('red-border');})
    readInput.checked = false;
}

function clearDisplay() {
    const bookContainerDivs = document.querySelectorAll('#book-container > div')
    bookContainerDivs.forEach(element => {
        bookContainer.removeChild(element);
    })
}

function createMovingBookElement() {
    
        const movingBook = document.createElement('div');
        const back = document.createElement('div');
        const pg6 = document.createElement('div');
        const pg5 = document.createElement('div');
        const pg4 = document.createElement('div');
        const pg3 = document.createElement('div');
        const pg2 = document.createElement('div');
        const pg1 = document.createElement('div');
        const front = document.createElement('div');

        movingBook.classList.add('moving-book');
        back.classList.add('back');
        pg6.classList.add('page6');
        pg5.classList.add('page5');
        pg4.classList.add('page4');
        pg3.classList.add('page3');
        pg2.classList.add('page2');
        pg1.classList.add('page1');
        front.classList.add('front');

        movingBook.appendChild(back);
        movingBook.appendChild(pg6);
        movingBook.appendChild(pg5);
        movingBook.appendChild(pg4);
        movingBook.appendChild(pg3);
        movingBook.appendChild(pg2);
        movingBook.appendChild(pg1);
        movingBook.appendChild(front);

        return movingBook;
}


function displayLibrary(){
    clearDisplay();    

    for(let i=0; i<myLibrary.length; i++) {
        const bookDiv = document.createElement('div');
        const title = document.createElement('div');
        const author = document.createElement('div');
        const pages = document.createElement('div');
        const rating = document.createElement('div');
        const barDiv = document.createElement('div');
        const readBtn = document.createElement('div');
        const deleteBtn = document.createElement('div');
        const editBtn = document.createElement('div');

        const movingBook = createMovingBookElement();

        bookDiv.classList.add('book');
        title.classList.add('book-title');
        author.classList.add('book-author');
        pages.classList.add('book-pages');
        rating.classList.add('book-rating');
        barDiv.classList.add('book-bar');
        readBtn.classList.add('book-read');
        deleteBtn.classList.add('book-delete');
        editBtn.classList.add('book-edit');

        readBtn.classList.add('button_slide');
        readBtn.classList.add('slide_right');
        deleteBtn.classList.add('button_slide');
        deleteBtn.classList.add('btn-one');
        readBtn.classList.add('green-slide');
        editBtn.classList.add('button_slide');
        editBtn.classList.add('btn-one');      

        title.textContent = myLibrary[i].title;
        author.textContent = myLibrary[i].author;
        pages.textContent = myLibrary[i].pages.toString();
        rating.textContent = myLibrary[i].rating.toString();
        readBtn.textContent = 'READ';
        deleteBtn.textContent = 'DELETE';
        editBtn.textContent = 'EDIT';

        if(myLibrary[i].read) {
              barDiv.classList.add('bar-green')
              readBtn.classList.remove('green-slide');

              
        } else { movingBook.classList.add('open-book'); }
        readBtn.addEventListener('click', (e) => {updateBookRead(e)} );
        deleteBtn.addEventListener('click', (e) => {deleteBook(e)} );
        editBtn.addEventListener('click', (e) => {editBook(e)});
        movingBook.addEventListener('click', (e) => {updateBookRead(e)} );


        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(rating);
        bookDiv.appendChild(barDiv);
        bookDiv.appendChild(readBtn);
        bookDiv.appendChild(deleteBtn);
        bookDiv.appendChild(editBtn);
        bookDiv.appendChild(movingBook);

        bookContainer.appendChild(bookDiv);

    }

} 

/**   
 * GLOBAL VARIABLES
*/
let myLibrary = [];
let currentBookTitle;
const bookContainer = document.querySelector('#book-container');
const mainContainer = document.querySelector('#main-container');
const addBookPopup = document.querySelector('#add-book-popup');
const addBookForm = document.querySelector('#add-book-form');
const addBookBtn = document.querySelector('#addNewBook');

const titleInput = document.querySelector('#titleInput');
const authorInput = document.querySelector('#authorInput');
const pagesInput = document.querySelector('#pagesInput');
const ratingInput = document.querySelector('#ratingInput');
const readInput = document.querySelector('#readInput');
const formAddBtn = document.querySelector('#formAddBtn');
const formUpdateBtn = document.querySelector('#formUpdateBtn');
const formClearBtn = document.querySelector('#formClearBtn');



/**
 * EVENT HANDLER
*/
addBookBtn.onclick = () => {
    addBookPopup.style.display = 'flex';
    clearForm();
};
addBookPopup.onclick = (e) => { 
    if(e.target.firstElementChild) {
        if(e.target.firstElementChild.id === "add-book-form") {
            addBookPopup.style.display = 'none';
            formAddBtn.style.display = 'inline';
            formUpdateBtn.style.display = 'none';
        }
    }     
};

formClearBtn.onclick = () => clearForm();
formAddBtn.onclick = () => addBookFromForm();
formUpdateBtn.onclick = () => updateBookFromForm();



/**
 * CONNECT SIGNALS 
*/

addBookToLibrary('To Kill A Mocking Bird', 'Harper Lee', 214, true, 5)
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 420, false, 4)
addBookToLibrary('The Longest Ride', 'Nicholas Sparks', 395, true, 1);

