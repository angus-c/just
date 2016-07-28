<?php

require('json-rpc.php');

class Demo {
  static $login_documentation = "login to the server (return token)";
  public function login($user, $passwd) {
    if (strcmp($user, 'demo') == 0 && strcmp($passwd, 'demo') == 0) {
      // If you need to handle more than one user you can create 
      // new token and save it in database
      // UPDATE users SET token = '$token' WHERE name = '$user'
      return md5($user . ":" . $passwd);
    } else {
      throw new Exception("Wrong Password");
    }
  }

  static $ls_documentation = "list directory if token is valid";
  public function ls($token, $path) {
    if (strcmp(md5("demo:demo"), $token) == 0) {
      if (preg_match("/\.\./", $path)) {
        throw new Exception("No directory traversal Dude");
      }
      $base = preg_replace("/(.*\/).*/", "$1", $_SERVER["SCRIPT_FILENAME"]);
      $path = $base . ($path[0] != '/' ? "/" : "") . $path;
      $dir = opendir($path);
      while($name = readdir($dir)) {
        $fname = $path."/".$name;
        if (!is_dir($name) && !is_dir($fname)) {
          $list[] = $name;
        }
      }
      closedir($dir);
      return $list;
    } else {
      throw new Exception("Access Denied");
    }
  }
  static $whoami_documentation = "return user information";
  public function whoami() {
    return array("your User Agent" => $_SERVER["HTTP_USER_AGENT"],
                 "your IP" => $_SERVER['REMOTE_ADDR'],
                 "you acces this from" => $_SERVER["HTTP_REFERER"]);
  }
}

handle_json_rpc(new Demo());

?>