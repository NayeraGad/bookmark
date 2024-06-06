var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submitBtn = document.querySelector(".submitBtn");
var displayBox = document.querySelector(".displayBox .row");

var bookmarks = [];

function addBookmark() {
  if (siteName.value === "" || siteURL.value === "") {
    return;
  }

  var bookmarkInfo = {
    name: siteName.value,
    url: siteURL.value,
  };

  bookmarks.push(bookmarkInfo);
  displayContent();
}

function displayContent() {
  var bookmarkRow = "";
  for (var i = 0; i < bookmarks.length; i++) {
    bookmarkRow += `
          <div class="col-3">
            <span>${i + 1}</span>
          </div>
          <div class="col-4">
            <span>${bookmarks[i].name}</span>
          </div>
          <div class="col-2">
            <a href="${
              bookmarks[i].url
            }" target="_blank" class="btn btn-success">Visit</a>
          </div>
          <div class="col-2">
            <button class="btn btn-danger">Delete</button>
          </div>`;
  }
  displayBox.innerHTML = bookmarkRow;
}

submitBtn.addEventListener("click", addBookmark);
