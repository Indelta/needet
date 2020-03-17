$(document).ready(function() {
    $('#works-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: "10%",
        centerMode: true,
        autoplay: true,
    });
    $('#reviews-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true, 
        dots: false
    });

    $('footer .left span').text(new Date().getFullYear());

    $('#call').on('submit', function(e) {
        e.preventDefault();
        let form = $(this);
        let phoneInput = form.find('input[name="phone"]');
        let phoneNum = phoneInput.val().replace(/'D+/gim, "");

        if (phoneNum.length < 12) {
            phoneInput.css({'background-color': "#ff0000"});
            setTimeout(function() {
                phoneInput.css({"background-color": "#ffffff"});
            }, 400);
        }
        else {
            $.ajax({
                url: 'send.php',
                method: 'POST',
                data: {phone: phoneNum},
                success: function() {
                    ym(30403892, 'reachGoal', 'CallForm');
                    gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'CallForm' });
                    form.fadeOut();
                    form.after('<div class="thankyou"><h2>Спасибо за заявку!</h2><p>Скоро с Вами свяжется ближайший эвакуатор</p></div>');
                    setTimeout(function() {
                        phoneInput.val('');
                        form.next('.thankyou').remove();
                        form.fadeIn();
                    }, 10000);
                }
            });
        }
    });
});