<?php
$ch = curl_init(); curl_setopt(
$ch,
CURLOPT_URL, "http://projets-tomcat.isep.fr:8080/appService?ACTION=GETLOG TEAM=G10C");
curl_setopt($ch, CURLOPT_HEADER, FALSE); curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); $data = curl_exec($ch);
curl_close($ch);
echo "Raw Data:<br />"; echo("$data");