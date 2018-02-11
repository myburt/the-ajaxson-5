

$(document).ready(function () {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the 
 * user's search term (along with "jackson 5")
 * 
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    // get the user's input text from the DOM
    var searchQuery = event.currentTarget[0].value; // TODO should be e.g. "dance"

    // configure a few parameters to attach to our request
    var params = {
        api_key: "dc6zaTOxFJmzC",
        tag: "jackson 5 ".concat(searchQuery)  // TODO should be e.g. "jackson 5 dance"
    };

    var imageForGif = $("#gif");

    if ($("#answer")[0].value == 5) //check value being passed to the answer.
    {
        $("#answer-group").removeClass("error-border");
        $("#answer-bad-0").removeClass("error-background");
        $("#answer-bad-1")[0].hidden = true;
        // make an ajax request for a random GIF
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/random", //where this request is sent
            data: params, // attach those extra parameters onto the request
            success: function (response)
             {
                // if the response comes back successfully.            

                // 1. set the source attribute of our image to the image_url of the GIF
                imageForGif[0].src = response.data.image_url;
                // 2. hide the feedback message and display the image
                setGifLoadedStatus(true);
            },
            error: function () 
            {
                // if something went wrong, the code in here will execute instead of the success function
                // give the user an error message
                $("#feedback").text("Sorry, could not load GIF. Try again!");
                setGifLoadedStatus(false);
            }
        });

        // give the user a "Loading..." message while they wait
        imageForGif[0].src = ""; //remove old Gif
        $("#feedback").text("Please Wait while we load the Gif");
        $("#feedback").attr("hidden", false);
    }
    else
    {
        //handle the error messaging
        $("#answer-group").addClass("error-border");
        $("#answer-bad-1")[0].hidden = false;
        $("#answer-bad-0").addClass("error-background");
        $("#feedback").text(""); //clears text in gif message 
        setGifLoadedStatus(false);
    }
}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}