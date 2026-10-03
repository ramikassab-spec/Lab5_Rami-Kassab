"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Rami Kassab
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    errors = [];
    if (fullnameInput.value.trim() === "") {
        errors.push("Namn är obligatoriskt.");
    }
    if (emailInput.value.trim() === "") {
        errors.push("E-post är obligatoriskt.");
    }
    if (phoneInput.value.trim() === "") {
        errors.push("Telefon är obligatoriskt.");
    }
    displayErrors();
    return errors.length === 0;

    // Kontrollera formulärets obligatoriska fält

    // Visa eventuella felmeddelanden

    // Returnera resultatet (true eller false) av valideringen
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    errorList.innerHTML = "";
    for (let i = 0; i < errors.length; i++) {
        const li = document.createElement("li");
        li.textContent = errors[i];
        errorList.appendChild(li);
    }
    // Rensa tidigare felmeddelanden

    // Skriv ut aktuella felmeddelanden till DOM
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    // Hämta information från formuläret
    previewFullname.textContent = fullname;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;
    const font = fontSelect.value;
    previewFullname.style.fontFamily = font;
    previewEmail.style.fontFamily = font;
    previewPhone.style.fontFamily = font;

    const studentCard = {
        fullname: fullname,
        email: email,
        phone: phone,
        font: font
    };

    history.push(studentCard);
    saveHistory();
    renderHistory();



    // Uppdatera studentkortet

    // Lägg till studentkortet i historiken

    // Spara och uppdatera historiken
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    const historyData = JSON.stringify(history);
    localStorage.setItem("history", historyData);
    // Spara history i localStorage
    
}


/**
 * Läser in tidigare historik från localStorage.
 */

    // Hämta eventuell sparad historik
function loadHistory() {
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
        history = JSON.parse(savedHistory);
    }
  
    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
   
    // Skriv ut innehållet i history till DOM
     historySection.innerHTML = "";
    for (let i =  history.length -1; i >= 0; i--) {
        const card = document.createElement("div");
        const student = history[i];

        const name = document.createElement("p");
        name.textContent = student.fullname;
        card.appendChild(name);

        const email = document.createElement("p");
        email.textContent = student.email;
        card.appendChild(email);

        const phone = document.createElement("p");
        phone.textContent = student.phone;
        card.appendChild(phone);

        historySection.appendChild(card);
    }
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
    form.reset();
    previewFullname.textContent = "";
    previewEmail.textContent = "";
    previewPhone.textContent = "";

    // Rensa eventuella felmeddelanden
    errorList.innerHTML = "";

}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik
    localStorage.removeItem("history");
    history = [];
    renderHistory();
    // Uppdatera history och visningen på sidan
}


// Eventlyssnare
form.addEventListener("submit", function (event) {
    event.preventDefault(); 
    if (validateForm()) {
        createStudentCard();
    }
}
// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas


// När användaren klickar på "Rensa"
clearButton.addEventListener("click", function (event) {
    event.preventDefault();
    clearForm();
});

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", function (event) {
    event.preventDefault();
    deleteHistory();
});


// När sidan laddas:
// - läs in och visa eventuell tidigare historik