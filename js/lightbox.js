/**
 * Created by Home on 20/03/2016.
 */

var $overlay = $("<div id='overlay'></div>");       // Creates the overlay
var $image = $("<img id='overlayImage'>");          // Creates an image element for the overlay
var $overlay2 = $("<div id='overlayTwo'></div>");
var $youtubeOverlay = $('<div style="overflow:hidden;height:270px;width:480px;"><div id="youtube_canvas" style="height:270px;width:480px;"> <iframe style="height:270px;width:480px;border:0;" frameborder="0" src="https://www.youtube.com/embed/SMo3UmN0Hy8?hl=en&amp;autoplay=0&amp;cc_load_policy=0&amp;loop=0&amp;iv_load_policy=0&amp;fs=1&amp;showinfo=1"></iframe> </div> <a class="youtube-embed-code" href="https://www.tubeembed.com" id="get-youtube-data">tubeembed</a> <style>#youtube_canvas img{max-width:none!important;background:none!important}</style> </div>');

var $caption = $("<p id='captionText'></p>");                        // Creates a caption variable that a paragraph tag
var $activePhoto;

function closeArrows() {
  $("#leftArrow, #rightArrow").hide();      // Creates a function to hide overlay images
}

$(document).ready(function() {
  closeArrows();                                    // Closes overlay images instantly
});

function nextPhoto() {
  if ($activePhoto.next().attr('src') === "img/Photos/Thumbnails/Lion.png") {
    console.log("error");
  } else {
    var $newPhoto = $activePhoto.next().attr("href"); // Puts the destination of the sibling element into a variable
    $image.attr("src", $newPhoto);                    // Updates the image with the source of the new photo.
    var $captionText = $activePhoto.next().children("img").attr("alt");   // Gets the alt attribute from the sibling's child's alt's attribute.
    $caption.text($captionText);                      // Uses the captionText variable to change the text of the caption.
    $activePhoto = $activePhoto.next();               // Gets the attribute for the next sibling.
  }
}

function prevPhoto() {
  if ($activePhoto.prev().attr('src') == "") {
    console.log("error");
  } else {
    var $newPhoto = $activePhoto.prev().attr("href"); // Puts the destination of the sibling element into a variable
    $image.attr("src", $newPhoto);                    // Updates the image with the source of the new photo.
    var $captionText = $activePhoto.prev().children("img").attr("alt");   // Gets the alt attribute from the sibling's child's alt's attribute.
    $caption.text($captionText);
    $activePhoto = $activePhoto.prev();
  }
}

$("#rightArrow").click(function() {
  nextPhoto();
});

$(document).keydown(function(k) {
  if(k.keyCode == 39){
    nextPhoto();
  }
});

$("#leftArrow").click(function() {
  prevPhoto();
});

$(document).keydown(function(k) {
  if(k.keyCode == 37){
    prevPhoto();
  }
});

$overlay.append($image);                             // Appends Image to the overlay
$overlay.append($caption);                           // Append caption to overlay
$overlay.append();
$("body").append($overlay);                          // Attaches the overlay to the DOM

$overlay2.append($youtubeOverlay);
$("body").append($overlay2);

$("#lion").click(function() {
  if ($(window).width() >= 480) {
    $overlay2.show();
  }
});

$overlay2.click(function() {
  $overlay2.hide();
});

$(".photo-gallery a").click(function(event) {        // The code that runs when an image is clicked
  if ($(window).width() >= 480) {                     // In mobile mode, the overlay won't appear
    event.preventDefault();                            //  Prevents default behaviour for clicking the image
    var $photoLink = $(this).attr("href");                 // The variable stores the link destination
    $image.attr("src", $photoLink);                    // Gives the image element the correct information
    $overlay.show();                                   // This shows the overlay
    var $captionText = $(this).children("img").attr("alt");   // Stores the img's alt attribute
    $caption.text($captionText);                       // The alt attribute has its text added to the caption variable
    $("#leftArrow, #rightArrow").show();
    $activePhoto = $(this);
  }
});

$overlay.click(function() {                       // When the cross is clicked or esc is pressed...
  $overlay.hide();                                   // ... the overlay disappears
  closeArrows();
});

$(document).keydown(function(k) {
  if(k.keyCode == 27 ){                              // This function closes the overlay when the 'esc' key is pressed.
    $overlay.hide();
    closeArrows();
  }
});