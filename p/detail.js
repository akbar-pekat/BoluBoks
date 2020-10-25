$(document).ready(function() {

  var loading = $(".loading");

  setTimeout(function() {
    loading.fadeOut();
  }, 2000);


  $("#back").click(function(event) {
    window.location.href = "menu.html";
  });

  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var cAlength = cartArray.length;
    console.log(cartArray);
    if (cartArray == 0) {
      window.location.replace("menu.html")
    }
    console.log(cartArray.length);
    var output = "";

    for (var i in cartArray) {
      output += '<li><div class="group"><div class="name"><h3>'+cartArray[i].name+'</h3><div class="qyt"><p>Rp '+cartArray[i].price+'</p><span>&nbsp;x&nbsp;</span><input type="number" id="input" value="'+cartArray[i].count+'" readonly /><span>=&nbsp;Rp '+cartArray[i].total+'</span></div></div><div class="action"><button class="delete-item" data-name="'+cartArray[i].name+'">Hapus</button></div></div></li>';
    }
    $("#show-carth").html(output);
    $("#total-cart").html(shoppingCart.totalCartTax());
    $("#total-cart2").hide();
    $("#total-cart2").html(shoppingCart.addDiscount());
  }

  $("#show-carth").on("click", ".delete-item", function(event) {
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  });

  $("#discountfix").click(function(event) {
    var voucher = $("#voucherinput").val();
    if (voucher === "AkbarGanteng") {
      $("#total-cart2").show();
      $("#total-cart").hide();
    }
  });

  displayCart();

});