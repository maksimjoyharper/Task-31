export class Form extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="container">
    <form class="form" action="" novalidate>
            <div class="form-box">
                    <input type="text" class="input input-all input-name" name="fullName"
                            placeholder="FullName">
                    <span id="fullNameError" class="error-input"></span>
            </div>
            <div class="form-box">
                    <input type="date" class="input input-all input-date" name="birthday">
                    <span id="dateError" class="error-input"></span>
            </div>

            <div class="form-box">
                    <input type="email" class="input input-all input-email" name="email"
                            placeholder="Email">
                    <span id="emailError" class="error-input"></span>
            </div>
            <div class="form-box">
                    <input type="tel" class="input input-all input-phone" name="phone" placeholder="Phone">
                    <span id="telError" class="error-input"></span>
            </div>
            <div class="form-box">
                    <input type="password" class="input input-all  input-password" name="password"
                            placeholder="Password">
                    <span id="passwordError" class="error-input"></span>
            </div>
            <button class="btn" type="submit">
                    Submit
            </button>
    </form>
</div>`;

    let form = document.querySelector(".form");
    let formInputs = document.querySelectorAll(".input-all");
    let inputName = document.querySelector(".input-name");
    let inputDate = document.querySelector(".input-date");
    let inputEmail = document.querySelector(".input-email");
    let inputPhone = document.querySelector(".input-phone");
    let inputPassword = document.querySelector(".input-password");
    let nameError = document.getElementById("fullNameError");
    let passwordError = document.getElementById("passwordError");
    let telError = document.getElementById("telError");
    let emailError = document.getElementById("emailError");

    function validateName(name) {
      let reg = /^[а-яё]+$/i;
      return reg.test(String(name));
    }

    function validateEmail(email) {
      let reg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(String(email));
    }

    function validatePassword(password) {
      let reg =
        /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/;
      return reg.test(String(password));
    }

    function validatePhone(phone) {
      let reg = /^[0-9+]{3,15}/g;
      return reg.test(String(phone));
    }

    inputName.addEventListener("blur", function () {
      let nameVal = inputName.value;
      if (nameVal.length === 0 || !validateName(nameVal)) {
        inputName.classList.add("error");
        nameError.textContent = "Используйте буквы кириллицы";
        return false;
      } else {
        inputName.classList.remove("error");
        nameError.textContent = "";
      }
    });

    inputDate.addEventListener("blur", function () {
      let dateVal = inputDate.value;
      if (dateVal === "") {
        inputDate.classList.add("error");
      } else {
        inputDate.classList.remove("error");
      }
    });

    inputEmail.addEventListener("blur", function () {
      let emailVal = inputEmail.value;
      if (!validateEmail(emailVal)) {
        inputEmail.classList.add("error");
        emailError.textContent = "Неправильный Email";
        return false;
      } else {
        inputEmail.classList.remove("error");
        emailError.textContent = "";
      }
    });

    inputPhone.addEventListener("blur", function () {
      let phoneVal = inputPhone.value;
      if (!validatePhone(phoneVal)) {
        telError.textContent = "Номер телефона должен быть от 3 до 15 цифр";
        inputPhone.classList.add("error");
        return false;
      } else {
        inputPhone.classList.remove("error");
        telError.textContent = "";
      }
    });

    inputPassword.addEventListener("blur", function () {
      let passwordVal = inputPassword.value;
      if (!validatePassword(passwordVal)) {
        passwordError.textContent =
          "Пароль должен содержать минимум 8 символов (хотя бы одна заглавная буква, одна цифра и один специальный символ)";
        inputPassword.classList.add("error");
        return false;
      } else {
        inputPassword.classList.remove("error");
        passwordError.textContent = "";
      }
    });

    form.onsubmit = function () {
      let emptyInputs = Array.from(formInputs).filter(
        (input) => input.value === ""
      );
      formInputs.forEach(function (input) {
        if (input.value === "") {
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      });

      if (emptyInputs.length !== 0) {
        return false;
      }
    };
  }
}
