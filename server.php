<?php
$_POST = json_decode(file_get_contents("php://input"), true);
// переменные формы
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$text = $_POST['text'];



$to = "evgeniykazaktest@gmail.com";
$date = date("d.m.Y");
$time = date("h:i");
$from = $email;
$subject = "Заявка c сайта";


$msg = "
    Имя: $name 
    Телефон: $phone 
    Почта: $email 
    Сообщение: $text";
mail($to, $subject, $msg, "From: $from ");

?>