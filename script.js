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

const bars = [barOne, barTwo, barThree, barFour];
let prevCount = 0;

sliderDisplay();
prevCount = strengthBarDisplay();

slider.addEventListener("input", sliderDisplay);
button.addEventListener("click", function (e) {
  e.preventDefault();
  if (getCount() === 0) alert("Please check at least one box!");
});
checkBoxes.forEach((box) => box.addEventListener("click", strengthBarDisplay));

function sliderDisplay() {
  const valPercent = (slider.value / slider.max) * 100;
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
