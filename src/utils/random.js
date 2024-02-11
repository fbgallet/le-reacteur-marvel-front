export function randomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[randomNumber(25)];
}

export function randomNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}
