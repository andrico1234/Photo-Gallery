/**
 * Created by Home on 20/03/2016.
 */

var $overlay = $("<div id='overlay'></div>");       // Creates the overlay
var $image = $("<img id='overlayImage'>");          // Creates an image element for the overlay
var $youtubeOverlay = $('<div class="video-wrapper"><iframe class="youtube-canvas" src="https://www.youtube.com/embed/SMo3UmN0Hy8" frameborder="0" allowfullscreen></iframe></div>');

var $caption = $("<p id='captionText'></p>");                        // Creates a caption variable that a paragraph tag
var $activePhoto;
var $photoIndex;

function closeArrows() {
    $("#leftArrow, #rightArrow").hide();      // Creates a function to hide overlay images
}

$(document).ready(function () {
    closeArrows();                                    // Closes overlay images instantly
});

function closeVideo() {
    var video = $(".youtube-canvas").attr("src");
    $(".youtube-canvas").attr("src", "");
    $(".youtube-canvas").attr("src", video);
}

function nextPhoto() {
    var $newPhoto;
    var $captionText;
    if ($photoIndex === 11) {
        $newPhoto = $activePhoto.parent().children().children("a").attr("href"); // Puts the destination of the sibling element into a variable
        $image.attr("src", $newPhoto);                    // Updates the image with the source of the new photo.
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
        $newPhoto = $activePhoto.next().children("a").attr("href");
        $image.attr("src", $newPhoto);
        $captionText = $activePhoto.next().children("a").children("img").attr("alt");
        $caption.text($captionText);
        $activePhoto = $activePhoto.next();
    }
    $photoIndex = $activePhoto.index();
}

// i want to traverse the DOM. 

function prevPhoto() {
    var $newPhoto;
    var $captionText;
    if ($photoIndex === 0) {
        $newPhoto = $activePhoto.parent().children().children("a").attr("href"); // Puts the destination of the sibling element into a variable
        $image.attr("src", $newPhoto);                    // Updates the image with the source of the new photo.
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

// function prevPhoto() {
// //   if ($activePhoto.prev().attr('src') == "") {
// //     console.log("error");
// //   } else {
//     var $newPhoto = $activePhoto.prev().children("a").attr("href"); // Puts the destination of the sibling element into a variable
//     $image.attr("src", $newPhoto);                    // Updates the image with the source of the new photo.
//     var $captionText = $activePhoto.prev().children("a").children("img").attr("alt");   // Gets the alt attribute from the sibling's child's alt's attribute.
//     $caption.text($captionText);
//     $activePhoto = $activePhoto.prev();
// //   }
// }

// if child of li = 11, then the next picture will be given the information of child li = 0.

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

$overlay.append($image);                             // Appends Image to the overlay
$overlay.append($caption);                           // Append caption to overlay
$overlay.append($youtubeOverlay);
$("body").append($overlay);                          // Attaches the overlay to the DOM

$youtubeOverlay.hide();

$(".photo-gallery-list li").click(function (event) {        // The code that runs when an image is clicked
    if ($(window).width() >= 480) {                     // In mobile mode, the overlay won't appear
        $overlay.show();
        $("#leftArrow, #rightArrow").show();
        if ($(this).attr("id") === "video") {
            $caption.hide();
            $image.hide();
            $youtubeOverlay.show();
        } else {
            event.preventDefault();                            //  Prevents default behaviour for clicking the image
            $caption.show();
            $image.show();
            $youtubeOverlay.hide();
            var $photoLink = $(this).children("a").attr("href");                 // The variable stores the link destination
            $image.attr("src", $photoLink);                    // Gives the image element the correct information
            var $captionText = $(this).children("a").children("img").attr("alt");   // Stores the img's alt attribute
            $caption.text($captionText);                       // The alt attribute has its text added to the caption variable
        }
        $activePhoto = $(this);
        console.log($activePhoto);
        $photoIndex = $activePhoto.index();
    }
});

$overlay.click(function () {                       // When the cross is clicked or esc is pressed...
    $overlay.hide();                                   // ... the overlay disappears
    closeVideo();
    closeArrows();
});

$(document).keydown(function (k) {
    if (k.keyCode == 27) {                              // This function closes the overlay when the 'esc' key is pressed.
        $overlay.hide();
        closeVideo();
        closeArrows();
    }
});