// script.js for inscription
document.addEventListener('DOMContentLoaded', () => {
  console.log('Bienvenue dans inscription ! Le DOM est entièrement chargé et analysé.');

  // Example: Add a simple interaction
  const mainHeading = document.querySelector('main h1');
  if (mainHeading) {
    mainHeading.addEventListener('mouseover', () => {
      mainHeading.style.color = 'white';
    });
    mainHeading.addEventListener('mouseout', () => {
      mainHeading.style.color = '';
    });
  }
});