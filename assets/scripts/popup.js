//https://dev.to/michaelburrows/how-to-save-data-in-localstorage-using-javascript-994
//Add radio btn on `open` delete yes/no
//Add prompt ako ima li prompt else ne
//add btn saves the current tab address
document.addEventListener("DOMContentLoaded", function (event) {
  // === MODAL
  var optionsModal = document.getElementById("optionsModal");
  var btnOptions = document.getElementById("btnOptions");
  var closemodal = document.getElementsByClassName("close")[0];
  btnOptions.addEventListener("click", function () {
    optionsModal.className = "Modal anim-opacity";
    optionsModal.style.display = "block";
  });
  closemodal.addEventListener("click", function () {
    optionsModal.style.display = "none";
  });
  // === MODAL END
  // === OPTIONS CHECKBOX
  let allLinks = document.querySelectorAll("btnO");
  let optionsCheckbox = document.querySelector("#optionsCheckbox");
  let optionsStorage = localStorage.getItem("checkbox")
    ? JSON.parse(localStorage.getItem("checkbox"))
    : [];
  //to storage & change state
  optionsCheckbox.addEventListener("change", () => {
    if (optionsCheckbox.checked) {
      optionsStorage.push(optionsCheckbox.value);
      localStorage.setItem("checkbox", JSON.stringify(optionsStorage));

      allLinks.forEach((element) => (element = btnX));
    } else {
      localStorage.removeItem("checkbox"); //problem zapomnq starite pri povtorno
    }
  });
  //
  if (localStorage.getItem("checkbox") === null) {
    optionsCheckbox.checked = false;
  } else {
    optionsCheckbox.checked = true;
  }
  //

  // === OPTIONS CHECKBOX END
  // ===================================================================================================
  let noteForm = document.querySelector("#note-form");
  let noteInput = document.querySelector("#note-input");
  let noteSubmit = document.querySelector("#note-submit");
  let notes = document.querySelector("#notes");
  let notesStorage = localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [];

  notes.style.paddingBottom = "5%";

  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    notesStorage.push(noteInput.value);
    localStorage.setItem("notes", JSON.stringify(notesStorage));
    listBuilder(noteInput.value);
    noteInput.value = "";

    window.location.reload();
  });

  const listBuilder = (text) => {
    let txtOutput = text.slice(8, 26);
    const note = document.createElement("li");
    note.style.boxShadow = "0px 3px 7px 0px rgba(0,0,0,1)";
    note.className = "list-group-item";
    note.innerHTML = `<div class="row" style="width: 300px;">
      <div class="col-7 text-truncate">${text}</div>
      <div class="col-5">
        <div class="d-flex justify-content-center">
        <a href='${text}' class="btnO btn btn-sm btn-success" target="_blank">Open</a> 
        <button class="btnX btn btn-sm btn-danger ms-1">&times;</button>
        </div>
      </div>
    </div`;
    //note.innerHTML = 
    //`${txtOutput} <a href='${text}' class="btnO btn btn-sm btn-success" target="_blank">Open</a> <button class="btnX btn btn-sm btn-danger ms-1">&times;</button>`

    notes.appendChild(note);
  };

  const getNotes = JSON.parse(localStorage.getItem("notes"));
  getNotes.forEach((note) => {
    listBuilder(note);
  });

  let btnX = document.querySelectorAll(".btnX");
  btnX.forEach((element) =>
    element.addEventListener("click", (e) => {
      let el = element.parentNode;
      const index = [...el.parentElement.children].indexOf(el && el + 1);
      notesStorage.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesStorage));
      el.remove();

      window.location.reload();
    })
  );
  // ===================================================================================
  // === Close Page Btn
  let closePageBtn = document
    .querySelector("#closePage")
    .addEventListener("click", (e) => {
      window.open("", "_parent", "");
      window.close();
    });
  // === Close Page Btn End
  let currentBtn = document.querySelector("#submit-current");
  currentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    saveCurrent();
    let currentUrl = parent.document.URL;
    notesStorage.push(currentUrl);
    localStorage.setItem("notes", JSON.stringify(notesStorage));
    listBuilder(currentUrl);
    noteInput.value = "";

    window.location.reload();
  });

  const saveCurrent = (text) => {
    let currentUrl = JSON.stringify(parent.document.location.href);
    console.log(currentUrl);

    const note = document.createElement("li");
    note.style.boxShadow = "0px 3px 7px 0px rgba(0,0,0,1)";
    note.className = "list-group-item";
    note.innerHTML = `<div class="row" style="width: 300px;">
      <div class="col-8 text-truncate">${currentUrl}</div>
      <div class="col-4">
        <div class="d-flex justify-content-center">
        <a href='${currentUrl}' class="btn btn-sm btn-success openBtn" target="_blank">Open</a> <button class="btnX btn btn-sm btn-danger ms-1">&times;</button>
        </div>
      </div>
    </div`;

    notes.appendChild(note);
  };

  // === !
  let btnI = document.querySelectorAll(".btnI");
  btnI.forEach((element) =>
    element.addEventListener("click", (e) => {
      e.preventDefault();
      let Modal = document.createElement("div");
      Modal.className = "Modal";
      Modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h5>smth</h5>
          <div class="d-inline-block">
            <label for="">Set link name </label> <input class="" type="text">
          </div>
        </div>
      `;
    })
  );
});
