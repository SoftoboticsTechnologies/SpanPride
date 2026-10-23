/* Header behaviour: sticky shadow + accessible mobile drawer menu */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  var backdrop = document.querySelector(".nav-backdrop");
  var mobileQuery = window.matchMedia("(max-width: 1024px)");

  /* Sticky header state */
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!toggle || !nav) return;

  var lastFocus = null;

  function focusables() {
    return Array.prototype.slice.call(
      nav.querySelectorAll("a[href], button:not([disabled])")
    ).concat(toggle);
  }

  function setInert(open) {
    // Hide drawer links from keyboard/AT on mobile while it is closed
    if (mobileQuery.matches && !open) nav.setAttribute("aria-hidden", "true");
    else nav.removeAttribute("aria-hidden");
    nav.querySelectorAll("a, button").forEach(function (el) {
      if (mobileQuery.matches && !open) el.setAttribute("tabindex", "-1");
      else el.removeAttribute("tabindex");
    });
  }

  function openMenu() {
    lastFocus = document.activeElement;
    nav.classList.add("is-open");
    if (backdrop) backdrop.classList.add("is-visible");
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    setInert(true);
    var first = nav.querySelector("a[href]");
    if (first) first.focus();
  }

  function closeMenu(returnFocus) {
    nav.classList.remove("is-open");
    if (backdrop) backdrop.classList.remove("is-visible");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Main menu toggle");
    setInert(false);
    if (returnFocus && lastFocus) lastFocus.focus();
  }

  toggle.addEventListener("click", function () {
    if (nav.classList.contains("is-open")) closeMenu(true);
    else openMenu();
  });

  if (backdrop) backdrop.addEventListener("click", function () { closeMenu(true); });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a") && nav.classList.contains("is-open")) closeMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (!nav.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      closeMenu(true);
      return;
    }
    if (e.key === "Tab") {
      // keep focus inside the drawer + toggle while open
      var items = focusables();
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  function onBreakpoint() {
    if (!mobileQuery.matches && nav.classList.contains("is-open")) closeMenu(false);
    setInert(nav.classList.contains("is-open"));
  }
  if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", onBreakpoint);
  else mobileQuery.addListener(onBreakpoint);
  onBreakpoint();
})();
