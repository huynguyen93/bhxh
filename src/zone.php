<?php

$rows = json_decode(file_get_contents(__DIR__.'/zones-raw.json'), true);

$result = [];


$currentProvince = '';

foreach ($rows as $row) {
    $field1 = $row['FIELD1'];
    $field2 = $row['FIELD2'];
    $field3 = $row['FIELD3'];
    $field4 = $row['FIELD4'];

    if (strlen($field1) === 2) {
        $currentProvince = $field2;
        $districts = $field3;
        $zone = $field4;
    } else {
        $districts = $field1;
        $zone = $field2;
    }

    $districts = explode(',', $districts);

    foreach ($districts as $district) {
        $district = trim($district);
        $result[$currentProvince][$district] = $zone;
    }
}

echo json_encode($result, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
