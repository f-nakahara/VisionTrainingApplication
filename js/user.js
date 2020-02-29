var d_time; // 表示時間
var i_time; // 間隔時間
var images; // 画像パス
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

// 再生ボタンの動作
// 白紙、画像を交互に表示する
function play() {
    $("#play_btn").on("click", function () {
        console.log("開始");
        $("#play_btn").prop("disabled", true);
        d_time = Number($("#d_time").val());
        i_time = Number($("#i_time").val());
        console.log(d_time);
        console.log(i_time);
        // getImage();
        getTheme();
        // var len = images.length;
        var len = THEME_LIST.length;
        var num = 0;
        timer = setInterval(function () {
            console.log("画像表示");
            // $("#train_image").attr({
            //     "src": images[num]
            // });
            $("#train_text").text(THEME_LIST[num]);
            setTimeout(function () {
                console.log("画像非表示");
                // $("#train_image").attr({
                //     "src": ""
                // });
                $("#train_text").text("");
                num += 1;
                if (num == len) {
                    num = 0;
                    // getTheme();
                }
            }, d_time * 1000);
        }, d_time * 1000 + i_time * 1000);
    });
}

// 停止ボタンの動作
// 画像の表示を止める
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

// phpから画像ファイルへのパスを取得
function getImage() {
    $.ajax({
        url: "/php/server.php",
        type: "post",
        dataType: "json",
        async: false,
        data: {
            "func": "getImage",
        }
    })
        .done(function (data) {
            console.log(data);
            images = data;
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

// 表示時間の変更
// 0.5/0.4/0.3/0.2/0.1/0.05/0.01
function changeDisplayTime() {
    $("#d_up_btn").on("click", function () {
        d_time = Number($("#d_time").val());
        if (d_time == 0.01)
            d_time = 0.05
        else if (d_time == 0.05)
            d_time = 0.1
        else if (d_time >= 0.1)
            d_time += 0.1
        if (d_time >= 0.5)
            d_time = 0.5
        d_time = d_time.toFixed(2);
        $("#d_time").val(d_time);
    });
    $("#d_down_btn").on("click", function () {
        d_time = Number($("#d_time").val());
        if (d_time <= 0.1)
            d_time -= 0.05
        else
            d_time -= 0.1
        if (d_time <= 0.00)
            d_time = 0.01
        d_time = d_time.toFixed(2);
        $("#d_time").val(d_time);
    });
}

// 表示間隔の変更
// 4.0/3.0/2.5/2.0/1.5/1.0
function changeIntervalTime() {
    $("#i_up_btn").on("click", function () {
        i_time = Number($("#i_time").val());
        if (i_time == 3.0)
            i_time += 1.0
        else
            i_time += 0.5
        if (i_time >= 4.0)
            i_time = 4.0
        i_time = i_time.toFixed(1)
        $("#i_time").val(i_time);
    })
    $("#i_down_btn").on("click", function () {
        i_time = Number($("#i_time").val());
        if (i_time == 4.0)
            i_time -= 1.0
        else
            i_time -= 0.5
        if (i_time <= 1.0)
            i_time = 1.0
        i_time = i_time.toFixed(1)
        $("#i_time").val(i_time);
    });
}

$(function () {
    play();
    stop();
    changeDisplayTime();
    changeIntervalTime();
});