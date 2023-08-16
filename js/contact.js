const form = document.querySelector("#form");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const yourName = document.querySelector("#name");
const nameError = document.querySelector("#nameError");

const subject = document.querySelector("#subject");
const nameSubject = document.querySelector("#nameSubject");

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const messageSent = document.querySelector("#messageSent");



function validateForm(event){
  event.preventDefault();


if (validateEmail(email.value)) {
  emailError.style.display = "none";
} else {
  emailError.style.display = "block";
}

if (checkLength(yourName.value, 5)) {
  nameError.style.display = "none";
} else {
  nameError.style.display = "block";
}

if (checkLength(subject.value, 15)) {
  subjectError.style.display = "none";
} else {
  subjectError.style.display = "block";
}


if (checkLength(message.value, 25)) {
  messageError.style.display = "none";
} else {
  messageError.style.display = "block";
}

if (validateEmail(email.value) && checkLength(yourName.value, 5)
&& checkLength(subject.value, 15) && checkLength(message.value, 25)) {
  messageSent.innerHTML = `<div id="messageSent">Your message is sent!</div>`;
  messageSent.style.display = "block";
  form.reset();
}

}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

