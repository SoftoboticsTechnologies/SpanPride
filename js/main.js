/* Page behaviour: carousels, counters, scroll reveal, social links, contact form */
(function () {
  "use strict";

  var config = window.SPAN_CONFIG || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.remove("no-js");

  /* ---------------------------------------------------------------------
     Carousel — one slide at a time, infinite, arrows + dots, swipe,
     keyboard arrows, optional autoplay that pauses on hover/interaction.
     Mirrors the original Elementor image-carousel settings.
     ------------------------------------------------------------------- */
  var ICON_PREV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  var ICON_NEXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';

  function Carousel(root) {
    var track = root.querySelector(".carousel__track");
    var slides = Array.prototype.slice.call(track.children);
    var total = slides.length;
    var index = 0;
    var timer = null;
    var autoplay = parseInt(root.getAttribute("data-autoplay"), 10) || 0;
    var paused = false;
    var stopped = false; // pause_on_interaction: stop autoplay after manual use

    root.setAttribute("role", "region");
    root.setAttribute("aria-roledescription", "carousel");
    slides.forEach(function (s, i) {
      s.setAttribute("role", "group");
      s.setAttribute("aria-roledescription", "slide");
      s.setAttribute("aria-label", (i + 1) + " of " + total);
    });

    if (total < 2) {
      root.classList.add("carousel--single");
      return;
    }

    root.setAttribute("tabindex", "0");

    var prev = document.createElement("button");
    prev.type = "button";
    prev.className = "carousel__btn carousel__btn--prev";
    prev.setAttribute("aria-label", "Previous slide");
    prev.innerHTML = ICON_PREV;

    var next = document.createElement("button");
    next.type = "button";
    next.className = "carousel__btn carousel__btn--next";
    next.setAttribute("aria-label", "Next slide");
    next.innerHTML = ICON_NEXT;

    var counter = document.createElement("span");
    counter.className = "carousel__counter";
    counter.setAttribute("aria-live", "polite");

    var dotsWrap = document.createElement("div");
    dotsWrap.className = "carousel__dots";
    var dots = slides.map(function (_, i) {
      var d = document.createElement("button");
      d.type = "button";
      d.className = "carousel__dot";
      d.setAttribute("aria-label", "Go to slide " + (i + 1));
      d.addEventListener("click", function () { userGo(i); });
      dotsWrap.appendChild(d);
      return d;
    });

    root.appendChild(prev);
    root.appendChild(next);
    root.appendChild(counter);
    root.appendChild(dotsWrap);

    function go(i) {
      index = (i + total) % total;
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      dots.forEach(function (d, n) {
        if (n === index) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });
      slides.forEach(function (s, n) { s.setAttribute("aria-hidden", n === index ? "false" : "true"); });
      counter.textContent = (index + 1) + " / " + total;
    }

    function userGo(i) {
      stopped = true;
      stop();
      go(i);
    }

    function start() {
      if (!autoplay || reduceMotion || stopped || paused || timer) return;
      timer = window.setInterval(function () { go(index + 1); }, autoplay);
    }
    function stop() {
      window.clearInterval(timer);
      timer = null;
    }

    prev.addEventListener("click", function () { userGo(index - 1); });
    next.addEventListener("click", function () { userGo(index + 1); });

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); userGo(index - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); userGo(index + 1); }
    });

    root.addEventListener("mouseenter", function () { paused = true; stop(); });
    root.addEventListener("mouseleave", function () { paused = false; start(); });
    root.addEventListener("focusin", function () { paused = true; stop(); });
    root.addEventListener("focusout", function () { paused = false; start(); });

    // Touch / pointer swipe
    var startX = 0;
    var startY = 0;
    var dragging = false;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
    });
    window.addEventListener("pointerup", function (e) {
      if (!dragging) return;
      dragging = false;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) userGo(dx < 0 ? index + 1 : index - 1);
    });
    track.addEventListener("dragstart", function (e) { e.preventDefault(); });

    // Only autoplay while visible
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { paused = false; start(); }
          else { stop(); }
        });
      }).observe(root);
    } else {
      start();
    }

    go(0);
  }

  document.querySelectorAll("[data-carousel]").forEach(function (el) { new Carousel(el); });

  /* ---------------------------------------------------------------------
     Animated counters (About page) — counts from data-from to data-to
     ------------------------------------------------------------------- */
  function formatNumber(n, delimiter) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || "");
  }

  function runCounter(el) {
    var from = parseInt(el.getAttribute("data-from"), 10) || 0;
    var to = parseInt(el.getAttribute("data-to"), 10) || 0;
    var delimiter = el.getAttribute("data-delimiter") || "";
    if (reduceMotion) { el.textContent = formatNumber(to, delimiter); return; }
    var duration = 2000;
    var t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatNumber(Math.round(from + (to - from) * eased), delimiter);
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll("[data-counter]");
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var counterObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { runCounter(en.target); obs.unobserve(en.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { counterObserver.observe(c); });
    } else {
      counters.forEach(runCounter);
    }
  }

  /* ---------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------------------------------------------------------------
     Missing-image fallback (Services image is a broken file on the
     original server — show a neutral placeholder until it is supplied)
     ------------------------------------------------------------------- */
  document.querySelectorAll("[data-fallback] img").forEach(function (img) {
    var fig = img.closest("[data-fallback]");
    function fail() { fig.classList.add("is-missing"); }
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
  });

  /* ---------------------------------------------------------------------
     Social icons → real links once URLs are set in js/config.js
     ------------------------------------------------------------------- */
  var social = config.social || {};
  document.querySelectorAll("[data-social]").forEach(function (el) {
    var url = social[el.getAttribute("data-social")];
    if (!url) return;
    var a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = el.className;
    a.setAttribute("aria-label", el.getAttribute("aria-label"));
    a.innerHTML = el.innerHTML;
    el.parentNode.replaceChild(a, el);
  });

  /* ---------------------------------------------------------------------
     Contact form — validation messages copied from the original form
     ------------------------------------------------------------------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var MSG_REQUIRED = "This field is required.";
    var MSG_EMAIL = "Enter a valid email address.";
    var status = form.querySelector(".form__status");
    var statusText = status ? status.querySelector(".form__status-text") : null;
    var submitBtn = form.querySelector("[type=submit]");
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setFieldError(field, msg) {
      var wrap = field.closest(".field");
      var err = wrap.querySelector(".field__error");
      if (msg) {
        wrap.classList.add("has-error");
        field.setAttribute("aria-invalid", "true");
        err.textContent = msg;
      } else {
        wrap.classList.remove("has-error");
        field.removeAttribute("aria-invalid");
      }
    }

    function validateField(field) {
      var v = field.value.trim();
      if (field.hasAttribute("data-required") && !v) { setFieldError(field, MSG_REQUIRED); return false; }
      if (field.type === "email" && v && !EMAIL_RE.test(v)) { setFieldError(field, MSG_EMAIL); return false; }
      setFieldError(field, null);
      return true;
    }

    function showStatus(kind, text) {
      if (!status) return;
      status.className = "form__status form__status--" + kind + " is-visible";
      statusText.textContent = text;
    }
    function hideStatus() { if (status) status.className = "form__status"; }

    var fields = Array.prototype.slice.call(form.querySelectorAll("input:not([type=hidden]), textarea"));
    fields.forEach(function (f) {
      f.addEventListener("blur", function () { if (f.value) validateField(f); });
      f.addEventListener("input", function () {
        if (f.closest(".field").classList.contains("has-error")) validateField(f);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideStatus();
      var firstInvalid = null;
      fields.forEach(function (f) {
        if (!validateField(f) && !firstInvalid) firstInvalid = f;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var data = new FormData(form);

      if (!config.formEndpoint) {
        // No backend configured: hand off to the visitor's email client
        var body =
          "Name: " + data.get("name") + "\n" +
          "Email: " + data.get("email") + "\n\n" +
          (data.get("message") || "");
        window.location.href =
          "mailto:" + encodeURIComponent(config.formFallbackEmail || "") +
          "?subject=" + encodeURIComponent(data.get("subject") || "") +
          "&body=" + encodeURIComponent(body);
        return;
      }

      submitBtn.disabled = true;
      fetch(config.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (json) {
            if (!res.ok) throw new Error("Request failed");
            return json;
          });
        })
        .then(function (json) {
          form.reset();
          var msg = (json && json.message) || config.formSuccessMessage;
          if (!msg) return;
          showStatus("success", msg);
          // original setting: "after-submission: hide form"
          fields.forEach(function (f) { f.closest(".field").hidden = true; });
          submitBtn.hidden = true;
        })
        .catch(function () {
          showStatus("error", "There was an error trying to submit your form. Please try again.");
        })
        .then(function () { submitBtn.disabled = false; });
    });
  }
})();
