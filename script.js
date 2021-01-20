const title = document.querySelector("#title");
const body = document.querySelector("#body");
const btn = document.querySelector(".btn");
const placeCardView = document.querySelector(".main_task");
const form = document.forms.addTask;

function getTask(renderFragment) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
  xhr.addEventListener("load", () => {
    const obj = JSON.parse(xhr.responseText);
    const fragment = renderFragment(obj);
    appendFragment(fragment);
  });
  xhr.addEventListener("error", () => console.error("Error"));
  xhr.send();
}

function appendFragment(fragment) {
  placeCardView.appendChild(fragment);
}

function renderFragment(obj) {
  const newFragmen = document.createDocumentFragment();
  obj.forEach((item, index) => {
    if (index < 20) newFragmen.append(renderCard(item.title, item.body));
  });
  return newFragmen;
}

function renderCard(title, body) {
  const card = createElement("div", ["card", "col-sm-6", "mx-auto"]);
  const cardBody = createElement("div", "card-body");
  const cardTitle = createElement("h4", "card-title");
  const cardText = createElement("p", "card-text");
  const btnDel = createElement("button", ["btn", "btn-danger", "btn-del"]);
  cardTitle.textContent = title;
  cardText.textContent = body;
  btnDel.textContent = "Delete";
  cardBody.append(cardTitle, cardText, btnDel);
  card.append(cardBody);
  card.dataset.id = Math.round(Math.random() * 150000) + "-task";
  return card;
}

function createElement(type, classListName) {
  const item = document.createElement(type);
  if (!classListName) return item;
  if (Array.isArray(classListName))
    classListName.forEach((className) => {
      item.classList.add(className);
    });
  else item.classList.add(classListName);
  return item;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (title.value)
    placeCardView.insertAdjacentElement(
      "afterbegin",
      renderCard(title.value, body.value)
    );
  else alert("Error");
  form.reset();
});

placeCardView.addEventListener("click", (event) => {
  if (event.target.classList[2] === "btn-del") {
    event.target.closest("[data-id]").remove();
  }
});

getTask(renderFragment);
