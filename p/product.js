$(document).ready(function() {

  var loading = $(".loading");

  setTimeout(function() {
    loading.fadeOut();
  }, 2000);


  $("#back").click(function(event) {
    window.location.href = "menu.html";
  });

  function displayCart() {
    $("#count-cart").html(shoppingCart.countCart());
    $("#total-cart").html(shoppingCart.totalCart());

    var sccc = shoppingCart.countCart();

    if (sccc > 0) {
      $(".fillcart").show();
      $(".emptycart").hide();
    } else {
      $(".fillcart").hide();
      $(".emptycart").show();
    }

    countcart = $("#count-cart").text();
    if (countcart == "5") {
      $("#addMenu").css("background-color", "#d1d8e0");
    } else {
      $("#addMenu").css("background-color", "#4b7bec");
    }
  }

  displayCart();

  var ProdukID = localStorage.getItem("ProdukID");

  if (ProdukID == null) {
    window.location.replace("menu.html")
  }

  var client = contentful.createClient({
    space: 'ju5zd1pqvz7r',
    environment: 'master',
    accessToken: 'Lbt6FEumYh_oBOXVa0boT110z_1OK1c6nq9S4zopLGY'
  });
  client.getEntry(ProdukID)
  .then(function (entry) {
    console.log(entry);
    $("#ProductName").html(entry.fields.namaProduk)
    var ProductImg = entry.fields.urlGambar
    $("#ProductImg").attr("src", ProductImg);
    $("#ProductPrice").html(entry.fields.hargaProduk)

    setTimeout(function() {
      $(".addcart").append('<button id="addMenu" data-name="'+entry.fields.namaProduk+'" data-price="'+entry.fields.hargaProduk+'">Tambah</button>&nbsp;<button id="removeMenu" data-name="'+entry.fields.namaProduk+'">Kurang</button><div class="checkout"><button>Detail Pesanan</button></div>');

      var countcart

      $("#addMenu").click(function(event) {
        event.preventDefault();
        var name = $(this).attr("data-name");
        var price = Number($(this).attr("data-price"));

        countcart = $("#count-cart").text();
        if (countcart > 4) {
          $("#addMenu").css("background-color", "#d1d8e0");
        } else {
          $("#addMenu").css("background-color", "#4b7bec");
          shoppingCart.addItemToCart(name, price, 1);
        }

        displayCart();
      });

      $("#removeMenu").click(function(event) {
        var name = $(this).attr("data-name");
        shoppingCart.removeItemFromCart(name);

        countcart = $("#count-cart").text();
        if (countcart < 5) {
          $("#addMenu").css("background-color", "#4b7bec");
        } else {
          $("#addMenu").css("background-color", "#d1d8e0");
        }
        displayCart();
      });
    },
      500);
  });

});