function palindrome(str) {
  var newstr = str.replace(/[\W_]/g, '').toLowerCase();  
  return newstr === newstr.split('').reverse().join('');
}

palindrome("0_0 (: /-\ :) 0-0"); // should return true.
palindrome("My age is 0, 0 si ega ym."); // should return true
palindrome("five|\_/|four"); // should return false
