$(function () {
  $("#submit").on("click", function (event) {
    // Make sure to preventDefault on a submit event
    event.stopPropagation();

    var newBurger = {
      burger: $("#brgr").val().trim(),
    };

    //Send the POST request
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("created new burger");
      //Reload the page tp get the updated list
      location.reload();
    });
  });
  $(".devourburger").on("click", function () {
    var id = $(this).data("id");
    var newStatus = $(this).data("newburger");

    var newStatusState = {
      devoured: true,
    };

    //Send the put request
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newStatusState,
    }).then(function (data) {
      console.log("changed order to ", newStatusState);
      console.log(data);

      //reload the page to get the updated list
    }, location.reload());
  });
});
