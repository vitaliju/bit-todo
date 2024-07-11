// rikiavimas?..
// localtorage

const h1DOM = document.querySelector('h1');
const formDOM = document.forms[0];
const textInputDOM = formDOM.querySelector('input');
const submitButtonDOM = formDOM.querySelector('button');
const listDOM = document.querySelector('.list');

submitButtonDOM.addEventListener('click', e => {
    e.preventDefault();

    console.log(textInputDOM.value);

    const HTML = `
        <article class="items">
            <div class="text">${textInputDOM.value}</div>
            <div class="actions">
                <button>Done</button>
                <div class="divider"></div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </article>`;
    
    listDOM.innerHTML += HTML;
});