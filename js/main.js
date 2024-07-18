// rikiavimas?.. 😏
// localStorage

const h1DOM = document.querySelector("h1");
const formDOM = document.forms[0];
const textInputDOM = formDOM.querySelector('input[type="text"]');
const colorInputDOM = formDOM.querySelector('input[type="color"]');
const submitButtonDOM = formDOM.querySelector("button");
const listDOM = document.querySelector(".list");

const toastDOM = document.querySelector(".toast");
const toastTitleDOM = toastDOM.querySelector(".title");
const toastMessageDOM = toastDOM.querySelector(".message");
const toastCloseDOM = toastDOM.querySelector(".close");

toastCloseDOM.addEventListener("click", () => {
  toastDOM.classList.remove("active");
});

const localData = localStorage.getItem("tasks");
let todoData = [];

if (localData !== null) {
  todoData = JSON.parse(localData);
  renderList();
}

submitButtonDOM.addEventListener("click", (e) => {
  e.preventDefault();

  const validationMsg = isValidText(textInputDOM.value);
  if (validationMsg !== true) {
    showToastError(validationMsg);
    return;
  }

  todoData.push({
    state: "todo",
    text: textInputDOM.value.trim(),
    color: colorInputDOM.value,
    createdAt: Date.now(),
    lastEditedAt: Date.now(),
  });
  localStorage.setItem("tasks", JSON.stringify(todoData));
  renderList();
  showToastSuccess("Updated successfully");
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
            <article class="item" data-state="${
              todo.state
            }" style="border-left-color: ${todo.color};">
                <div class="date">${formatTime(todo.createdAt)}</div>
                <div class="state">Atlikta</div>
                <div class="text">${todo.text}</div>
                <form class="hidden">
                    <input type="text" value="${todo.text}">
                    <button class="update" type="submit">Update</button>
                    <button class="cancel" type="button">Cancel</button>
                </form>
                <div class="actions">
                    <button class="done">Done</button>
                    <div class="divider"></div>
                    ${
                      todo.state === "done"
                        ? ""
                        : '<button class="edit">Edit</button>'
                    }
                    <button class="delete">Delete</button>
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

    const updateDOM = articleDOM.querySelector("button.update");
    if (updateDOM !== null) {
      updateDOM.addEventListener("click", (event) => {
        event.preventDefault();

        const validationMsg = isValidText(updateInputDOM.value);
        if (validationMsg !== true) {
          showToastError(validationMsg);
          return;
        }

        todoData[i].text = updateInputDOM.value.trim();
        renderTaskList();
        showToastSuccess("Information updeted");
        localStorage.setItem("tasks", JSON.stringify(todoData));
      });
    }

    const cancelDOM = articleDOM.querySelector("button.cancel");
    if (cancelDOM !== null) {
      cancelDOM.addEventListener("click", () => {
        articleEditFormDOM.classList.add("hidden");
        showToastInfo("Information edited without changes.");
      });
    }

    const doneDOM = articleDOM.querySelector("button.done");
    if (doneDOM !== null) {
      doneDOM.addEventListener("click", () => {
        todoData[i].state = "done";
        localStorage.setItem("tasks", JSON.stringify(todoData));
        renderList();
      });
    }

    const editDOM = articleDOM.querySelector("button.edit");
    if (editDOM !== null) {
      editDOM.addEventListener("click", () => {
        articleEditFormDOM.classList.remove("hidden");
        localStorage.setItem("tasks", JSON.stringify(todoData));
      });
    }

    const deleteDOM = articleDOM.querySelector("button.delete");
    if (deleteDOM !== null) {
      deleteDOM.addEventListener("click", () => {
        todoData.splice(i, 1);
        renderList();
        showToastSuccess("Successfully deleted");
        localStorage.setItem("tasks", JSON.stringify(todoData));
      });
    }
  }
}

function formatTime(timeInMs) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  // minimum 100-ieji metai ???
  // maximum ???
  const date = new Date(timeInMs);
  const y = date.getFullYear();
  const m = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
  const d = (date.getDate() < 10 ? "0" : "") + date.getDate();
  const h = date.getHours();
  const mn = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  const s = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

  return `${y}-${m}-${d} ${h}:${mn}:${s}`;
}

function isValidText(text) {
  if (typeof text !== "string") {
    return "Information must be string.";
  }

  if (text === "") {
    return "Text can't be empty.";
  }

  if (text.trim() === "") {
    return "Text can't content only spaces.";
  }

  if (text[0].toUpperCase() !== text[0]) {
    return "Text must star with capital letter.";
  }

  return true;
}

function showToast(state, title, msg) {
  toastDOM.classList.add("active");
  toastDOM.dataset.state = state;
  toastTitleDOM.textContent = title;
  toastMessageDOM.textContent = msg;
}

function showToastSuccess(msg) {
  showToast("success", "Success", msg);
}

function showToastInfo(msg) {
  showToast("info", "Information", msg);
}

function showToastWarning(msg) {
  showToast("warning", "Warning", msg);
}

function showToastError(msg) {
  showToast("error", "Error", msg);
}

// ###################################################
// ###################################################

const sortingListDOM = document.querySelector(".list-actions");
const sortingButtonsDOM = sortingListDOM.querySelectorAll("button");

// Sorting: Laikas 0-9
const btnTime09DOM = sortingButtonsDOM[0];
btnTime09DOM.addEventListener("click", () => {
  sortingListDOM.querySelector(".active").classList.remove("active");
  btnTime09DOM.classList.add("active");
  todoData.sort((a, b) => a.createdAt - b.createdAt);
  renderTaskList();
});

// Sorting: Laikas 9-0
const btnTime90DOM = sortingButtonsDOM[1];
btnTime90DOM.addEventListener("click", () => {
  sortingListDOM.querySelector(".active").classList.remove("active");
  btnTime90DOM.classList.add("active");
  todoData.sort((a, b) => b.createdAt - a.createdAt);
  renderTaskList();
});

// Sorting: Spalva A-Z
const btnColorAZDOM = sortingButtonsDOM[2];
btnColorAZDOM.addEventListener("click", () => {
  sortingListDOM.querySelector(".active").classList.remove("active");
  btnColorAZDOM.classList.add("active");
  todoData.sort((a, b) =>
    a.color < b.color ? -1 : a.color === b.color ? 0 : 1
  );
  renderTaskList();
});

// Sorting: Spalva Z-A
const btnColorZADOM = sortingButtonsDOM[3];
btnColorZADOM.addEventListener("click", () => {
  sortingListDOM.querySelector(".active").classList.remove("active");
  btnColorZADOM.classList.add("active");
  todoData.sort((a, b) =>
    b.color < a.color ? -1 : a.color === b.color ? 0 : 1
  );
  renderTaskList();
});

// Sorting: Pavadinimas A-Z
const btnTitleAZDOM = sortingButtonsDOM[4];
btnTitleAZDOM.addEventListener("click", () => {
  sortingListDOM.querySelector(".active").classList.remove("active");
  btnTitleAZDOM.classList.add("active");
  todoData.sort((a, b) => (a.text < b.text ? -1 : a.text === b.text ? 0 : 1));
  renderTaskList();
});

// Sorting: Pavadinimas Z-A
const btnTitleZADOM = sortingButtonsDOM[5];
btnTitleZADOM.addEventListener("click", () => {
  sortingListDOM.querySelector(".active").classList.remove("active");
  btnTitleZADOM.classList.add("active");
  todoData.sort((a, b) => (b.text < a.text ? -1 : a.text === b.text ? 0 : 1));
  renderTaskList();
});

// ###################################################
// ###################################################

// CRUD operations:
// -----------------------------------
// create   array.push({initial data})
// read     array.map()
// update   array[i] = {updated data}
// delete   array.splice(i, 1)
