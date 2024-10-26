// Selecting DOM elements
const lengthInput = document.getElementById('lengthInput');
const keywordInput = document.getElementById('keywordInput');
const patternInput = document.getElementById('patternInput');
const lowercaseCheckbox = document.getElementById('lowercaseCheckbox');
const uppercaseCheckbox = document.getElementById('uppercaseCheckbox');
const numbersCheckbox = document.getElementById('numbersCheckbox');
const symbolsCheckbox = document.getElementById('symbolsCheckbox');
const passwordOutput = document.getElementById('passwordOutput');
const copyButton = document.getElementById('copyButton');
const generateButton = document.getElementById('generateButton');

// Event listeners
generateButton.addEventListener('click', generatePassword);
copyButton.addEventListener('click', copyPassword);

// Character sets
const characterSets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-=_+[]{}|;:,.<>?/`~',
};

// Function to generate random password
function generatePassword() {
  const length = parseInt(lengthInput.value, 10);
  const keyword = keywordInput.value;
  const pattern = patternInput.value.toUpperCase();
  let password = '';

  // Generate password based on keyword if provided
  if (keyword) {
    password += keyword;
  }

  // Generate password based on pattern
  if (pattern) {
    for (let i = 0; i < pattern.length; i++) {
      const charType = pattern[i];
      if (charType === 'L' && lowercaseCheckbox.checked) {
        password += characterSets.lowercase[Math.floor(Math.random() * characterSets.lowercase.length)];
      } else if (charType === 'U' && uppercaseCheckbox.checked) {
        password += characterSets.uppercase[Math.floor(Math.random() * characterSets.uppercase.length)];
      } else if (charType === 'N' && numbersCheckbox.checked) {
        password += characterSets.numbers[Math.floor(Math.random() * characterSets.numbers.length)];
      } else if (charType === 'S' && symbolsCheckbox.checked) {
        password += characterSets.symbols[Math.floor(Math.random() * characterSets.symbols.length)];
      }
    }
  }

  // Fill the rest of the password length with random characters
  const validChars = [
    ...(lowercaseCheckbox.checked ? characterSets.lowercase : ''),
    ...(uppercaseCheckbox.checked ? characterSets.uppercase : ''),
    ...(numbersCheckbox.checked ? characterSets.numbers : ''),
    ...(symbolsCheckbox.checked ? characterSets.symbols : ''),
  ].join('');

  while (password.length < length) {
    const randomIndex = Math.floor(Math.random() * validChars.length);
    password += validChars.charAt(randomIndex);
  }

  // Shuffle the password for randomness
  password = password.split('').sort(() => Math.random() - 0.5).join('');
  passwordOutput.value = password;

  // Generate password hint
  generatePasswordHint(password);
}

// Function to copy password to clipboard
function copyPassword() {
  passwordOutput.select();
  document.execCommand('copy');
  alert('Password copied to clipboard!');
}

// Function to generate password hint
function generatePasswordHint(password) {
  const hint = `Password Hint: Start with "${password[0]}" and think of "${password.slice(1)}" as a memorable phrase.`;
  console.log(hint); // Or display it somewhere on the UI
}
