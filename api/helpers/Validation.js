/*
  Email example: test@service.com
*/
const validateEmail = email => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

/*
  Phone Number example: 123-456-7890
*/
const validatePhone = number => {
  const re = /^([0-9]{3}-)([0-9]{3}-)([0-9]{4})$/g;
  return re.test(number);
};

/* 
  Password Requirements:
    Must be longer than 6 characters
    Must have at least 1 uppercase
    Must have at least 1 lowercase
    Must have at least 1 special character
    Must have at least 1 digit
*/
const checkPasswordStrength = password => {
  const minlength = 6;

  if (password.length < minlength) return false;
  if (!password.match(/[A-Z]/)) return false;
  if (!password.match(/[a-z]/)) return false;
  if (!password.match(/\d/)) return false;
  if (!password.match(/[`~!@#$%^&*\(\)_\-\+=\[{\]}\|\\:;"'<,>\.\?\/]/))
    return false;
  return true;
};

/*
  Linkedin example: linkedin.com/in/test/ (allows some special characters)
*/
const validateLinkedIn = url => {
  const re = /^(linkedin\.com\/in\/[\w-!@#$%^&*]+)$/;
  return re.test(url);
};

/*
  GitHub example: github.com/test (allows some special characters)
*/
const validateGithub = url => {
  const re = /^(github\.com\/[\w-!@#$%^&*]+)$/;
  return re.test(url);
};

module.exports = {
  validateEmail,
  validatePhone,
  checkPasswordStrength,
  validateLinkedIn,
  validateGithub
};
