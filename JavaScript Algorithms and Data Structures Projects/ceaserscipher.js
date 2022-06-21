function rot13(str) {
  const alphabeth = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let newStr = '';

  for (let i = 0; i < str.length; i++) {
    let index = alphabeth.indexOf(str[i]);
    if (index == -1) {
      newStr += astr[i];
    } else {
      let newIndex = (index + 13) % 26;
      newStr += alphabeth[newIndex];
    }
  }
  return newStr;
}

rot13("SERR PBQR PNZC"); // should decode to the string
  // "FREE CODE CAMP"
rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.") // should decode to the string
  // THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
