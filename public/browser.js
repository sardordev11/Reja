function itemTemplate(item) {
    return ` <li
  class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
  <span class="item-text">${item.reja} </span>
  <div>
    <button
      data-id="${item._id}"
      class="edit-me btn btn-secondary btn-sm mr-1">
      O'zgartirish
    </button>
    <button
      data-id="${item._id}"
      class="delete-me btn btn-danger btn-sm">
      O'chirish
    </button>
  </div>
  </li>`;
  }
  
  let createField = document.getElementById("create-field");
  
  document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    axios
      .post("/create-item", { reja: createField.value })
      .then((res) => {
        document
          .getElementById("item-list")
          .insertAdjacentHTML("beforeend", itemTemplate(res.data));
        createField.value = "";
        createField.focus();
      })
      .catch((err) => {
        console.log("Try again");
      });
  });
  
  document.addEventListener("click", function (e) {
    // delete operation
    if (e.target.classList.contains("delete-me")) {
      if (confirm("Do you wanna delete")) {
        axios
          .post("delete-item", { id: e.target.getAttribute("data-id") })
          .then((res) => {
            e.target.parentElement.parentElement.remove();
          })
          .catch((err) => {
            console.log("Please try again");
          });
      } else {
        alert("No button clicked");
      }
    }
    // edit operation
    if (e.target.classList.contains("edit-me")) {
      let userInput = prompt(
        "O'zgartirish kiriting",
        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
      );
      if (userInput) {
        axios
          .post("/edit-item", {
            id: e.target.getAttribute("data-id"),
            new_input: userInput,
          })
          .then((res) => {
            e.target.parentElement.parentElement.querySelector(
              ".item-text"
            ).innerHTML = userInput;
          })
          .catch((err) => {
            console.log("Something went wrong try again");
          });
      }
    }
  });
  
  document.getElementById("clean-all").addEventListener("click", function () {
    axios
      .post("/delete-all", { delete_all: true })
      .then((res) => {
        // console.log(res);
        document.location.reload();
      })
      .catch((err) => {
        console.log("Something went wrong");
      });
  });