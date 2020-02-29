// ID,PWのチェック
function loginCheck() {
    $("#login_btn").on("click", function (e) {
        e.preventDefault();
        var user_id = $(":text[name='user_id']").val()
        var user_pw = $(":password[name='user_pw']").val()
        // console.log("ID：" + user_id);
        // console.log("PW：" + user_pw);
        $.ajax({
            url: "/php/server.php",
            type: "post",
            data: {
                "func": "login",
                "user_id": user_id,
                "user_pw": user_pw
            }
        })
            .done(function (data) {
                if (data == true) {
                    // console.log(data);
                    window.location.href = "/htmls/user.html";
                }
                else {
                    // console.log(data)
                    $("#err_message").text("IDまたはパスワードに誤りがあります。");
                }

            });
    });
}

// サイドバーの高さを画面の高さに合わせる
$(window).on("load resize", function () {
    var wH = $(window).height();
    var wW = $(window).width();
    $(".login_form").css({
        "height": wH + "px"
    });
});

$(function () {
    loginCheck();
});