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

window.addEventListener('scroll', headerScrollHandler);

function headerScrollHandler() {
    const scrollTop = window.scrollY;

    if (scrollTop) {
        header.classList.add('header--colored');
    } else {
        header.classList.remove('header--colored');
    }
}
