<?php
$_POST = json_decode(file_get_contents("php://input"), true);
// переменные формы
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$text = $_POST['text'];
$agency = $_POST['agency'];


$to = "modern.solution@yandex.by";
$date = date("d.m.Y");
$time = date("h:i");
$from = $email;
$subject = "Заявка c сайта";


$msg = "
    Имя: $name 
	 Агенство: $agency
    Телефон: $phone 
    Почта: $email 
    Сообщение: $text";
mail($to, $subject, $msg, "From: $from ");

?>