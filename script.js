"strict mode";

const response = [
  {
    title: "The Shawshank Redemption",
    id: 0,
  },
  {
    title: "The Godfather",
    id: 1,
  },
  {
    title: "The Godfather: Part II",
    id: 3,
  },
  {
    title: "The Dark Knight",
    id: 4,
  },
  {
    title: "12 Angry Men",
    id: 5,
  },
  {
    title: "Schindler's List",
    id: 6,
  },
  {
    title: "Pulp Fiction",
    id: 7,
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    id: 8,
  },
  { title: "The Good, the Bad and the Ugly", id: 9 },
  { title: "Fight Club", id: 10 },
];

// Get elements from HTML.
const tagSystem = document.querySelector(".tag-system");
const inputSection = document.querySelector(".tag-system__input-section");
const inputTagSystem = document.querySelector(".tag-system__input");
const buttonArrow = document.querySelector(".tag-system__icon--btn-arrow");
const buttonDelete = document.querySelector(".tag-system__icon--btn-delete");

class App {
  #data = [];
  #tags = [];
  ulPanel;

  constructor(response) {
    this.#data = response;
    inputTagSystem.addEventListener("focusin", this._inputFocus.bind(this));
    inputTagSystem.addEventListener("keyup", this._dropdownFilter.bind(this));
    buttonDelete.addEventListener("click", this._resetField.bind(this));
    buttonArrow.addEventListener("click", this._arrowToggle.bind(this));
    document.onclick = this._preventCloseDropdownPanel.bind(this);
  }

  //   _selectList(ul) {
  //     if (ul.target.className === "tag-system__list") {
  //       inputTagSystem.value = ul.target.innerHTML;
  //       inputTagSystem.focus();
  //     }
  //   }

  //   _dropdrownArrow() {
  //     this._displayToggle();
  //   }

  // Reset the field
  _resetField() {
    inputTagSystem.value = "";
    this._dropdownDisplay();
  }

  // Prevent close dropdown panel by clicking.
  _preventCloseDropdownPanel(e) {
    if (
      e.target.className !== "tag-system__list" &&
      e.target.className !== "fa-solid fa-chevron-down" &&
      e.target.className !== "tag-system__input" &&
      e.target.className !== "tag-system__control-section" &&
      e.target.className !== "tag-system"
    ) {
      this._dropdownDisplay(false);
    }
  }

  // Filter dropdown list by value typed.
  _dropdownFilter(e) {
    if (e.keyCode == 13) {
      this._addTag(e.srcElement.value);
    }

    const result = this.#data.filter((d) => {
      return d.title.toLowerCase().includes(e.target.value.toLowerCase());
    });

    this._dropdownList(result);
    this._dropdownDisplay(true);
  }

  // Control behavior when input is focused.
  _inputFocus() {
    this._dropdownList(this.#data);
    this._dropdownDisplay(true);
  }

  // Control behavior when arrow button is clicked.
  _arrowToggle() {
    const listSection = document.querySelector(".tag-system__list-section");

    if (!listSection) {
      this._dropdownList(this.#data);
      this._dropdownDisplay(true);
    } else {
      this._dropdownDisplay(false);
    }
  }

  // Control what data is going to be filled.
  _dropdownList(data) {
    this._removeList();

    if (data.length > 0) {
      this._fillData(data);
    } else {
      this._fillWithoutData(data);
    }
  }

  // Create HTML element with data received.
  _fillData(data) {
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
      objList.li.setAttribute("id", element.id);
      objList.li.classList.add("tag-system__list");
      objList.li.textContent = element.title;
      objList.ul.appendChild(objList.li);
    });
  }

  // Control HTML element with "No Options".
  _fillWithoutData(data) {
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

  // Control the visibility of the list section.
  _dropdownDisplay(hasData) {
    const listSection = document.querySelector(".tag-system__list-section");

    if (hasData) {
      listSection.classList.add("tag-system__list-section--show");
    } else {
      this._removeList();
    }
  }

  // Remove the list section.
  _removeList() {
    const listSection = document.querySelector(".tag-system__list-section");

    if (listSection) {
      tagSystem.removeChild(listSection);
    }
  }

  // Create HTML element related to tags.
  _addTag(optionSelected) {
    let objTag = {
      div: document.createElement("div"),
      span: document.createElement("span"),
      p: document.createElement("p"),
      a: document.createElement("a"),
      i: document.createElement("i"),
      content: "",
    };

    objTag.div.classList.add("tag-system__tag-section");
    inputSection.appendChild(objTag.div);

    objTag.span.classList.add("tag-system__tag");
    const tagSection = document.querySelector(".tag-system__tag-section");
    tagSection.appendChild(objTag.span, inputTagSystem[0]);

    // objTag.p.addEventListener("click", function () {
    //   _editTag(objTag);
    // });
    objTag.p.textContent = optionSelected.toLowerCase().trim();
    objTag.content = objTag.p.textContent;
    objTag.span.appendChild(objTag.p);

    objTag.a.classList.add("tag-delete");
    // objTag.a.addEventListener("click", function () {
    //   _deleteTag(objTag);
    // });
    objTag.span.appendChild(objTag.a);

    objTag.i.setAttribute("class", "fa-solid fa-xmark");
    objTag.a.appendChild(objTag.i);

    this._resetField();

    this.#tags.push(objTag);
  }

  // Delete tag.
  _deleteTag(tag) {
    tags.splice(tags.indexOf(tag), 1);
    tag.span.remove();
  }

  // Edit tag.
  _editTag(tag) {
    _deleteTag(tag);
    textInput[0].value = tag.p.textContent;
    tag.span.remove();
  }
}

const app = new App(response);
