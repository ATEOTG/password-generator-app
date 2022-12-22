const slider = document.getElementById("slider");
const sliderText = document.getElementById("text-length-display");

const upperCaseBox = document.getElementById("upperCase");
const lowerCaseBox = document.getElementById("lowerCase");
const numberBox = document.getElementById("number");
const symbolBox = document.getElementById("symbol");

const checkBoxes = document.querySelectorAll(".inputBox");
const barOne = document.getElementById("bar1");
const barTwo = document.getElementById("bar2");
const barThree = document.getElementById("bar3");
const barFour = document.getElementById("bar4");

const strengthText = document.querySelector(".strength-desc");
const button = document.querySelector(".generate-btn");
const passwordValue =  document.querySelector(".password-text");
const copyIcon = document.querySelector(".copy-icon");
const copyText = document.querySelector(".copy-text");

const lowerChars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const upperChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const digits = ["0","1","2","3","4","5","6","7","8","9"];
const symbols = ["~","!","#","$","%","^","&","*","+","(",")","-","_","[","]","|","{","}","'",":",";",`<`,`>`,",",".","?",`"`];
const bars = [barOne, barTwo, barThree, barFour];

let prevCount = 0;
let password = "";

sliderDisplay();
prevCount = strengthBarDisplay();


copyIcon.addEventListener("click", copied);
slider.addEventListener("input", sliderDisplay);
button.addEventListener("click", function (e) {
  e.preventDefault();
  if (getCount() === 0) alert("Please check at least one box!");
  else {
    generatePassword();
  }
});
checkBoxes.forEach((box) => box.addEventListener("click", strengthBarDisplay));

function copied(){
  copyText.classList.add("active");
  navigator.clipboard.writeText(password);
  setTimeout(() => {copyText.classList.remove("active")},4000);
}

function sliderDisplay() {
  const valPercent = ((slider.value - 8) / (slider.max - 8)) * 100;
  slider.style.background = `linear-gradient(to right, #a4ffaf ${valPercent}%, #18171f ${valPercent}%)`;
  sliderText.innerHTML = slider.value;
}

function strengthBarDisplay() {
  const count = getCount();

  if (count === 0) {
    strengthText.innerHTML = "";
    for (const bar of bars) bar.classList.remove(`count${prevCount}`);
  }
  if (count === 1) {
    strengthText.innerHTML = "TOO WEAK!";
    changeBarClass(prevCount, "count1");
  }
  if (count === 2) {
    strengthText.innerHTML = "WEAK";
    changeBarClass(prevCount, "count2");
  }
  if (count === 3) {
    strengthText.innerHTML = "MEDIUM";
    changeBarClass(prevCount, "count3");
  }
  if (count === 4) {
    strengthText.innerHTML = "STRONG";
    changeBarClass(prevCount, "count4");
  }

  prevCount = count;
  return count;
}

function getCount() {
  let countChecked = 0;
  if (upperCaseBox.checked) countChecked++;
  if (lowerCaseBox.checked) countChecked++;
  if (numberBox.checked) countChecked++;
  if (symbolBox.checked) countChecked++;

  return countChecked;
}

function changeBarClass(prevCount, newClass) {
  for (const bar of bars) {
    bar.classList.remove(`count${prevCount}`);
    bar.classList.add(newClass);
  }
}

function generatePassword(){
  const options = [];
  if(upperCaseBox.checked) options.push(upperChars);
  if(lowerCaseBox.checked) options.push(lowerChars);
  if(numberBox.checked) options.push(digits);
  if(symbolBox.checked) options.push(symbols);

  password = "";
  for(let i = 0; i < slider.value; i++){
     const selectedArr = options[Math.floor(Math.random() * options.length)];
     const selectedValue = selectedArr[Math.floor(Math.random() * selectedArr.length)];
     password += selectedValue;
  }
  
  const passwordFinal = password.replace(/</g, "&#60;");
  passwordValue.innerHTML = passwordFinal;
  passwordValue.style.color = `#e6e5ea`;
  passwordValue.style.opacity = "100%";
}