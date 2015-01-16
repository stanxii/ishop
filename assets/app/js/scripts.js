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
// 上传头像
$("#upload-btn").click(function(){
  $("#file-choose").click();
});

$('#file-choose').fileupload({
  url: '/upload_avatar',
  dataType: 'json',
  start: function(){
    $(".img-button #upload-btn").text("图片上传中...");
  },
  done: function (e, data) {
    $(".img-tainer img").attr("src", data.result.logo);
  },
  error: function(){
    alert("图片上传失败，请稍后再试");
  },
  complete: function(){
    $(".img-button #upload-btn").text("本地上传");
  }

});
