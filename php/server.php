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
        // // データベース処理
        // $db = new SQLite3("../db/app.db");
        // try{
        //     $user = $db->query("SELECT pw FROM user WHERE id='$user_id'");
        //     while ($result = $user->fetchArray(SQLITE3_ASSOC)){
        //         $pw = $result["pw"];
        //         if($pw == $user_pw){
        //             setcookie("user_id",$user_id);
        //             setcookie("user_pw",$user_pw);
        //             echo true;
        //         }
        //         else
        //             echo false;
        //     }
        // }
        // catch(Exception $e){
        //     echo false;
        // }

        // テキストファイル処理
        $file_name = "../admin/user.txt";
        $user_list_file = file($file_name,FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $user_list = array();
        foreach($user_list_file as $user){
            $user_info = explode(",",$user);
            $user_idx = preg_replace("/( |　)/", "", $user_info[0]);
            $user_pwx = preg_replace("/( |　)/", "", $user_info[1]);
            if((strlen($user_id) == 5) && (strlen($user_pw) >= 6) && (strlen($user_pw) <= 20))
                $user_list += array($user_idx=>$user_pwx);
        }
        try{
            $user_pwx = $user_list[$user_id];
            if($user_pw == $user_pwx){
                setcookie("user_id",$user_id);
                setcookie("user_pw",$user_pw);
                echo true;
            }
            else{
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

    // theme.txtの取得とランダムに並び替え
    function getTheme(){
        $roop = rand(1,10);
        $file_name = "../admin/theme.txt";
        $theme_list = file($file_name,FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        for($i=0;$i<$roop;$i++)
            shuffle($theme_list);
        echo(json_encode($theme_list,JSON_UNESCAPED_UNICODE));
    }

    function getTime($type){
        if($type=="display"){
            $file_name = "../admin/displayTime.txt";
            $display_time_list = file($file_name,FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            echo(json_encode($display_time_list,JSON_UNESCAPED_UNICODE));
        }
        else if($type == "interval"){
            $file_name = "../admin/intervalTime.txt";
            $interval_time_list = file($file_name,FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            echo(json_encode($interval_time_list,JSON_UNESCAPED_UNICODE));
        }
    }

    switch($_POST["func"]){
        case "login": login($_POST["user_id"],$_POST["user_pw"]); break;
        case "loginCheck": loginCheck(); break;
        case "getTheme": getTheme(); break;
        case "getTime": getTime($_POST["type"]); break;
    }
?>