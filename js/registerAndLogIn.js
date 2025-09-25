const formRL = document.querySelector("#formRL");
const btnForm = formRL.querySelector(".btnForm");
const NotshowPass = document.querySelector("#NotshowPass");
const showPass = document.querySelector("#showPass");
const password = document.querySelector("#password");

// Show Password
showPass.addEventListener("click", function () {
  password.type = "text";
  NotshowPass.classList.toggle("active");
});

NotshowPass.addEventListener("click", function () {
  password.type = "password";
  NotshowPass.classList.toggle("active");
});

// change style between login and register
const btnHeader = document.querySelector("#btnHeader");
const nameLabel = formRL.querySelector(".nameLabel");
const addressForm = formRL.querySelector(".addressForm");

btnHeader.addEventListener("click", function () {
  if (
    btnHeader.innerHTML == "Register" ||
    btnHeader.getAttribute("data-i18n") === "register"
  ) {
    nameLabel.classList.remove("active");
    if (window.i18n) {
      btnHeader.setAttribute("data-i18n", "signIn");
      btnForm.setAttribute("data-i18n", "register");
      addressForm.setAttribute("data-i18n", "register");
      window.i18n.i18nApply();
    } else {
      btnHeader.innerHTML = "Register";
      btnForm.innerHTML = "login";
      addressForm.innerHTML = "login";
      
    }
  } else {
    nameLabel.classList.add("active");
    if (window.i18n) {
      btnHeader.setAttribute("data-i18n", "register");
      btnForm.setAttribute("data-i18n", "signIn");
      addressForm.setAttribute("data-i18n", "signIn");
      window.i18n.i18nApply();
    } else {
      btnHeader.innerHTML = "LogIn";
      btnForm.innerHTML = "Register";
      addressForm.innerHTML = "Register";
    }
  }
});

// handel Form
class User {
  constructor(name, email, password, myToDoLists = []) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.myToDoLists = myToDoLists;
  }
}
formRL.addEventListener("submit", function (e) {
  e.preventDefault();
  let nameInput = formRL.querySelector("#name").value.trim();
  let email = formRL.querySelector("#email").value.trim();
  let passwordValue = formRL.querySelector("#password").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  const usersFind = users.find((user) => user.email === email);
  //handel Register page
  if (btnForm.innerHTML == "Register" || btnForm.innerHTML == "إنشاء حساب") {
    if (nameInput === "") {
      return Swal.fire(
        window.i18n
          ? window.i18n.t("pleaseEnterName")
          : "Please Enter Your Name"
      );
    } else if (email === "") {
      return Swal.fire(
        window.i18n
          ? window.i18n.t("pleaseEnterEmail")
          : "Please Enter Your email"
      );
    } else if (passwordValue === "") {
      return Swal.fire(
        window.i18n
          ? window.i18n.t("pleaseEnterPassword")
          : "Please Enter Your password"
      );
    } else if (usersFind) {
      Swal.fire(
        window.i18n ? window.i18n.t("userExists") : "User already exists"
      );
    } else if (!emailRegex.test(email)) {
      return Swal.fire(
        window.i18n
          ? window.i18n.t("emailInvalid")
          : "Please enter a valid email address"
      );
    } else {
      const userOne = new User(nameInput, email, passwordValue);
      localStorage.setItem("currentUser", JSON.stringify(userOne.email));
      users.push(userOne);
      localStorage.setItem("users", JSON.stringify(users));
      formRL.reset();
      setTimeout(() => {
        Swal.fire({
          title: window.i18n ? window.i18n.t("success") : "success",
          icon: "success",
          draggable: true,
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          location.replace("index.html");
        });
      }, 0);
    }
  }
  //handel LogIn page
  else {
    const user = users.find(
      (u) => u.email === email && u.password === passwordValue
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user.email));
      setTimeout(() => {
        Swal.fire({
          title: window.i18n ? window.i18n.t("success") : "success",
          icon: "success",
          draggable: true,
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          location.replace("index.html");
        });
      }, 0);
    } else if (passwordValue === "" || email === "") {
      Swal.fire(
        window.i18n ? window.i18n.t("fillAllInputs") : "Please Fill All Inputs"
      );
    } else if (!usersFind) {
      Swal.fire(
        window.i18n ? window.i18n.t("registerFirst") : "Please Register First"
      );
    } else {
      Swal.fire(
        window.i18n
          ? window.i18n.t("emailOrPasswordWrong")
          : "Email or password is wrong"
      );
    }
  }
});
