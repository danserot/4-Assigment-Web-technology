const registrationForm = document.querySelector("#registrationForm");

if (registrationForm) {
  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#confirmPassword");
  const confirmFeedback = document.querySelector("#confirmFeedback");
  const successMessage = document.querySelector("#registrationSuccess");

  function passwordsMatch() {
    const matches = password.value.length > 0 && password.value === confirmPassword.value;
    confirmPassword.setCustomValidity(matches ? "" : "Passwords must match.");
    confirmPassword.classList.toggle("is-valid", matches);
    confirmPassword.classList.toggle("is-invalid", !matches);
    confirmFeedback.textContent = matches ? "" : "Passwords must match.";
    return matches;
  }

  function markNativeFields() {
    registrationForm.querySelectorAll("input, select").forEach((field) => {
      if (field === confirmPassword) {
        return;
      }
      field.classList.toggle("is-valid", field.checkValidity());
      field.classList.toggle("is-invalid", !field.checkValidity());
    });
  }

  password.addEventListener("input", passwordsMatch);
  confirmPassword.addEventListener("input", passwordsMatch);

  registrationForm.addEventListener("submit", (event) => {
    passwordsMatch();
    markNativeFields();
    if (!registrationForm.checkValidity()) {
      event.preventDefault();
      successMessage.classList.remove("show");
      registrationForm.querySelector(":invalid").focus();
      return;
    }
    event.preventDefault();
    successMessage.classList.add("show");
  });

  registrationForm.addEventListener("reset", () => {
    window.setTimeout(() => {
      registrationForm.querySelectorAll(".is-valid, .is-invalid").forEach((field) => {
        field.classList.remove("is-valid", "is-invalid");
      });
      confirmPassword.setCustomValidity("");
      successMessage.classList.remove("show");
    }, 0);
  });
}
