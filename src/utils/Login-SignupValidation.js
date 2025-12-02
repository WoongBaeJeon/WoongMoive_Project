export const validateName = (name) => {
  const regex = /^[A-Za-z가-힣]{2,8}$/;
  return regex.test(name) ? '' : '이름은 2~8자 한글, 영어만 가능합니다.';
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? '' : '올바른 이메일 형식이 아닙니다.';
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return regex.test(password)
    ? ''
    : '비밀번호는 6자리 이상, 영어 대소문자와 숫자를 포함하어야 합니다.';
};

export const validateConfirmPassword = (password, confirm) => {
  return confirm === ''
    ? '비밀번호 확인을 입력해 주십시오.'
    : password === confirm
      ? ''
      : '비밀번호가 일치하지 않습니다.';
};
