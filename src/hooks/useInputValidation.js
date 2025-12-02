import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '@utils/Login-SignupValidation';

export function useInputValidation() {
  function validateLoginForm({ email, password }) {
    return {
      email: validateEmail(email),
      password: validatePassword(password),
    };
  }

  function validateSignUp(values) {
    return {
      name: validateName(values.name),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      confirmPassword: validateConfirmPassword(
        values.password,
        values.confirmPassword,
      ),
    };
  }
  function isValid(errors) {
    return Object.values(errors).every((err) => err === '');
  }

  return { validateLoginForm, validateSignUp, isValid };
}
