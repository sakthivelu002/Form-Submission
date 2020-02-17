<?php
session_start();
if(!isset($_SESSION['name'])){
    header('location: ..\index.html');
}
?>

<html>
<head>
    <title>Document</title>
</head>
<body>
    <a href="logout.php"> LOGOUT</a>
    <h1>Welcome <?php echo $_SESSION['name']; ?> </h1>
    </body>
</html>