var d_time; // 表示時間
var i_time; // 間隔時間
var THEME_LIST; // お題
var timer; // 繰り返し用のタイマーおよび停止用

// サイドバーの高さを画面の高さに合わせる
$(window).on("load resize", function () {
    var wH = $(window).height();
    var wW = $(window).width();
    $("aside").css({
        "height": wH - 2 + "px"
    });
    $(".image_space").css({
        "height": wH - 2 + "px"
    });
});

// ページ読み込み時に、ログイン状態が正常か確認
// 正常：ページ表示　異常：ログイン画面に戻る
$(document).ready(function () {
    $.ajax({
        url: "/php/server.php",
        type: "post",
        data: {
            "func": "loginCheck"
        }
    })
        .done(function (data) {
            if (data == true) {
                console.log("権限あり");
            } else {
                console.log("権限なし");
                window.location.href = "/";
            }
        });
});

// 実行
function play() {
    $("#play_btn").on("click", function () {
        console.log("開始");
        $("#play_btn").prop("disabled", true);
        d_time = Number($("#d_time").val());
        i_time = Number($("#i_time").val());
        getTheme();
        var len = THEME_LIST.length;
        var num = 0;
        timer = setInterval(function () {
            console.log("テキスト表示");
            $("#train_text").text(THEME_LIST[num]);
            setTimeout(function () {
                console.log("テキスト非表示");
                $("#train_text").text("");
                num += 1;
                if (num == len) {
                    num = 0;
                }
            }, d_time * 1000);
        }, d_time * 1000 + i_time * 1000);
    });
}

// 停止
function stop() {
    $("#stop_btn").on("click", function () {
        clearInterval(timer);
        console.log("停止");
        $("#play_btn").prop("disabled", false);
        $("#train_image").attr({
            "src": ""
        });
    });
}


// お題の取得
function getTheme() {
    $.ajax({
        url: "/php/server.php",
        type: "post",
        dataType: "json",
        async: false,
        data: {
            "func": "getTheme"
        }
    })
        .done(function (data) {
            console.log(data);
            THEME_LIST = data;
        });
}

$(function () {
    play();
    stop();
});