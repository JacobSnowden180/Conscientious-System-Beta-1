(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");
  var form = document.querySelector("#waitlist-form");
  var thanks = document.querySelector("#thanks");
  var input = document.querySelector("#email");
  var error = document.querySelector("#email-error");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setNav(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    toggle.querySelector(".nav-toggle-label").textContent = open ? "Close" : "Menu";
  }

  toggle.addEventListener("click", function () {
    setNav(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setNav(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setNav(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 820) setNav(false);
  });

  input.addEventListener("input", function () {
    if (input.getAttribute("aria-invalid") === "true") {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var value = input.value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!valid) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = value
        ? "That doesn’t look like an email yet."
        : "Enter an email so we know where to write.";
      input.focus();
      return;
    }

    input.setAttribute("aria-invalid", "false");
    error.textContent = "";
    thanks.querySelector(".thanks-email").textContent = value;
    form.hidden = true;
    thanks.hidden = false;
    thanks.focus();
  });
})();
