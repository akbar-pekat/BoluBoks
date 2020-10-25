$(document).ready(function() {

  var loading = $(".loading");

  setTimeout(function() {
    loading.fadeOut();
  }, 2000);

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
  }

  displayCart();

  var client = contentful.createClient({
    space: 'ju5zd1pqvz7r',
    environment: 'master',
    accessToken: 'Lbt6FEumYh_oBOXVa0boT110z_1OK1c6nq9S4zopLGY'
  });
  client.getEntry('4xOwtZkyMqid1kLqnjIsoF')
  .then(function (entry) {
    $("#TanggalPO").html(entry.fields.tanggalPo);
    console.log(entry);
  });

  client.getEntries({
    content_type: 'mainMenu'
  }).then(function (entries) {
    var ei = entries.items;
    var i;
    for (i = 0; i < ei.length; i++) {
      var NamaProduk = entries.items[i].fields.namaProduk;
      var URLGambar = entries.items[i].fields.urlGambar;
      var IdProduk = entries.items[i].sys.id;
      console.log(entries.items[i].fields)
      $(".listitem").append('<div class="items"><div class="image"><div class="label"><small>Promo</small></div><h1>'+NamaProduk+'</h1><img src="'+URLGambar+'" /></div><div class="data"><button class="toProduct" data-idmenu="'+IdProduk+'">Lihat Menu</button></div></div>');
    }
    setTimeout(function() {
      $(".listitem").append('<div class="lastitem">.</div>');
    },
      500);

    $(".toProduct").click(function(event) {
      event.preventDefault();
      var dataidmenu = $(this).attr("data-idmenu");
      localStorage.setItem("ProdukID", dataidmenu);
      window.location.href = "product.html"
    });
    
    $("#detail").click(function(event) {
      event.preventDefault();
      window.location.href = "detail.html"
    });
    
  });

});