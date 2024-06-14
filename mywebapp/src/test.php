<?php
$ch = curl_init(); curl_setopt(
$ch,
CURLOPT_URL, "http://projets-tomcat.isep.fr:8080/appService?ACTION=GETLOG&TEAM=G10C");
curl_setopt($ch, CURLOPT_HEADER, FALSE); curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); $data = curl_exec($ch);
curl_close($ch);
echo "Raw Data:<br />"; echo("$data");
$data_tab = str_split($data,33);
echo "Tabular Data:<br />";
for($i=0, $size=count($data_tab); $i<$size; $i++){
echo "Trame $i: $data_tab[$i]<br />";
}

$trame = $data_tab[1];
$t = substr($trame,0,1);
$o = substr($trame,1,4);
$r = substr($trame,5,1);
$c = substr($trame,6,1);
$n = substr($trame,7,2);
$v = substr($trame,9,4);
$a = substr($trame,13,4);
$x = substr($trame,17,2);
$year = substr($trame,19,4);
$month = substr($trame,23,2);
$day = substr($trame,25,2);
$hour = substr($trame,27,2);
$min = substr($trame,29,2);
$sec = substr($trame,31,2);



list($t, $o, $r, $c, $n, $v, $a, $x, $year, $month, $day, $hour, $min, $sec) = sscanf($trame, "%1s%4s%1s%1s%2s%4s%4s%2s%4s%2s%2s%2s%2s%2s");
echo("<br />$t, $o, $r, $c, $n, $v, $a, $x, $year, $month, $day, $hour, $min, $sec<br />");
