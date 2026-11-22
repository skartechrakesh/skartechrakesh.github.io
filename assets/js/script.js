'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");

    if (avatar && modalImg) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (title && modalTitle) {
      modalTitle.innerHTML = title.innerHTML;
    }
    if (text && modalText) {
      modalText.innerHTML = text.innerHTML;
    }

    testimonialsModalFunc();
  });
}

// add click event to modal close button and overlay
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// custom select and filter variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = (filterItems[i].dataset.category || "").toLowerCase();

    if (selectedValue === "all" || selectedValue === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

const syncFilterButtons = function (selectedValue) {
  for (let i = 0; i < filterBtn.length; i++) {
    const btnValue = filterBtn[i].textContent.trim().toLowerCase();
    filterBtn[i].classList.toggle("active", btnValue === selectedValue);
  }
};

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// add event in all select items (mobile/compact view)
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    const label = this.textContent.trim();
    const selectedValue = label.toLowerCase();

    if (selectValue) {
      selectValue.textContent = label;
    }

    elementToggleFunc(select);
    filterFunc(selectedValue);
    syncFilterButtons(selectedValue);
  });
}

// add event in all filter button items (desktop view)
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const label = this.textContent.trim();
    const selectedValue = label.toLowerCase();

    if (selectValue) {
      selectValue.textContent = label;
    }

    filterFunc(selectedValue);
    syncFilterButtons(selectedValue);
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  form.addEventListener("submit", function (event) {
    const actionAttr = (form.getAttribute("action") || "").trim();
    if (actionAttr === "" || actionAttr === "#") {
      event.preventDefault();
      const btnLabel = formBtn.querySelector("span");
      const originalText = btnLabel ? btnLabel.textContent : "Send Message";

      if (btnLabel) {
        btnLabel.textContent = "Message Ready";
      }
      form.reset();
      formBtn.setAttribute("disabled", "");

      setTimeout(function () {
        if (btnLabel) {
          btnLabel.textContent = originalText;
        }
      }, 2500);
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.textContent.trim().toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      const isMatch = pages[j].dataset.page === targetPage;
      pages[j].classList.toggle("active", isMatch);

      if (navigationLinks[j]) {
        const linkPage = navigationLinks[j].textContent.trim().toLowerCase();
        navigationLinks[j].classList.toggle("active", linkPage === targetPage);
      }
    }

    window.scrollTo(0, 0);
  });
}
