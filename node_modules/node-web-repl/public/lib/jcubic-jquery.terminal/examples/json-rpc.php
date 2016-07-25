<?php
/*
    JSON-RPC Server implemenation
    Copyright (C) 2009 Jakub Jankiewicz <http://jcubic.pl> 

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/
/*
    USAGE: create one class with public methods and call handle_json_rpc function
           with instance of this class
           
           <?php
               require('json_rpc.php');
               class Server {
                   public function test($message) {
                       retrun "you send " . $message;
                   }
                   
               }

               handle_json_rpc(new Server());
            ?>

            you can provide documentations for methods
            by adding static field:

                class Server {
                    ...
                    public static $test_documentation = "doc string";
                }
            
            It alway create one method 'help' which return string
            with list of methods if call with no arguments and
            return documentation string for method passed as parameter.
*/
// ----------------------------------------------------------------------------
function json_error() {
  switch (json_last_error()) {
  case JSON_ERROR_NONE:
    return 'No error has occurred';
  case JSON_ERROR_DEPTH:
    return 'The maximum stack depth has been exceeded';
  case JSON_ERROR_CTRL_CHAR:
    return 'Control character error, possibly incorrectly encoded';
  case JSON_ERROR_SYNTAX:
    return 'Syntax error';
  case JSON_ERROR_UTF8:
    return 'Malformed UTF-8 characters, possibly incorrectly encoded';
  }
}


// ----------------------------------------------------------------------------
// check if object has field
function has_field($object, $field) {
  //return in_array($field, array_keys(get_object_vars($object)));
  return array_key_exists($field, get_object_vars($object));
}

// ----------------------------------------------------------------------------
// return object field if exist otherwise return default value
function get_field($object, $field, $default) {
  $array = get_object_vars($object);
  if (isset($array[$field])) {
    return $array[$field];
  } else {
    return $default;
  }
}


// ----------------------------------------------------------------------------
//create json-rpc response
function response($result, $id, $error) {
  return json_encode(array("jsonrpc" => "2.0",
			   'result' => $result,
			   'id' => $id,
			   'error'=> $error));
}

// ----------------------------------------------------------------------------
// try to extract id from broken json
function extract_id() {
  $regex = '/[\'"]id[\'"] *: *([0-9]*)/';
  if (preg_match($regex, $GLOBALS['HTTP_RAW_POST_DATA'], $m)) {
    return $m[1];
  } else {
    return 0;
  }
}

// ----------------------------------------------------------------------------
function handle_json_rpc($object) {
  /*
  if ($input == '') {
    $input = file_get_contents('php://input');
  }
  */
  $input = $GLOBALS['HTTP_RAW_POST_DATA'];
  $encoding = mb_detect_encoding($input, 'auto');
  //convert to unicode
  if ($encoding != 'UTF-8') {
    $input = iconv($encoding, 'UTF-8', $input);
  }
  $input = json_decode($input);
  header('Content-Type: text/plain');

  // handle Errors
  if (!$input) {
    if ($GLOBALS['HTTP_RAW_POST_DATA'] == "") {
      echo response(null, 0, array("code"=> -32700,
				   "message"=>"Parse Error: no data"));
    } else {
      // json parse error
      $error = json_error();
      $id = extract_id();
      echo response(null, $id, array("code"=> -32700,
				     "message"=>"Parse Error: $error"));
    }
    exit;
  } else {
    $method = get_field($input, 'method', null);
    $params = get_field($input, 'params', null);
    $id = get_field($input, 'id', null);

    // json rpc error
    if (!($method && $id)) {
      if (!$id) {
        $id = extract_id();
      }
      if (!$method) {
	    $error = "no method";
      } else if (!$id) {
	    $error = "no id";
      } else {
	    $error = "unknown reason";
      }
      echo response(null, $id, array("code" => -32600,
				     "message" => "Invalid Request: $error"));
      exit;
    }
  }

  // fix params (if params is null set it to empty array)
  if (!$params) {
    $params = array();
  }
  // if params is object change it to array
  if (is_object($params)) {
    if (count(get_object_vars($params)) == 0) {
      $params = array();
    } else {
      $params = get_object_vars($params);
    }
  }
  
  // call Service Method
  try {
    $class = get_class($object);
    $methods = get_class_methods($class);
    if (strcmp($method, 'help') == 0) {
      if (count($params) > 0) {
        if (!in_array($params[0], $methods)) {
          $no_method = 'There is no ' . $params[0] . ' method';
          throw new Exception($no_method);
        } else {
          $static = get_class_vars($class);
          $help_str_name = $params[0] . "_documentation";
          //throw new Exception(implode(", ", $static));
          if (array_key_exists($help_str_name, $static)) {
            echo response($static[$help_str_name], $id, null);
          } else {
            throw new Exception($method . " method has no documentation");
          }
        }
      } else {
        $url = "http://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
        $msg = 'PHP JSON-RPC - in "' . $url . "\"\n";
        $msg .= "class \"$class\" has methods: " . implode(", ", array_slice($methods, 0, -1)) . " and " .  $methods[count($methods)-1] . ".";
        echo response($msg, $id, null);
      }
    } else if (!in_array($method, $methods)) {
      $msg = 'There is no ' . $method . ' method';
      echo response(null, $id, array("code" =>-32601, "message" => $msg));
    } else {
      //throw new Exception('x -> ' . json_encode($params));
      $result = call_user_func_array(array($object, $method), $params);
      echo response($result, $id, null);
    }
    exit;
  } catch (Exception $e) {
    //catch all exeption from user code
    $msg = "Internal error: " . $e->getMessage();
    echo response(null, $id, array("code"=>-32603, "message"=>$msg));
  }
}


?>
