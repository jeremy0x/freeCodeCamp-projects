function telephoneCheck(str) {
  let regExp = /^(1\s?)?(\d{3}|\(\d{3}\))[-\s]?\d{3}[-\s]?\d{4}$/gm;
  return regExp.test(str);
}

telephoneCheck("555-555-5555"); // should return true
telephoneCheck("(555-555-5555") // should return false
telephoneCheck("1 (555) 555-5555") // should return true
