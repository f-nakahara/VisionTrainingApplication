var d_time; // 表示時間
var i_time; // 間隔時間
var THEME_LIST; // お題
var DISPLAY_TIME_LIST;
var INTERVAL_TIME_LIST;
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

// 表示時間（displayTime）の取得
function getDisplayTime() {
    $.ajax({
        url: "../php/server.php",
        type: "post",
        dataType: "json",
        async: false,
        data: {
            "func": "getTime",
            "type": "display"
        }
    })
        .done(function (data) {
            DISPLAY_TIME_LIST = data;
            setDisplayTime();
        })
}

function setDisplayTime() {
    DISPLAY_TIME_LIST.forEach(time => {
        $(".display_time_list").append(
            "<option>" + time + "</option>"
        );
    });
}

// 表示間隔（intervalTime）の取得
function getIntervalTime() {
    $.ajax({
        url: "../php/server.php",
        type: "post",
        dataType: "json",
        async: false,
        data: {
            "func": "getTime",
            "type": "interval"
        }
    })
        .done(function (data) {
            INTERVAL_TIME_LIST = data;
            setIntervalTime();
        })
}

function setIntervalTime() {
    INTERVAL_TIME_LIST.forEach(time => {
        $(".interval_time_list").append(
            "<option>" + time + "</option>"
        );
    });
}

// ログインチェック
function loginCheck() {
    $.ajax({
        url: "../php/server.php",
        type: "post",
        async: false,
        data: {
            "func": "loginCheck"
        }
    })
        .done(function (data) {
            if (data == true) {
            } else {
                window.location.href = "../";
            }
        });
}

// 実行
function play() {
    $("#play_btn").on("click", function () {
        function controlTheme() {
            $("#train_text").text(THEME_LIST[num]);
            setTimeout(function () {
                $("#train_text").text("");
                num += 1;
                if (num == len) {
                    num = 0;
                }
            }, d_time * 1000);
        }
        $("#play_btn").prop("disabled", true);
        d_time = Number($("#d_time").val());
        i_time = Number($("#i_time").val());
        getTheme();
        var len = THEME_LIST.length;
        var num = 0;
        setTimeout(function () {
            controlTheme();
            timer = setInterval(function () {
                controlTheme();
            }, d_time * 1000 + i_time * 1000);
        }, 1000);
    });
}

// 停止
function stop() {
    $("#stop_btn").on("click", function () {
        clearInterval(timer);
        $("#play_btn").prop("disabled", false);
        $("#train_image").attr({
            "src": ""
        });
    });
}


// お題の取得
function getTheme() {
    $.ajax({
        url: "../php/server.php",
        type: "post",
        dataType: "json",
        async: false,
        data: {
            "func": "getTheme"
        }
    })
        .done(function (data) {
            THEME_LIST = data;
        });
}

$(function () {
    loginCheck();
    getDisplayTime();
    getIntervalTime();
    play();
    stop();
});