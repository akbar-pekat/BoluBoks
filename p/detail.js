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
    if (cartArray == 0) {
      window.location.replace("menu.html")
    }
    var output = "";

    for (var i in cartArray) {
      output += '<li><div class="group"><div class="name"><h3>'+cartArray[i].name+'</h3><div class="qyt"><p>Rp '+cartArray[i].price+'</p><span>&nbsp;x&nbsp;</span><input type="number" id="input" value="'+cartArray[i].count+'" readonly /><span>=&nbsp;Rp '+cartArray[i].total+'</span></div></div><div class="action"><button class="delete-item" data-name="'+cartArray[i].name+'">Hapus</button></div></div></li>';
    }
    $("#show-carth").html(output);
    $("#total-cart").html(shoppingCart.totalCartTax());
  }

  $("#show-carth").on("click", ".delete-item", function(event) {
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  });

  $("#discountfix").click(function(event) {
    var voucher = $("#voucherinput").val();
    if (voucher === "BebasOngkir") {
      $("#total-cart").html(shoppingCart.addDiscount());
      $("#discountfix").hide();
      $("#diskon").html("Diskon: BebasOngkir (-Rp 5000)");
      toastr.success('Selamat kak, vouchernya berhasil dipakai');
      toastr.options.preventDuplicates = true;
    } else if (voucher === "ALUMNI6B") {
      $("#total-cart").html(shoppingCart.addDiscount());
      $("#discountfix").hide();
      $('#voucherinput').attr('readonly', true);
      $("#diskon").html("Diskon: ALUMNI6B (-Rp 5000)");
      toastr.success('Selamat kak, vouchernya berhasil dipakai');
      toastr.options.preventDuplicates = true;
    } else if (voucher === "") {
      toastr.info('Diketik dulu kak kode vouchernya');
      toastr.options.preventDuplicates = true;
    } else {
      toastr.error('Maaf kak, kode vouchernya salah/sudah kadaluarsa');
      toastr.options.preventDuplicates = true;

    }
  });

  displayCart();

});