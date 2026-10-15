const simpleContactForm = document.querySelector("#simpleContactForm");
const simpleSuccess = document.querySelector("#simpleSuccess");

simpleContactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  simpleSuccess.hidden = false;
});

simpleContactForm.addEventListener("input", () => {
  simpleSuccess.hidden = true;
});
