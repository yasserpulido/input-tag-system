"strict mode";

const response = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Godfather: Part II",
  "The Dark Knight",
  "12 Angry Men",
  "Schindler's List",
  "Pulp Fiction",
  "The Lord of the Rings: The Return of the King",
  "The Good, the Bad and the Ugly",
  "Fight Club",
];

// Get elements from HTML.
const tagSystem = document.querySelector(".tag-system");
const inputSection = document.querySelector(".tag-system__input-section");
const inputTagSystem = document.querySelector(".tag-system__input");
const buttonArrow = document.querySelector(".tag-system__icon--btn-arrow");
const buttonDelete = document.querySelector(".tag-system__icon--btn-delete");

class App {
  #data = [];

  constructor(response) {
    this.#data = response;
    inputTagSystem.addEventListener("focusin", this._displayToggle.bind(this));
    inputTagSystem.addEventListener("focusout", this._displayToggle.bind(this));
    inputTagSystem.addEventListener("keyup", this._dropdownFilter.bind(this));
    buttonDelete.addEventListener("click", this._deleteField.bind(this));
    buttonArrow.addEventListener("click", this._displayToggle.bind(this));
  }

  _deleteField() {
    inputTagSystem.value = "";
    this._dropdownDisplay();
  }

  _dropdownFilter(e) {
    const result = this.#data.filter((d) => {
      return d.toLowerCase().includes(e.target.value.toLowerCase());
    });

    this._dropdownList(result);
    this._dropdownDisplay(true);
  }

  _displayToggle() {
    const listSection = document.querySelector(".tag-system__list-section");

    if (!listSection) {
      this._dropdownList(this.#data);
      this._dropdownDisplay(true);
    } else {
      this._dropdownDisplay(false);
    }
  }

  _dropdownList(data) {
    this._removeList();

    if (data.length > 0) {
      this._showOptions(data);
    } else {
      this._showNoOptions(data);
    }
  }

  _showOptions(data) {
    let objList = {
      div: document.createElement("div"),
      ul: document.createElement("ul"),
      li: "",
    };

    objList.div.classList.add("tag-system__list-section");
    tagSystem.appendChild(objList.div);
    objList.div.appendChild(objList.ul);

    data.forEach((element) => {
      objList.li = document.createElement("li");
      objList.li.textContent = element;
      objList.ul.appendChild(objList.li);
    });
  }

  _showNoOptions(data) {
    let objList = {
      div: document.createElement("div"),
      ul: document.createElement("ul"),
      li: "",
    };

    objList.li = document.createElement("li");
    objList.div.classList.add("tag-system__list-section");
    tagSystem.appendChild(objList.div);

    data[0] = "No options";

    objList.li.textContent = data[0];
    objList.ul.appendChild(objList.li);
    objList.div.appendChild(objList.ul);
  }

  _dropdownDisplay(hasData) {
    const listSection = document.querySelector(".tag-system__list-section");

    if (listSection) {
      if (hasData) {
        listSection.classList.add("tag-system__list-section--show");
        buttonArrow.classList.replace("fa-chevron-down", "fa-chevron-up");
      } else {
        this._removeList();
      }
    }
  }

  _removeList() {
    const listSection = document.querySelector(".tag-system__list-section");

    if (listSection) {
      tagSystem.removeChild(listSection);
    }
  }
}

const app = new App(response);
