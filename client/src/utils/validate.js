const validation = data => {
  const errors = [];

  if (data.name.length === 0) {
    errors.push({ name: "Full name required" });
  }

  if (data.email.length < 5) {
    errors.push({ email: "Email should be at least 5 characters long" });
  }

  if (data.email.split("").filter(x => x === "@").length !== 1) {
    errors.push({ email: "Email should contain @ symbol" });
  }

  if (data.email.indexOf(".") === -1) {
    errors.push({ email: "Email should contain at least one dot" });
  }

  if (data.password.length < 5) {
    errors.push({
      password: "Password should be at least 6 characters long"
    });
  }

  if (data.confirmPassword.length === 0) {
    errors.push({
      confirmPassword: "Confirm password does not match the password"
    });
  }

  if (data.confirmPassword !== data.password) {
    errors.push({
      confirmPassword: "Confirm password must match your password"
    });
  }

  return errors;
};

export default validation;
