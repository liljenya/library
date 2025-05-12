const myLibrary = [
    new Book('Norwegian Wood', 'Haruki Murakami', true, crypto.randomUUID()),
    new Book('Afterdark', 'Haruki Murakami', true, crypto.randomUUID()),
];

const covers = [
    './img/cover1.jpg',
    './img/cover2.jpg',
    './img/cover3.jpg'
]

function Book(title, author, isRead, id) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
    this.id = id;
}

function getRandomCover() {
    return covers[Math.floor(Math.random() * covers.length)];
}

function addBookToLibrary(title, author, isRead) {
    const id = crypto.randomUUID();
    const newBook = new Book(title, author, isRead, id);
    myLibrary.push(newBook);
}

Book.prototype.toggleReadStatus = function () {
    this.isRead = !this.isRead;
}

function displayBooks() {
    document.querySelector('.my-form').remove();
    const books = document.querySelector('.books');
    books.innerHTML = '';
    for (const book of myLibrary) {
        const div = document.createElement('div');
        div.className = 'main-div';
        div.id = book.id;
        const cover = document.createElement('img');
        cover.className = 'book-cover';
        cover.src = getRandomCover();
        cover.alt = 'Book cover';
        const titleH = document.createElement('h');
        const authorP = document.createElement('p');
        const isReadButton = document.createElement('button');
        isReadButton.textContent = book.isRead ? 'Read' : 'Not read';

        isReadButton.addEventListener('click', function () {
            book.toggleReadStatus(); // Изменяем статус для конкретной книги
            isReadButton.textContent = book.isRead ? 'Read' : 'Not read'; // Обновляем текст кнопки
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.addEventListener('click', function () {
            const index = myLibrary.findIndex(b => b.id === book.id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
            }
            document.getElementById(book.id).remove();
        })

        titleH.textContent = book.title;
        authorP.textContent = book.author;
        deleteBtn.textContent = 'Delete';

        div.appendChild(titleH);
        div.appendChild(authorP);
        div.appendChild(isReadButton);
        div.appendChild(cover);
        div.appendChild(deleteBtn);
        books.appendChild(div);
    }
}

const btn = document.getElementsByClassName('add')[0];
btn.addEventListener("click", function () {
    const form = document.createElement('form');
    form.className = 'my-form';

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Add a New Book';
    form.appendChild(formTitle);

    // Назва книги
    const titleDiv = document.createElement('div');
    titleDiv.className = 'title';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'title';
    input.id = 'title';

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Book Title';
    titleLabel.setAttribute('for', 'title');

    titleDiv.appendChild(input);
    titleDiv.appendChild(titleLabel);
    form.appendChild(titleDiv);

    // Автор
    const authorDiv = document.createElement('div');
    authorDiv.className = 'author';

    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.name = 'author';
    authorInput.id = 'author';

    const authorLabel = document.createElement('label');
    authorLabel.textContent = 'Author';
    authorLabel.setAttribute('for', 'author');

    authorDiv.appendChild(authorInput);
    authorDiv.appendChild(authorLabel);
    form.appendChild(authorDiv);

    // Прочитано
    const isReadDiv = document.createElement('div');
    isReadDiv.className = 'readed';

    const isReadInput = document.createElement('input');
    isReadInput.type = 'checkbox';
    isReadInput.name = 'isRead';
    isReadInput.id = 'isRead';

    const isReadLabel = document.createElement('label');
    isReadLabel.textContent = 'Read';
    isReadLabel.setAttribute('for', 'isRead');

    isReadDiv.appendChild(isReadInput);
    isReadDiv.appendChild(isReadLabel);
    form.appendChild(isReadDiv);

    // Кнопка
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Submit';
    form.appendChild(submitBtn);

    document.querySelector('.container').appendChild(form);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = input.value;
        const author = authorInput.value;
        const isRead = isReadInput.checked;

        addBookToLibrary(title, author, isRead);
        displayBooks();
    });
});
