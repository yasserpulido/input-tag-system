"strict mode";

// Response MOCK.
const response = [
  {
    title: "HTML",
    id: 0,
  },
  {
    title: "CSS",
    id: 1,
  },
  {
    title: "C#",
    id: 3,
  },
  {
    title: "JavaScript",
    id: 4,
  },
  {
    title: "TypeScript",
    id: 5,
  },
  {
    title: "Java",
    id: 6,
  },
  {
    title: "BEM",
    id: 7,
  },
  {
    title: "React",
    id: 8,
  },
  { title: "Angular", id: 9 },
  { title: "Bootstrap", id: 10 },
];

// Get elements from HTML.
const tagSystem = document.querySelector(".tag-system");
const inputSection = document.querySelector(".tag-system__input-section");
const inputTagSystem = document.querySelector(".tag-system__input");

class App {
  #data = [];
  #tags = [];

  constructor(response) {
    this.#data = response;
    inputTagSystem.addEventListener("focusin", this._inputFocus.bind(this));
    inputTagSystem.addEventListener("keyup", this._dropdownFilter.bind(this));
    document.onclick = this._preventCloseDropdownPanel.bind(this);
  }

  // Reset the field
  _resetField() {
    inputTagSystem.value = "";
    this._dropdownDisplay();
  }

  // Prevent close dropdown panel by clicking.
  _preventCloseDropdownPanel(e) {
    if (
      e.target.className !== "tag-system__list" &&
      e.target.className !== "tag-system__input" &&
      e.target.className !== "tag-system__control-section" &&
      e.target.className !== "tag-system"
    ) {
      this._dropdownDisplay(false);
    }
  }

  // Filter dropdown list by value typed.
  _dropdownFilter(e) {
    // If enter is typed.
    if (e.keyCode == 13) {
      const result = this.#data.find(
        (d) => d.title.toLowerCase() === e.target.value.toLowerCase()
      );

      //   Send an object.
      if (result) {
        this._addTag(result);
      }
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

    const listSection = document.querySelector(".tag-system__list-section");
    listSection.addEventListener(
      "click",
      function (e) {
        const result = this.#data.find((d) => d.id === +e.target.id);
        this._addTag(result);
      }.bind(this)
    );
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
      this._calculatePositionDropdownListPanel();
      listSection.classList.add("tag-system__list-section--show");
    } else {
      this._removeList();
    }
  }

  // Calculate dropdown list panel position.
  _calculatePositionDropdownListPanel() {
    const tagSystemHeight = tagSystem.offsetHeight;
    const listSection = document.querySelector(".tag-system__list-section");
    listSection.style.top = `${tagSystemHeight}px`;
  }

  // Remove the list section.
  _removeList() {
    const listSection = document.querySelector(".tag-system__list-section");

    if (listSection) {
      tagSystem.removeChild(listSection);
    }
  }

  // Create HTML element related to tags.
  _addTag(data) {
    let objTag = {
      div: document.createElement("div"),
      span: document.createElement("span"),
      p: document.createElement("p"),
      a: document.createElement("a"),
      i: document.createElement("i"),
      content: "",
    };

    const tagSection = document.querySelector(".tag-system__tag-section");
    if (!tagSection) {
      // Add class and insert a div.
      objTag.div.classList.add("tag-system__tag-section");
      inputSection.insertBefore(objTag.div, inputTagSystem);
    }

    // Add class and insert a span.
    objTag.span.classList.add("tag-system__tag");
    tagSection.appendChild(objTag.span, inputTagSystem[0]);

    // Add value to parragraph and content and then insert a parragraph.
    objTag.p.textContent = data.title.toLowerCase().trim();
    objTag.content = objTag.p.textContent;
    objTag.span.appendChild(objTag.p);
    objTag.p.addEventListener("click", this._editTag.bind(this, objTag));

    // Add class to anchor and insert the anchor into span.
    objTag.a.classList.add("tag-delete");
    objTag.span.appendChild(objTag.a);
    objTag.a.addEventListener("click", this._deleteTag.bind(this, objTag));

    // Set class into i HTML element and then insert into anchor.
    objTag.i.setAttribute("class", "fa-solid fa-xmark");
    objTag.a.appendChild(objTag.i);

    this._resetField();

    this.#tags.push(objTag);
  }

  // Delete tag.
  _deleteTag(tag) {
    this.#tags.splice(this.#tags.indexOf(tag), 1);
    tag.span.remove();
  }

  // Edit tag.
  _editTag(tag) {
    this._deleteTag(tag);
    inputTagSystem.value = tag.p.textContent;
    tag.span.remove();
  }
}

const app = new App(response);
