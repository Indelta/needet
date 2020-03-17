
function isDay () {
    const hours = new Date().getHours();
    if (hours > 8 && hours < 20) return true;
    return false;  
}

function generateDots (count, container) {
    const cont = document.querySelector(container);
    cont.innerHTML = '';
    for (let i = 0; i < count; i++) {
        let dot = document.createElement('span');
        let randomX = Math.floor(Math.random() * 320);
        let randomY = Math.floor(Math.random() * 200);
        
        dot.style.position = 'absolute';
        dot.style.left = `${randomX}px`;
        dot.style.top = `${randomY}px`;
        cont.append(dot);
    } 
}

function randomNum (min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.round(rand);
}

function getStrForNum (num) {
    let number = parseInt(num, 10);
    if (number === 1 || number === 21) {
        return `${number} эвакуатор на линии`;
    }
    else if (number > 1 && number < 4 || number === 22) {
        return `${number} эвакуатора на линии`;
    }
    else if (number > 4 && number < 20 ) {
        return `${number} эвакуаторов на линии`;
    }
    return `${num} эвакуаторов на линии`;
}

// смена темы в зависимости от времени суток
document.body.classList = isDay() ? 'white-theme' : 'dark-theme';

$(document).ready(function() {
    let num = randomNum(18, 22);
    let str = getStrForNum(num);
    $('.car-online>span').text(str);
    generateDots(num, '.map .inner');
    setInterval(() => {
        let num = randomNum(18, 22);
        let str = getStrForNum(num);
        $('.car-online>span').text(str);
    }, 5000);
    

    // наша работа слайдер
    $('#slider').slick({
        dots: false, 
        arrows: false,
        centerMode: true,
        centerPadding: '10%',
        infinite: true,
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    });

    // отзывы 3d slider

    $('#reviews-slider').slick({
        dots: false, 
        arrows: false,
        centerMode: true,
        centerPadding: '12%',
        infinite: true,
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    });

    // подстановка года в копирайт
    $('.copyright span').text(new Date().getFullYear());
});