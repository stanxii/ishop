$(".nav-coder").click(function () {
  $(this).addClass("current-menu-item");
  $(".nav-company").removeClass("current-menu-item");
  $(".nav-problem").removeClass("current-menu-item");
  $(".nav-invite").removeClass("current-menu-item");
});
$(".nav-company").click(function () {
  $(this).addClass("current-menu-item");
  $(".nav-coder").removeClass("current-menu-item");
  $(".nav-problem").removeClass("current-menu-item");
  $(".nav-invite").removeClass("current-menu-item");
});
$(".nav-problem").click(function () {
  $(this).addClass("current-menu-item");
  $(".nav-company").removeClass("current-menu-item");
  $(".nav-coder").removeClass("current-menu-item");
  $(".nav-invite").removeClass("current-menu-item");
});
$(".nav-invite").click(function () {
  $(this).addClass("current-menu-item");
  $(".nav-company").removeClass("current-menu-item");
  $(".nav-problem").removeClass("current-menu-item");
  $(".nav-coder").removeClass("current-menu-item");
});

