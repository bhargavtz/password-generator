// Selecting DOM elements
const lengthInput = document.getElementById('lengthInput');
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
  const includeLowercase = lowercaseCheckbox.checked;
  const includeUppercase = uppercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
    alert('Please select at least one character type.');
    return;
  }

  const validChars = Object.entries(characterSets)
    .filter(([key, value]) => includeCharacterType(key, value))
    .map(([key, value]) => value)
    .join('');

  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * validChars.length);
    password += validChars.charAt(randomIndex);
  }

  passwordOutput.value = password;
}

// Function to check if a character type should be included
function includeCharacterType(type, set) {
  return (type === 'lowercase' && lowercaseCheckbox.checked) ||
    (type === 'uppercase' && uppercaseCheckbox.checked) ||
    (type === 'numbers' && numbersCheckbox.checked) ||
    (type === 'symbols' && symbolsCheckbox.checked);
}

// Function to copy password to clipboard
function copyPassword() {
  passwordOutput.select();
  document.execCommand('copy');
  alert('Password copied to clipboard!');
}
