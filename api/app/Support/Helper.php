<?php

namespace App\Support;

class Helper {
  /**
   * Converts an array of objects into an object, keys based on its key
   * [{ "entry_date": "" }, { "entry_date": "" }] -> { "2019-08-20": {}, ... }
   */
  static public function toPropertyKeys($array, $property) {
    $result = [];

    foreach ($array as $item) {
      $result[$item[$property]] = $item;
    }

    return count($result) ? $result : new stdClass;
  }
}