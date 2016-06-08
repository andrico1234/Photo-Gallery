/**
 * Created by Home on 20/03/2016.
 */

// Global Variables

var $overlay = $("<div id='overlay'></div>");
var $image = $("<img id='overlayImage'>");
var $youtubeOverlay = $('<div class="video-wrapper"><iframe class="youtube-canvas" src="https://www.youtube.com/embed/SMo3UmN0Hy8" frameborder="0" allowfullscreen></iframe></div>');
var $caption = $("<p id='captionText'></p>");
var $activePhoto;
var $photoIndex;


// Overlay Functions

function closeArrows() {
    $("#leftArrow, #rightArrow").hide();
}

function closeVideo() {
    var video = $(".youtube-canvas").attr("src");
    $(".youtube-canvas").attr("src", "");
    $(".youtube-canvas").attr("src", video);
}

$(document).ready(function () {
    closeArrows();
    $overlay.append($image);
    $overlay.append($caption);
    $overlay.append($youtubeOverlay);
    $("body").append($overlay);
    $youtubeOverlay.hide();
});

// Moving between images LOOK AT PAGE 204 FOR IDEAS

function nextPhoto() {
    var $newPhoto;
    var $captionText;
    if ($photoIndex === 11) {
        $caption.hide();
        $image.hide();
        $youtubeOverlay.show();
        $activePhoto = $activePhoto.next();
    } else if ($youtubeOverlay.is(":visible")) {
            $youtubeOverlay.hide();
        $newPhoto = $activePhoto.parent().children().children("a").attr("href");
        $image.attr("src", $newPhoto);
            $caption.show();
            $image.show();
            $activePhoto = $activePhoto.parent().children();
        } else {
        $newPhoto = $activePhoto.next().children("a").attr("href");
        $image.attr("src", $newPhoto);
        $captionText = $activePhoto.next().children("a").children("img").attr("alt");
        $caption.text($captionText);
        $activePhoto = $activePhoto.next();
    }
    $photoIndex = $activePhoto.index();
}

function prevPhoto() {
    var $newPhoto;
    var $captionText;
    if ($photoIndex === 0) {
        $newPhoto = $activePhoto.parent().children().children("a").attr("href");
        // all i need is for $activePhoto and $newPhoto to be the something for the last sibling
        $image.attr("src", $newPhoto);
        $caption.hide();
        $image.hide();
        $youtubeOverlay.show();
        $activePhoto = $activePhoto.parent().children();
    } else {
        if ($youtubeOverlay.is(":visible")) {
            $youtubeOverlay.hide();
            $caption.show();
            $image.show();
        }
        $newPhoto = $activePhoto.prev().children("a").attr("href");
        $image.attr("src", $newPhoto);
        $captionText = $activePhoto.prev().children("a").children("img").attr("alt");
        $caption.text($captionText);
        $activePhoto = $activePhoto.prev();
    }
    $photoIndex = $activePhoto.index();
    console.log($photoIndex);
}


$("#rightArrow").click(function () {
    nextPhoto();
});

$(document).keydown(function (k) {
    if (k.keyCode == 39) {
        nextPhoto();
    }
});

$("#leftArrow").click(function () {
    prevPhoto();
});

$(document).keydown(function (k) {
    if (k.keyCode == 37) {
        prevPhoto();
    }
});


// Opening a picture in the gallery

$(".photo-gallery-list li").click(function (event) {
    if ($(window).width() >= 480) {
        $overlay.show();
        $("#leftArrow, #rightArrow").show();
        if ($(this).attr("id") === "video") {
            $caption.hide();
            $image.hide();
            $youtubeOverlay.show();
        } else {
            event.preventDefault();
            $caption.show();
            $image.show();
            $youtubeOverlay.hide();
            var $photoLink = $(this).children("a").attr("href");
            $image.attr("src", $photoLink);
            var $captionText = $(this).children("a").children("img").attr("alt");
            $caption.text($captionText);
        }
        $activePhoto = $(this);
        console.log($activePhoto);
        $photoIndex = $activePhoto.index();
    }
});

// Closing the lightbox

$overlay.click(function () {
    $overlay.hide();
    closeVideo();
    closeArrows();
});

$(document).keydown(function (k) {
    if (k.keyCode == 27) {
        $overlay.hide();
        closeVideo();
        closeArrows();
    }
});