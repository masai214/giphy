var topics = ["Lebron James", "Anthony Davis", "Karl Towns", "Kawhi Leonard", "Demar Derozan", "Stephen Curry", "Zion Williamson", "Damian Lillard", "Kevin Durant"];

function createButtons() {
    $(".buttons-div").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass(" topics-button btn btn-primary");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $(".buttons-div").append(a);

    }
}

createButtons();

function makeGifs() {
    document.getElementById("gifs").innerHTML = "";
    var buttonName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonName + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"
console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        var newDiv = $("<div class= 'row' id='row1'>");
        $("#gifs").append(newDiv);
        for (var i = 0; i < results.length; i++) {
            console.log(results[i])
           
            var gifs = $("<div class='image-div col-lg-4 col-md-4 col-xs-4'>");
            var rating = results[i].rating;
            var gifRating = $("<div>").text("Rating: " + rating);
            gifs.append(gifRating);

            var img = $("<img>");
            img.attr("data-animate", results[i].images.fixed_height.url);
            img.attr("data-still", results[i].images.fixed_height_still.url);
            img.attr("src", results[i].images.fixed_height_still.url);
            img.attr("data-state", "still");
            img.addClass("gif img-responsive");
            
            gifs.append(img);
            $("#row1").prepend(gifs);
            

        }
    })
}

$(document).on("click", ".topics-button", makeGifs);

$(document).on("click", ".gif", function(){
    var dataState = $(this).attr("data-state");
    console.log(dataState);
    if (dataState === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    }
    else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

$(".submit").on("click", function (event) {
    event.preventDefault();
    var newGif = $("#giphy-value").val().trim();
    console.log(newGif);
    if (newGif != "") {
        var newGif2 = newGif.toLowerCase()
        var ditto = false;
        for (var i = 0; i < topics.length; i++) {
            var x = topics[i].toLowerCase()
            if (x == newGif2) {
                ditto = true;
            }
        }
    }
    console.log(topics);
    if (!ditto) {

        topics.push(newGif);

        createButtons();
    }

})


