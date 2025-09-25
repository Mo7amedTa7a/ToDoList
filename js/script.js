let user = JSON.parse(localStorage.getItem("currentUser")) || "";
let users = JSON.parse(localStorage.getItem("users")) || [];
let findUser = users.find((u) => u.email === user);
//Start account user menu && Header
const btnHeaderHome = document.querySelector("#btnHeaderHome");
const menuHeader = document.querySelector("#menuHeader");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
const btnLognOut = document.querySelector("#btnLognOut");
const btnHeader = document.querySelector("#btnLogInHome");
const welcomName = document.querySelector(".welcom-name");
if (user) {
  btnHeader.style.display = "none";
} else {
  welcomName.style.display = "none";
  btnHeaderHome.style.display = "none";
}
btnHeaderHome.addEventListener("click", function (event) {
  event.stopPropagation();
  menuHeader.classList.toggle("active");
});

document.querySelector("body").addEventListener("click", function (event) {
  if (
    !menuHeader.contains(event.target) &&
    !btnHeaderHome.contains(event.target)
  ) {
    menuHeader.classList.add("active");
  }
});

if (findUser) {
  userName.innerHTML = findUser.name || "Not Name";
  userEmail.innerHTML = findUser.email || "Not Email";
  if (window.i18n) {
    welcomName.setAttribute("data-i18n-name", findUser.name || "Not Name");
    welcomName.textContent = window.i18n.t("welcomeName", {
      name: findUser.name || "Not Name",
    });
  } else {
    welcomName.innerHTML = `Welcome ${findUser.name || "Not Name"}`;
  }
} else {
  userName.innerHTML = "Not Name";
  userEmail.innerHTML = "Not Email";
  if (window.i18n) {
    welcomName.setAttribute("data-i18n-name", "Not Name");
    welcomName.textContent = window.i18n.t("welcomeName", { name: "Not Name" });
  } else {
    welcomName.innerHTML = "Welcome Not Name";
  }
}
btnLognOut.addEventListener("click", function () {
  Swal.fire({
    title: window.i18n ? window.i18n.t("areYouSure") : "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: window.i18n ? window.i18n.t("cancelLogout") : "Cancel",
    confirmButtonText: window.i18n
      ? window.i18n.t("yesLogout")
      : "Yes, Logn Out",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: window.i18n ? window.i18n.t("logout") : "Logn Out",
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        localStorage.removeItem("currentUser");
        location.replace("registerAndLogIn.html");
      }, 900);
    }
  });
});
//End account user menu && Header
// open and close Box Add
const btnAddHome = document.querySelector("#btnAddHome");
const layerBox = document.querySelector(".layer");
const closeBox = document.querySelector("#closeBox");
const addNewToDo = document.querySelector(".addNewToDo");
let addressBoxEdite = document.querySelector("#addressBoxEdite");
let btnBoxEdite = document.querySelector("#btnBoxEdite");
btnAddHome.addEventListener("click", function () {
  layerBox.classList.remove("active");
  if (window.i18n) {
    addressBoxEdite.textContent = window.i18n.t("addNewToDo");
  } else {
    addressBoxEdite.innerHTML = "Add New TO Do";
  }
  btnBoxEdite.style.display = "none";
  btnBoxAdd.style.display = "block";
  document.querySelector("#address").value = "";
  document.querySelector("#description").value = "";
});
addNewToDo.addEventListener("click", function (event) {
  event.stopPropagation();
});
layerBox.addEventListener("click", function () {
  layerBox.classList.add("active");
});
closeBox.addEventListener("click", function () {
  layerBox.classList.add("active");
});
//Start Handel add To Do Lists
const btnBoxAdd = document.querySelector("#btnBoxAdd");
const formBox = document.querySelector("#formBox");

btnBoxAdd.addEventListener("click", function (e) {
  e.preventDefault();
  let addressToDo = document.querySelector("#address").value.trim();
  let descriptionToDo = document.querySelector("#description").value.trim();
  if (!findUser) {
    Swal.fire({
      title: window.i18n
        ? window.i18n.t("youMustLogin")
        : "You must log in first",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: window.i18n ? window.i18n.t("cancelLogout") : "Cancel",
      confirmButtonText: window.i18n ? window.i18n.t("signIn") : "SinIn",
    }).then((result) => {
      if (result.isConfirmed) {
        location.replace("registerAndLogIn.html");
      }
    });
  }
  if (addressToDo === "" || descriptionToDo === "") {
    return Swal.fire({
      icon: "warning",
      title: window.i18n
        ? window.i18n.t("pleaseFillToDo")
        : "Please Fill To Do",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    const newToDo = {
      address: addressToDo,
      description: descriptionToDo,
      isCompleted: false,
    };
    findUser.myToDoLists.push(newToDo);
    localStorage.setItem("users", JSON.stringify(users));
    layerBox.classList.add("active");
    renderToDoList();
    formBox.reset();
  }
});
function renderToDoList() {
  const showToDoList = document.querySelector(".toDoList");
  showToDoList.innerHTML = "";

  if (findUser.myToDoLists.length > 0) {
    findUser.myToDoLists.forEach((todo, index) => {
      showToDoList.innerHTML += `
        <div class="toDo">
          <div class="toDoHeader">
            <h2 class="title">${todo.address}</h2>
            <button id="btnsOpen"><i class="fas fa-ellipsis-v"></i></button>
          </div>
          <div class="toDoBody">
            <p>${todo.description}</p>
            <button id="isCompleteBtn"><i class="fa-solid fa-check"></i></button>
          </div>
          <div class="btns active">
            <button onclick="editeToDo(${index})" class="edit">
              <span data-i18n="edit">${window.i18n?window.i18n.t('edit'):'Edite'}</span> <i class="fa-solid fa-pencil"></i>
            </button>
            <button class="delete" onclick="deleteToDo(${index})">
              <span data-i18n="delete">${window.i18n?window.i18n.t('delete'):'Delete'}</span><i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    });
  } else {
    const emptyTitle = document.querySelector(".emptyTitle");
    if (emptyTitle) {
      emptyTitle.remove();
    }
    showToDoList.innerHTML = `<p class='emptyTitle' data-i18n="emptyToDo">Empty To Do</p>`;
  }

  document.querySelectorAll(".toDo").forEach((todoElement, index) => {
    const todo = findUser.myToDoLists[index];
    const btn = todoElement.querySelector("#isCompleteBtn");

    if (todo.isCompleted) {
      btn.style.backgroundColor = "rgb(49, 170, 12)";
      btn.style.color = "#fff";
      todoElement.style.backgroundColor = "#36aed31a";
      todoElement.style.borderInlineStart =
        "0.5rem solid hsl(var(--primary-color))";
    } else {
      todoElement.style.borderInlineStart =
        "1px solid hsla(var(--text-color-secondary), 0.3)";
      todoElement.style.backgroundColor = "#fff";
      btn.style.backgroundColor = "#fff";
      btn.style.color = "rgb(49, 170, 12)";
    }
  });
}
//End add To Do Lists
// Start Handel Edite And Delete To Dos
function editeToDo(index) {
  const todo = findUser.myToDoLists[index];
  btnBoxEdite.style.display = "block";
  btnBoxAdd.style.display = "none";
  document.querySelector("#address").value = todo.address;
  document.querySelector("#description").value = todo.description;
  layerBox.classList.remove("active");
  addressBoxEdite.innerHTML = window.i18n.t("editTitle");

  btnBoxEdite.onclick = function () {
    let addressToDo = document.querySelector("#address").value;
    let descriptionToDo = document.querySelector("#description").value;

    if (addressToDo === "" || descriptionToDo === "") {
      Swal.fire(
        window.i18n ? window.i18n.t("pleaseFillToDo") : "Please Fill To Do"
      );
      return;
    } else {
      findUser.myToDoLists[index].address = addressToDo;
      findUser.myToDoLists[index].description = descriptionToDo;

      localStorage.setItem("users", JSON.stringify(users));
      layerBox.classList.add("active");
      renderToDoList();
      formBox.reset();
    }
  };
}

function deleteToDo(index) {
  Swal.fire({
    title: window.i18n ? window.i18n.t("areYouSure") : "Are you sure?",
    text: window.i18n
      ? window.i18n.t("deletedText")
      : "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: window.i18n ? window.i18n.t("cancelLogout") : "Cancel",
    confirmButtonText: window.i18n
      ? window.i18n.t("deleteConfirm")
      : "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: window.i18n ? window.i18n.t("deleted") : "Deleted!",
        text: window.i18n
          ? window.i18n.t("deletedText")
          : "Your file has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      findUser.myToDoLists.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
      renderToDoList();
    }
  });
}
if (findUser) {
  renderToDoList();
}
// End Handel Edite And Delete To Dos
// Open Buttons (Delete And Edit)
document.querySelector(".toDoList").addEventListener("click", function (event) {
  if (event.target.closest("#btnsOpen")) {
    const btns = event.target.closest(".toDo").querySelector(".btns");
    btns.classList.toggle("active");
    event.stopPropagation();
  }
});

document.querySelector("body").addEventListener("click", function (event) {
  const btns = document.querySelectorAll(".btns");
  btns.forEach((btn) => {
    if (
      !btn.contains(event.target) &&
      event.target !== btn.closest(".toDo").querySelector("#btnsOpen")
    ) {
      btn.classList.add("active");
    }
  });
});

// Start Button Checked To Do
document.querySelector(".toDoList").addEventListener("click", function (event) {
  if (event.target.closest("#isCompleteBtn")) {
    const btn = event.target.closest("#isCompleteBtn");
    const todoElement = btn.closest(".toDo");
    const index = [...todoElement.parentElement.children].indexOf(todoElement);

    findUser.myToDoLists[index].isCompleted =
      !findUser.myToDoLists[index].isCompleted;

    if (findUser.myToDoLists[index].isCompleted) {
      btn.style.backgroundColor = "rgb(49, 170, 12)";
      btn.style.color = "#fff";
      todoElement.style.backgroundColor = "#36aed31a";
      todoElement.style.borderInlineStart =
        "0.5rem solid hsl(var(--primary-color))";
    } else {
      btn.style.backgroundColor = "#fff";
      btn.style.color = "rgb(49, 170, 12)";
      todoElement.style.backgroundColor = "#fff";
      todoElement.style.borderInlineStart =
        "1px solid hsla(var(--text-color-secondary), 0.3)";
    }
    localStorage.setItem("users", JSON.stringify(users));
  }
});
// End Button Checked To Do
// Start Input Search To Do
let inputSearch = document.querySelector("#inputSearch");
inputSearch.addEventListener("input", function () {
  const showToDoList = document.querySelector(".toDoList");
  const toDos = showToDoList.querySelectorAll(".toDo");
  const searchValue = inputSearch.value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
  toDos.forEach((todo) => {
    const title = todo
      .querySelector(".title")
      .textContent.toLowerCase()
      .replace(/\s+/g, "");
    if (title.includes(searchValue)) {
      todo.style.display = "block";
    } else {
      todo.style.display = "none";
    }
  });
});
// End Input Search To Do
// Start Filter To Do
let filter = document.querySelector("#filter");
filter.addEventListener("change", function () {
  const showToDoList = document.querySelector(".toDoList");
  const toDos = showToDoList.querySelectorAll(".toDo");
  const filterValue = filter.value;
  if (filterValue === "all") {
    toDos.forEach((todo) => {
      todo.style.display = "block";
    });
  } else if (filterValue === "completed") {
    toDos.forEach((todo) => {
      // console.log(todo);
      const index = [...todo.parentElement.children].indexOf(todo);
      // console.log([...todo.parentElement.children]);
      const isCompleted = findUser.myToDoLists[index].isCompleted;
      if (isCompleted) {
        todo.style.display = "block";
      } else {
        todo.style.display = "none";
      }
    });
  } else {
    toDos.forEach((todo) => {
      const index = [...todo.parentElement.children].indexOf(todo);
      const isCompleted = findUser.myToDoLists[index].isCompleted;
      if (!isCompleted) {
        todo.style.display = "block";
      } else {
        todo.style.display = "none";
      }
    });
  }
});
