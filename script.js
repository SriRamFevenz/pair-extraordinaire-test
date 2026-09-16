document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.button, .achievement-card, .stat-box, .info-card');

  buttons.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translate(-2px, -2px)';
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
    });
  });
});
