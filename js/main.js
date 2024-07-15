// rikiavimas?.. 😏
// localStorage

const h1DOM = document.querySelector("h1");
const formDOM = document.forms[0];
const textInputDOM = formDOM.querySelector("input");
const submitButtonDOM = formDOM.querySelector("button");
const listDOM = document.querySelector(".list");

const todoData = [];

submitButtonDOM.addEventListener("click", (e) => {
  e.preventDefault();

  if (!isValidText(textInputDOM.value)) {
    return;
  }

  todoData.push({
    text: textInputDOM.value.trim(),
    createdAt: Date.now(),
  });
  renderList();
});

function renderList() {
  if (todoData.length === 0) {
    renderEmptyList();
  } else {
    renderTaskList();
  }
}

function renderEmptyList() {
  listDOM.classList.add("empty");
  listDOM.textContent = "Empty";
}

function renderTaskList() {
  let HTML = "";

  for (const todo of todoData) {
    HTML += `
            <article class="item">
                <div class="date">${formatTime(todo.createdAt)}</div>
                <div class="text">${todo.text}</div>
                <form class="hidden">
                    <input type="text">
                    <button type="submit">Update</button>
                    <button type="button">Cancel</button>
                </form>
                <div class="actions">
                    <button>Done</button>
                    <div class="divider"></div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </article>`;
  }

  listDOM.innerHTML = HTML;
  listDOM.classList.remove("empty");

  const articlesDOM = listDOM.querySelectorAll("article");

  for (let i = 0; i < articlesDOM.length; i++) {
    const articleDOM = articlesDOM[i];
    const articleEditFormDOM = articleDOM.querySelector("form");
    const updateInputDOM = articleEditFormDOM.querySelector("input");
    const buttonsDOM = articleDOM.querySelectorAll("button");

    const updateDOM = buttonsDOM[0];
    updateDOM.addEventListener("click", (event) => {
      event.preventDefault();

      if (!isValidText(updateInputDOM.value)) {
        return;
      }
      todoData[i].text = updateInputDOM.value.trim();
      renderTaskList();
    });

    const cancelDOM = buttonsDOM[1];
    cancelDOM.addEventListener("click", () => {
      articleEditFormDOM.classList.add("hidden");
    });

    const editDOM = buttonsDOM[3];
    editDOM.addEventListener("click", () => {
      articleEditFormDOM.classList.remove("hidden");
    });

    const deleteDOM = buttonsDOM[4];
    deleteDOM.addEventListener("click", () => {
      todoData.splice(i, 1);
      renderList();
    });
  }
}

function formatTime(timeInMs) {
  // minimum 100-ieji metai
  // maximum ???
  const date = new Date();
  const y = date.getFullYear();
  const m = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
  const d = (date.getDay() < 10 ? "0" : "") + date.getDay();
  const h = date.getHours();
  const mn = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  const s = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
  return `${y}-${m}-${d} ${h}:${mn}:${s}`;
}

/* function formatTime() {
     // mdn: js Date -> getYear, getMonth, getDay, getHour...
       
     let now = new Date(); 
     let year    = now.getFullYear();
     let month   = now.getMonth() + 1; 
     let day     = now.getDate();
     let hour    = now.getHours();
     let minute  = now.getMinutes();
     let second = now.getSeconds(); 
    
         if(month.toString().length === 1) {
             month = '0' + month;
         }
         if(day.toString().length === 1) {
             day = '0' + day;
         }   
         if(hour.toString().length === 1) {
             hour = '0' + hour;
         }
         if(minute.toString().length === 1) {
             minute = '0' + minute;
         }
         if(second.toString().length === 1) {
             second = '0' + second;
         }   
     return `${year}-${month}-${day} ${hour}:${minute}:${second}`;   
}
 // example usage: realtime clock

 setInterval(function() {
     currentTime = formatTime();
     document.querySelector('date').innerHTML = currentTime;
}, 1000);*/

function isValidText(text) {
  if (
    typeof text !== "string" ||
    text.trim() === "" ||
    text[0].toUpperCase() !== text[0]
  ) {
    return false;
  }

  return true;
}

// CRUD operations:
// -----------------------------------
// create   array.push({initial data})
// read     array.map()
// update   array[i] = {updated data}
// delete   array.splice(i, 1)s
