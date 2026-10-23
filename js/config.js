/*
 * Site configuration — edit these values instead of touching the page markup.
 *
 * formEndpoint
 *   URL that accepts a POST of the contact form (multipart FormData).
 *   Works with services such as Formspree, Getform, Basin, or your own script.
 *   The original WordPress site used the SureForms plugin, whose endpoint needs
 *   per-page security tokens and cannot be called from a static site.
 *   When left empty, the form falls back to opening the visitor's email app
 *   addressed to `formFallbackEmail`.
 *
 * formFallbackEmail
 *   Copied exactly from the original site. NOTE: the domain "spanride.in" does
 *   not resolve (the company domain is spanpride.in), so please confirm the
 *   correct address and update it here and in the footer/contact page text.
 *
 * formSuccessMessage
 *   Shown after a successful endpoint submission. The original success text is
 *   configured inside WordPress and is not visible on the public site, so it
 *   is left for the site owner to fill in. If your endpoint returns JSON with a
 *   "message" field, that text is used instead.
 *
 * social
 *   The original site's social icons all pointed to "#" (no real profiles).
 *   Add full profile URLs here and the icons become live links automatically.
 */
window.SPAN_CONFIG = {
  formEndpoint: "",
  formFallbackEmail: "info@spanride.in",
  formSuccessMessage: "",
  social: {
    facebook: "",
    twitter: "",
    youtube: "",
    instagram: "",
    linkedin: ""
  }
};
