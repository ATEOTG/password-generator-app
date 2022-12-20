const slider = document.getElementById("slider");
const sliderText = document.getElementById("text-length-display");

slider.addEventListener("input", sliderDisplay);

function sliderDisplay() {
  const valPercent = (slider.value / slider.max) * 100;
  slider.style.background = `linear-gradient(to right, #a4ffaf ${valPercent}%, #18171f ${valPercent}%)`;
  sliderText.innerHTML = slider.value;
}
