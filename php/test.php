<?php
    $file_name = "./../theme.txt";
    $theme_list = file($file_name,FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    print(json_encode($theme_list,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
?>