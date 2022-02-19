var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

//----------------------------Slider

var slideDelay = 1.5;
var slideDuration = 0.3;

var slides = document.querySelectorAll(".slide");
var prevButton = document.querySelector("#prevButton");
var nextButton = document.querySelector("#nextButton");

for (var i = 0; i < slides.length; i++) {
    TweenLite.set(slides[i], {
        backgroundColor: Math.random() * 0xffffff,
        xPercent: i * 100
    });
}

var wrap = wrapPartial(-100, (slides.length - 1) * 100);
var timer = TweenLite.delayedCall(slideDelay, autoPlay);
var animation = null;

prevButton.addEventListener("click", function() {
    animateSlides(100);
});

nextButton.addEventListener("click", function() {
    animateSlides(-100);
});

function animateSlides(delta) {

    animation = TweenMax.to(slides, slideDuration, {
        xPercent: function(i, target) {
            return (Math.round(target._gsTransform.xPercent / 100) * 100) + delta;
        },
        modifiers: {
            xPercent: wrap
        },
        onComplete: restartTimer
    });
}

function autoPlay() {
    if (!animation) {
        animateSlides(-100);
    }
}

function restartTimer() {
    if (animation === this) {
        animation = null;
        timer.restart(true);
    }
}

function wrapPartial(min, max) {
    var r = max - min;
    return function(value) {
        var v = value - min;
        return ((r + v % r) % r) + min;
    }
}