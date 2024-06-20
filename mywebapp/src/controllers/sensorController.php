<?php
class SensorController {

public function getAllSensorData() {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://projets-tomcat.isep.fr:8080/appService?ACTION=GETLOG&TEAM=G10C");
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    $data = curl_exec($ch);
    curl_close($ch);

    $data_tab = str_split($data, 33);
    $parsed_data = [];

    for ($i = 0, $size = count($data_tab); $i < $size; $i++) {
        $parsed_data[] = $this->parseTrame($data_tab[$i]);
    }

    header('Content-Type: application/json');
    echo json_encode($parsed_data);
}

private function parseTrame($trame) {
    $parsed = [];
    $parsed['TYP'] = substr($trame, 6, 1);
    $parsed['YEAR'] = substr($trame, 19, 4);
    $parsed['MONTH'] = substr($trame, 23, 2);
    $parsed['DAY'] = substr($trame, 25, 2);
    $parsed['HOUR'] = substr($trame, 27, 2);
    $parsed['MIN'] = substr($trame, 29, 2);
    $parsed['SEC'] = substr($trame, 31, 2);
    $parsed['VAL'] = substr($trame, 9, 4);
    return $parsed;
}

public function sendDataToEnergia() {
    $postData = json_decode(file_get_contents('php://input'), true);
    $trame = $postData['trame'];

    $url = "http://projets-tomcat.isep.fr:8080/appService?ACTION=COMMAND&TEAM=G10C&TRAME=" . urlencode($trame);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;
}
}