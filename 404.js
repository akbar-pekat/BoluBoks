$(document).ready(function() {

  var loading = $(".loading");

  setTimeout(function() {
    loading.fadeOut();
  }, 2000);


  $("#back").click(function(event) {
    window.location.href = "p/menu.html";
  });

});