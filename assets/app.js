/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
require('bootstrap');
require('@fortawesome/fontawesome-free/css/all.min.css');
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';
// const navbarBrand = document.querySelector('.navbar-brand');
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 0) {
//         navbarBrand.classList.add('hidden');
//         navbarBrand.classList.remove('visible');
//     } else {
//         navbarBrand.classList.add('visible');
//         navbarBrand.classList.remove('hidden');
//     }
// });
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
const navbarBrand = document.querySelector('.navbar-brand');

const handleScroll = debounce(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 0) {
        navbarBrand.classList.add('hidden');
        navbarBrand.classList.remove('visible');
    } else {
        navbarBrand.classList.add('visible');
        navbarBrand.classList.remove('hidden');
    }

}, 100);

window.addEventListener('scroll', handleScroll);
