var username = "octocat"

var settings = {
    "url": "https://api.github.com/users/" + username,
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {

    var profileImage = $("<img row>");
    profileImage.attr("src", response.avatar_url);
    profileImage.attr("alt", "Users Github Avatar Photo");
    $(".jumbotron > .container").append(profileImage);

    var name = $("<h1 row>");
    name.text(response.name);

    var org = $("<h2 row>");
    org.text("Currently @ " + response.company);

    $(".jumbotron > .container").append(profileImage, name, org);


  });