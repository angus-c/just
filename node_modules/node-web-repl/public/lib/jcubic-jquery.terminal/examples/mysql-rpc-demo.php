<?php

require('json-rpc.php');

mysql_connect('localhost', 'user', 'password');
mysql_select_db('database_name');

class MysqlDemo {
  public function query($query) {
    if (preg_match("/create|drop/", $query)) {
      throw new Exception("Sorry you are not allowed to execute '" . 
                          $query . "'");
    }
    if (!preg_match("/(select.*from *test|insert *into *test.*|delete *from *test|update *test)/", $query)) {
      throw new Exception("Sorry you can't execute '" . $query .
                          "' you are only allowed to select, insert, delete " .
                          "or update 'test' table");
    }
    if ($res = mysql_query($query)) {
      if ($res === true) {
        return true;
      }
      if (mysql_num_rows($res) > 0) {
        while ($row = mysql_fetch_row($res)) {
          $result[] = $row;
        }
        return $result;
      } else {
        return array();
      }
    } else {
      throw new Exception("MySQL Error: " . mysql_error());
    }
  }
}

handle_json_rpc(new MysqlDemo());

?>