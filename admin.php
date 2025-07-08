<?php
session_start();

$username = $_POST['username'];
$password = $_POST['password'];

if ($username === 'SURYANSH.P' && $password === '@SuryansH.p_149') {
    $_SESSION['admin'] = true;
    header('Location: admin.php');
    exit;
} else {
    echo 'Invalid credentials';
}
?>
