/**
 * Created by Home on 20/03/2016.
 */

$("#filter").keyup(function() {                  // Keyboard event keyUp()

  var searchText = $("#filter").val();           // the contents of search bar = input

  $("a > img").each(function() {                     // Iterates through each image
    var altValue = $(this).attr("alt");          // The alt of the image is stored in this variable
    if(altValue.toUpperCase().indexOf(searchText.toUpperCase()) !== -1) {           // If the altValue doesn't contain searchText, -1 will return.
      $(this).removeClass("hidden");             // Leave picture on page (remove-class())
      } else {                                   // If H isn't found
      $(this).addClass("hidden");                // Hide the pictures (addClass())
    };
  });
});
