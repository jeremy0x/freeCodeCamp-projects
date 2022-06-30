function convertToRoman(num) {
  const numbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  let romanNumeral = ''

  while(num !== 0) {
    const index = numbers.findIndex(nums => num >= nums);
    romanNumeral += roman[index];
    num -= numbers[index];
  }
  return romanNumeral;
}

convertToRoman(3999);
