const fixedContainer = document.getElementById('movingBackground');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  fixedContainer.style.transform = `translateY(${-scrollY}px)`;
});