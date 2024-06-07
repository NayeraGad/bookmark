var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submitBtn = document.querySelector(".submitBtn");
var displayBox = document.querySelector(".displayBox .displayContent");
var alertBox = document.querySelector(".alertBox");
var alertContent = document.querySelector(".alertContent");
var closeBtn = document.querySelector(".closeBtn");

var bookmarks = [];

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex =
  /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/;

if (localStorage.getItem("bookmarks") !== null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayContent();
} else {
  bookmarks = [];
}

function addBookmark() {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmarkInfo = {
      name: siteName.value,
      url: siteURL.value,
    };

    bookmarks.push(bookmarkInfo);
    displayContent();
    clearInput();

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    alertBox.classList.replace("d-none", "d-flex");
  }
}

function displayContent() {
  var bookmarkRow = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var userURL = bookmarks[i].url;
    var validURL, fixedURL;

    if (userURL.startsWith("https://") || userURL.startsWith("http://")) {
      validURL = userURL;
      fixedURL = userURL.replace(/^https?:\/\//, "");
    } else {
      fixedURL = userURL;
      validURL = `https://${userURL}`;
    }
    bookmarkRow += `
            <div class="col-2 px-4">
              <span>${i + 1}</span>
            </div>

            <div class="col-4 text-capitalize">
              <span>${bookmarks[i].name}</span>
            </div>

            <div class="col-3 d-flex justify-content-center">
              <a href="${validURL}" target="_blank"' 
              class="btn green-bg">
              <i class="fa-solid fa-eye"></i>
              <span class="btnText">Visit</span></a>
            </div>

            <div class="col-3 d-flex justify-content-center">
              <button onclick='deleteBookmark(${i})' class="deleteBtn btn tomato-bg"><i class="fa-solid fa-trash-can"></i> 
              <span class="btnText">Delete</span></button>
            </div>`;
  }
  displayBox.innerHTML = bookmarkRow;
}

function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  displayContent();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function validate(regex, input) {
  var isValid = regex.test(input.value);

  if (input.value === "") {
    input.classList.remove("is-valid", "is-invalid");
  } else {
    if (isValid) {
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
    } else {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
    }
  }
}

submitBtn.addEventListener("click", addBookmark);

siteName.addEventListener("input", function () {
  validate(nameRegex, siteName);
});

siteURL.addEventListener("input", function () {
  validate(urlRegex, siteURL);
});

closeBtn.addEventListener("click", function () {
  alertBox.classList.replace("d-flex", "d-none");
});

alertContent.addEventListener("click", function (e) {
  e.stopPropagation();
});

alertBox.addEventListener("click", function () {
  alertBox.classList.replace("d-flex", "d-none");
});

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    alertBox.classList.replace("d-flex", "d-none");
  }
});
