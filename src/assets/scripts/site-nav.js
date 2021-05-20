let siteNav = document.querySelector('.site-nav');
let siteNavBtn = document.querySelector('.site-nav__toogle');

siteNav.classList.remove('site-nav--opened');
siteNavBtn.addEventListener('click', function(event) {
  event.preventDefault();
  siteNav.classList.toggle('site-nav--opened');
});
