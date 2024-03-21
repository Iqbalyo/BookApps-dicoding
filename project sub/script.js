document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.containerForm .form.kiri');
    const completedBooksList = document.querySelector('.form.kanan');
    const inProgressBooksList = document.querySelector('.form.tengah');

    

    function addHoverEffect(button) {
        button.style.cursor = 'pointer';
        button.addEventListener('mouseover', function() {
            button.style.opacity = '0.7';
        });
        button.addEventListener('mouseout', function() {
            button.style.opacity = '1';
        });
    }

    function createBookItem(title, author, year, isCompleted) {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.style.backgroundColor = '#f42f2c'; // Set background color for new item
        bookItem.style.color = 'white'; // Set text color
        bookItem.style.borderRadius = '5px'; // Set border radius
        bookItem.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Set box shadow
        bookItem.style.padding = '10px'; // Add padding
        bookItem.style.marginBottom = '10px'; // Add margin bottom

        bookItem.innerHTML = `
            <h3>${title}</h3>
            <p>Penulis: ${author}</p>
            <p>Tahun: ${year}</p>
            <button class="edit">Edit</button>
            <button class="delete">Hapus</button>
        `;

        // Style buttons
        const editButton = bookItem.querySelector('.edit');
        const deleteButton = bookItem.querySelector('.delete');
        editButton.style.backgroundColor = '#4CAF50'; // Green
        deleteButton.style.backgroundColor = '#f44336'; // Red

        editButton.style.color = 'white';
        deleteButton.style.color = 'white';

        editButton.style.borderRadius = '5px';
        deleteButton.style.borderRadius = '5px';

        addHoverEffect(editButton);
        addHoverEffect(deleteButton);

        if (!isCompleted) {
            const markCompletedButton = document.createElement('button');
            markCompletedButton.textContent = 'Selesai dibaca';
            markCompletedButton.classList.add('complete');
            markCompletedButton.style.backgroundColor = '#FFEB3B'; // Yellow
            markCompletedButton.style.color = 'black'; // Text color for better readability
            markCompletedButton.style.borderRadius = '5px';
            addHoverEffect(markCompletedButton);
            markCompletedButton.addEventListener('click', function() {
                completeBook(bookItem, title, author, year);
            });
            bookItem.appendChild(markCompletedButton);
        } else {
            const markIncompleteButton = document.createElement('button');
            markIncompleteButton.textContent = 'Belum Selesai Dibaca';
            markIncompleteButton.classList.add('incomplete');
            markIncompleteButton.style.backgroundColor = '#FFEB3B'; // Yellow
            markIncompleteButton.style.color = 'black';
            markIncompleteButton.style.borderRadius = '5px';
            addHoverEffect(markIncompleteButton);
            markIncompleteButton.addEventListener('click', function() {
                incompleteBook(bookItem, title, author, year);
            });
            bookItem.appendChild(markIncompleteButton);
        }

        deleteButton.addEventListener('click', function() {
            bookItem.remove();
        });

        // Implement the edit functionality based on your requirements
        editButton.addEventListener('click', function() {
            console.log('Edit feature to be implemented');
        });

        return bookItem;
    }

    function completeBook(bookItem, title, author, year) {
        const completedSection = createBookItem(title, author, year, true);
        completedBooksList.appendChild(completedSection);
        bookItem.remove();
    }

    function incompleteBook(bookItem, title, author, year) {
        const inProgressSection = createBookItem(title, author, year, false);
        inProgressBooksList.appendChild(inProgressSection);
        bookItem.remove();
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = e.target.querySelector('.title').value;
        const author = e.target.querySelector('.author').value;
        const year = e.target.querySelector('.year').value;
        const isCompleted = e.target.querySelector('.checkbox').checked;

        const bookItem = createBookItem(title, author, year, isCompleted);

        if (isCompleted) {
            completedBooksList.appendChild(bookItem);
        } else {
            inProgressBooksList.appendChild(bookItem);
        }

        form.reset();


    });
});
