<?php

require '../../vendor/autoload.php';


$title = 'Исходный код вашей кнопки';
$email = $_POST['email'];
$html = htmlspecialchars($_POST['html']);
$css = htmlspecialchars($_POST['css']);


///* шаблон письма*/
$smarty = new Smarty;

/* настройки шаблонизатора */
$smarty->template_dir = '../templates/templates';
$smarty->compile_dir  = '../templates/templates_c';
$smarty->config_dir   = '../templates/configs';
$smarty->cache_dir    = '../templates/cache';

$smarty->assign('title', $title);
$smarty->assign('html', $html);
$smarty->assign('css', $css);

$body = $smarty->fetch('mail.tpl');


/* почта */
$mail = new PHPMailer;

/* настройки почты */
$mail->isSMTP();

$mail->Host       = 'smtp.gmail.com';
$mail->SMTPAuth   = true;
$mail->SMTPSecure = 'ssl';
$mail->Port       = 465;
$mail->CharSet    = 'UTF-8';

$mail->Username   = 'homeworks.loftschool@gmail.com';
$mail->Password   = 'ljvfirb gj rehce';

$mail->SetFrom('homeworks.loftschool@gmail.com', 'Homeworks');
$mail->AddAddress($email);
$mail->Subject = $title;
$mail->MsgHTML($body);


/* отправка почты */
if(!$mail->send()) {
    echo 'Сообщение не было отправлено.';
    echo 'Ошибка: ' . $mail->ErrorInfo;
    http_response_code(500);
} else {
    echo 'Сообщение успешно отправлено.';
}

?>