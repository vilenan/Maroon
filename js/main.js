const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.slider__button--next',
        prevEl: '.slider__button--prev',
    },
    slidesPerView: 4,
    spaceBetween: 30,
    updateOnWindowResize: true,
    breakpoints: {
        320: {
            width: 970
        },
        768: {
            width: 1010
        }
    }
});

const anchors = document.querySelectorAll('[href="#contacts"]');

for (let anchor of anchors) {

    const elem = document.querySelector(anchor.getAttribute('href'));

    anchor.addEventListener('click', (evt) => {
        evt.preventDefault();

        elem.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    })

}

const header = document.querySelector('.header');
const menuButton = document.querySelector('.header__menu-button');
const navigation = document.querySelector('.navigation');
const overlay = document.querySelector('.navigation__overlay');

function closeMenu() {
    menuButton.removeEventListener('click', closeMenu);
    menuButton.addEventListener('click', openMenu);
    overlay.removeEventListener('click', closeMenu);
    document.removeEventListener(`keydown`, onEscPress);

    menuButton.classList.remove('header__menu-button--open');
    navigation.classList.remove('navigation--open');
    document.body.classList.remove(`body--no-scroll`);
    if (!isScrolled()){
        header.classList.remove('header--colored');
    }
}

function openMenu() {
    menuButton.removeEventListener('click', openMenu);
    menuButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    document.addEventListener(`keydown`, onEscPress);

    document.body.classList.add(`body--no-scroll`);
    header.classList.add('header--colored');
    menuButton.classList.add('header__menu-button--open');
    navigation.classList.add('navigation--open');
}

function onEscPress(evt) {
    if (evt.keyCode === 27) {
        closeMenu()
    }
}

function isScrolled() {
    const pxAmount = 0
    const scrollTop = document.documentElement.scrollTop
    return scrollTop > pxAmount

}
function headerScrollHandler() {
    const scrollTop = window.scrollY;
    if (scrollTop) {
        header.classList.add('header--colored');
    } else {
        header.classList.remove('header--colored');
    }
}

window.addEventListener('scroll', headerScrollHandler);
closeMenu();
