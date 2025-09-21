<?php

require_once('phpmailer/class.phpmailer.php');

$mail = new PHPMailer();

try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'mail.mudanzasmiranda.com.ar';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'presupuestos@mudanzasmiranda.com.ar';                 // SMTP username
    $mail->Password = 'YLvVosBP!kJu';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($_POST['email'], $_POST['name']);
    $mail->addAddress('presupuestos@mudanzasmiranda.com.ar', 'Hugo Miranda');     // Add a recipient
    $mail->addReplyTo($_POST['email'], $_POST['name']);

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Pedido de presupuesto';
    $mail->Body    = getBody();
    $mail->CharSet = 'UTF-8';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}

function getBody(){

    $arrDetalles = isset($_POST['detallesOrigen']) && $_POST['detallesOrigen'] != null ? $_POST['detallesOrigen'] : null;
    $arrDetalles = isset($_POST['detallesLlegada']) && $_POST['detallesLlegada'] != null ? $_POST['detallesLlegada'] : null;
    $arrDetalles = isset($_POST['detallesCargasGenerales']) && $_POST['detallesCargasGenerales'] != null ? $_POST['detallesCargasGenerales'] : null ? $_POST['detallesCargasGenerales'] : null ? $_POST['detallesCargasGenerales'] : null ? $_POST['detallesCargasGenerales'] : null ? $_POST['detallesCargasGenerales'] : null ? $_POST['detallesCargasGenerales'] : null ? $_POST['detallesCargasGenerales'] : null;

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $datetimepicker = $_POST['datetimepicker'];
    $service = $_POST['service'];
    $distance = $_POST['distance'];
    $metroscubicos = $_POST['metroscubicos'];
    $adress1 = $_POST['adress1'];
    $adress1origen = $_POST['adress1origen'];
    $room1 = $_POST['room1'];
    $size1 = $_POST['size1'];
    $adress2 = $_POST['adress2'];
    $adress2origen = $_POST['adress2origen'];
    $room2 = $_POST['room2'];
    $size2 = $_POST['size2'];
    $detail = $_POST['detail'];
    $message = $_POST['message'];

    $detallesOrigen = "";

    foreach($_POST["detallesOrigen"] as $combo){
        $detallesOrigen .= $combo.",";
    }

    $detallesLlegada = "";

    foreach($_POST["detallesLlegada"] as $combo){
        $detallesLlegada .= $combo.",";
    }

    $detallesCargasGenerales = "";

    foreach($_POST["detallesCargasGenerales"] as $combo){
        $detallesCargasGenerales .= $combo.",";
    }

    $subject = isset($subject) ? $subject : 'Pedido de presupuesto';

    $botcheck = $_POST['botcheck'];

    $name = isset($name) ? "<strong>Nombre:</strong> $name<br><br>" : '';
    $phone = isset($phone) ? "<strong>Teléfono:</strong> $phone<br><br>" : '';
    $email = isset($email) ? "<strong>Email:</strong> $email<br><br>" : '';
    $datetimepicker = isset($message) ? "<strong>Fecha de la mudanza:</strong> $datetimepicker<br><br>" : '';
    $service = isset($message) ? "<strong>Tipo de servicio:</strong> $service<br><br>" : '';
    $distance = isset($message) ? "<strong>Distancia en kilómetros:</strong> $distance<br><br>" : '';
    $metroscubicos = isset($message) ? "<strong>Metros cúbicos a trasladar:</strong> $metroscubicos<br><br>" : '';
    $adress1 = isset($message) ? "<strong>Lugar de salida:</strong> $adress1<br><br>" : '';
    $adress1origen = isset($message) ? "<strong>Número del piso:</strong> $adress1origen<br><br>" : '';
    $room1 = isset($message) ? "<strong>Cantidad de habitaciones:</strong> $room1<br><br>" : '';
    $size1 = isset($message) ? "<strong>Metros cuadrados:</strong> $size1<br><br>" : '';
    $adress2 = isset($message) ? "<strong>Lugar de llegada:</strong> $adress2<br><br>" : '';
    $adress2origen = isset($message) ? "<strong>Número del piso:</strong> $adress2origen<br><br>" : '';
    $room2 = isset($message) ? "<strong>Cantidad de habitaciones:</strong> $room2<br><br>" : '';
    $size2 = isset($message) ? "<strong>Metros cuadrados:</strong> $size2<br><br>" : '';
    $detail = isset($message) ? "<strong>Otros artículos a trasladar:</strong> $detail<br><br>" : '';
    $message = isset($message) ? "<strong>Consultas:</strong> $message<br><br>" : '';
    $detOrigen = isset($detallesOrigen) ? " <strong>Detalles Origen:</strong> $detallesOrigen<br><br>" : "";
    $detLlegada = isset($detallesLlegada) ? " <strong>Detalles Llegada:</strong> $detallesLlegada<br><br>" : "";
    $detCargasGenerales = isset($detallesCargasGenerales) ? " <strong>Detalle de la mudanza para ubicar la carga:</strong> $detallesCargasGenerales<br><br>" : "";

    return "$name $phone $email $datetimepicker $service $distance $metroscubicos $adress1 $adress1origen $room1 $size1 $detOrigen $adress2 $adress2origen $room2 $size2 $detLlegada
    $detCargasGenerales $detail $message";
}

?>