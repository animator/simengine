<?php
header('Access-Control-Allow-Origin: *');
$ds = DIRECTORY_SEPARATOR; //1

shell_exec('sudo rm uploads/*');
$out = shell_exec('chmod -R 777 uploads/');
$output = shell_exec('python parser.py > uploads/cyl.js');
$out = shell_exec('chmod -R 777 uploads/');
?>
<!doctype html>
<html lang="en">
<head>
	<title>SimEngine</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
	<link rel=stylesheet href="css/base.css"/>
</head>
<body>

<script src="js/Three.js"></script>
<script src="js/Detector.js"></script>
<script src="js/Stats.js"></script>
<script src="js/OrbitControls.js"></script>
<script src="js/THREEx.KeyboardState.js"></script>
<script src="js/THREEx.FullScreen.js"></script>
<script src="js/THREEx.WindowResize.js"></script>

<!-- jQuery code to display an information button and box when clicked. -->
<script src="js/jquery-1.9.1.js"></script>
<script src="js/jquery-ui.js"></script>
<link rel=stylesheet href="css/jquery-ui.css" />
<link rel=stylesheet href="css/info.css"/>
<script src="js/info.js"></script>
<div id="infoButton"></div>
<div id="infoBox" title="Demo Information">
This three.js demo is part of a collection at
<a href="http://stemkoski.github.io/Three.js/">http://stemkoski.github.io/Three.js/</a>
</div>
<!-- ------------------------------------------------------------ -->

<div id="ThreeJS" style="position: absolute; left:0px; top:0px"></div>
<script src="uploads/cyl.js"></script>
<script src="sim.js"></script>

</body>
</html>
