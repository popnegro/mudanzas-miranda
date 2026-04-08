const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('.indicators');
let current = 0;

/* Crear indicadores */
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.indicators div');

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

document.getElementById('next').onclick = nextSlide;
document.getElementById('prev').onclick = prevSlide;

function goToSlide(i) {
  current = i;
  showSlide(i);
}

setInterval(nextSlide, 5000);
