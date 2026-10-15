const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  const fields = {
    name: {
      element: document.querySelector("#name"),
      isValid: (value) => value.trim().length >= 2 && value.trim().length <= 60,
    },
    email: {
      element: document.querySelector("#email"),
      isValid: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    },
    message: {
      element: document.querySelector("#message"),
      isValid: (value) =>
        value.trim().length >= 10 && value.trim().length <= 500,
    },
  };
  const successMessage = document.querySelector("#successMessage");

  function updateField(field) {
    const valid = field.isValid(field.element.value);
    field.element.classList.toggle("is-valid", valid);
    field.element.classList.toggle("is-invalid", !valid);
    return valid;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const results = Object.values(fields).map(updateField);
    const formIsValid = results.every(Boolean);
    successMessage.classList.toggle("show", formIsValid);
    if (!formIsValid) {
      successMessage.classList.remove("show");
      const firstInvalid = Object.values(fields).find((field) =>
        field.element.classList.contains("is-invalid"),
      );
      firstInvalid.element.focus();
    }
  });

  Object.values(fields).forEach((field) => {
    field.element.addEventListener("input", () => {
      updateField(field);
      successMessage.classList.remove("show");
    });
  });
}
