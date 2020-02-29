<?php
    // データベース作成
    function createDataBase(){
        $db = new SQLite3("../db/app.db");
        $db->exec("CREATE TABLE user(id TEXT UNIQUE, pw TEXT)");
    }

    // createDataBase();

    // テスト用ユーザーの追加
    function addTestUser(){
        $db = new SQLite3("../db/app.db");
        $db->query("INSERT INTO user (id,pw) VALUES ('00001', 'matsutani')");
        $db->query("INSERT INTO user (id,pw) VALUES ('00002', 'ikeda')");
        $db->query("INSERT INTO user (id,pw) VALUES ('00003', 'harada')");
        $db->query("INSERT INTO user (id,pw) VALUES ('00004', 'onoe')");
        $db->query("INSERT INTO user (id,pw) VALUES ('00005', 'horiike')");
    }

    // addTestUser();

    // ログインする
    function login($user_id, $user_pw){
        $db = new SQLite3("../db/app.db");
        try{
            $user = $db->query("SELECT pw FROM user WHERE id='$user_id'");
            while ($result = $user->fetchArray(SQLITE3_ASSOC)){
                $pw = $result["pw"];
                if($pw == $user_pw){
                    setcookie("user_id",$user_id);
                    setcookie("user_pw",$user_pw);
                    echo true;
                }
                else
                    echo false;
            }
        }
        catch(Exception $e){
            echo false;
        }
    }

    // ログイン認証されたか確認する
    function loginCheck(){
        try{
            $user_id = $_COOKIE["user_id"];
            $user_pw = $_COOKIE["user_pw"];
            login($user_id,$user_pw);
        }
        catch(Exception $e){
            echo false;
        }
    }

    // テキストファイルの取得
    function getTheme(){
        $file_name = "../theme.txt";
        $theme_list = file($file_name,FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        shuffle($theme_list);
        echo(json_encode($theme_list,JSON_UNESCAPED_UNICODE));
    }

    switch($_POST["func"]){
        case "login": login($_POST["user_id"],$_POST["user_pw"]); break;
        case "loginCheck": loginCheck(); break;
        case "getTheme": getTheme(); break;
    }
?>