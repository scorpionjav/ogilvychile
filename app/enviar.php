<?php
	// NOTE: CON ESTO PODEMOS HABILITAR CORS
	header("Access-Control-Allow-Credentials: true");
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Max-Age: 1000');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
	header('Content-Type: text/html; charset=utf-8');
/*
  ___         _            
 |   \  __ _ | |_  ___  ___
 | |) |/ _` ||  _|/ _ \(_-<
 |___/ \__,_| \__|\___//__/
                                                    
*/
	$nomApe = isset($_POST['nomApe']) ? $_POST['nomApe'] : "Sin nomApe";
	$correo = isset($_POST['correo']) ? $_POST['correo']: "Sin correo";
	$asunto = isset($_POST['asunto']) ? $_POST['asunto'] : "Sin asunto";
	$mensaje = isset($_POST['mensaje']) ? $_POST['mensaje'] : "Sin mensaje";
/*
   ___                          
  / __| ___  _ _  _ _  ___  ___ 
 | (__ / _ \| '_|| '_|/ -_)/ _ \
  \___|\___/|_|  |_|  \___|\___/
                                
*/
// Importa las clases requeridas
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require_once('./PHPMailer/PHPMailer.php');
	require_once('./PHPMailer/Exception.php');
	require_once('./PHPMailer/SMTP.php');

	// Crea un nueva instancia del PHPMailer
	$mail = new PHPMailer(true);
	try {
		// Configuración del servidor SMTP
		$mail->SMTPDebug = 2;
		$mail->isSMTP();
		$mail->Host = 'smtp.gmail.com';
		$mail->Port = 465;
		$mail->SMTPSecure = 'ssl';
		$mail->SMTPAuth = true;
		// Cuenta para enviar el correo
		$mail->Username = "scorpion06av@gmail.com"; // Usuario gmail
		$mail->Password = "parapruebas"; // Clave del correo
		// Emisor del correo
		$mail->From = "scorpion06av@gmail.com";
		$mail->FromName = "ogilvychile.cl";
		// Destinatarios del correo
		$mail->addAddress("jesus.acevedo@ogilvy.com", "Ogilvy Chile"); // FIXME: email de ogilvy chile
		// $mail->addCC('cc@example.com');
		// $mail->addBCC('bcc@example.com');
		// Habilita el enviar correo en formato HTML
		$mail->isHTML(true);
		$mail->CharSet = 'UTF-8';
		// Asunto del correo
		$mail->Subject = "Ogilvy Chile | Contacto";
		// Contenido del correo
		$mail->Body =
		"<!DOCTYPE html>
		<html>

		<head>
			<title>Ogilvy Chile | Contacto</title>
			<meta charset='UTF-8'>
			<meta name='viewport' content='width=device-width, initial-scale=1.0'>
			<meta http-equiv='X-UA-Compatible' content='IE=edge'>
			<style type='text/css'>
				/* CLIENT-SPECIFIC STYLES */

				body,
				table,
				td,
				a {
					-webkit-text-size-adjust: 100%;
					-ms-text-size-adjust: 100%;
				}

				/* Prevent WebKit and Windows mobile changing default text sizes */

				table,
				td {
					mso-table-lspace: 0pt;
					mso-table-rspace: 0pt;
				}

				/* Remove spacing between tables in Outlook 2007 and up */

				img {
					-ms-interpolation-mode: bicubic;
				}

				/* Allow smoother rendering of resized image in Internet Explorer */

				/* RESET STYLES */

				img {
					border: 0;
					height: auto;
					line-height: 100%;
					outline: none;
					text-decoration: none;
					color: #000;
					display: block
				}

				table {
					border-collapse: collapse !important;
				}

				body {
					height: 100% !important;
					margin: 0 !important;
					padding: 0 !important;
					width: 100% !important;
				}

				/* iOS BLUE LINKS */

				a[x-apple-data-detectors] {
					color: inherit !important;
					text-decoration: none !important;
					font-size: inherit !important;
					font-family: inherit !important;
					font-weight: inherit !important;
					line-height: inherit !important;
				}

				/* STYLES JAV */

				body {
					background: #ffffff;
					color: #ffffff !important;
					font-family: sans-serif, Helvetica, Arial;
				}

				a {
					text-decoration: none !important;
				}

			</style>
		</head>

		<body>
			<table width='100%' cellspacing='0' cellpadding='0' border='0' bgcolor='#ffffff'>
				<tbody>
					<tr>
						<td align='center' bgcolor='#ffffff'>
							<table align='center' width='600' cellspacing='0' cellpadding='0' border='0' style='background: #e84148;'>
								<tr>
									<td align='center' style='padding: 5px'>
										<img src='http://ogilvychile.cl/app/logo-email.png' width='70' height='27.52' alt='Ogilvy'>
									</td>
								</tr>
								<tr>
									<td align='center' bgcolor='#000' style='background-color: #000; color:#e84148; font-size: 20px; padding: 5px;'>
										<i><b>Datos del Interesado</b></i>
									</td>
								</tr>
								<tr>
									<td style='padding: 10px 0;'>
										<table align='left' width='180' cellspacing='0' cellpadding='0' border='0'>
											<tr>
												<td align='right' style='color:#fff; font-size: 16px; '>
												Asunto:
												</td>
											</tr>
										</table>
										<table align='right' width='410' cellspac ing='0' cellpadding='0' border='0'>
											<tr>
												<td align='justify' style='color:#000; font-size: 16px; padding-left: 10px;'>
													$asunto
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td>
										<table align='left' width='180' cellspacing='0' cellpadding='0' border='0'>
											<tr>
												<td align='right' style='color:#fff; font-size: 16px; '>
													Nombre y Apellido:
												</td>
											</tr>
										</table>
										<table align='right' width='410' cellspac ing='0' cellpadding='0' border='0'>
											<tr>
												<td align='justify' style='color:#000; font-size: 16px; padding-left: 10px;'>
													$nomApe
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td style='padding: 10px 0;'>
										<table align='left' width='180' cellspacing='0' cellpadding='0' border='0'>
											<tr>
												<td align='right' style='color:#fff; font-size: 16px; '>
													Correo Electrónico:
												</td>
											</tr>
										</table>
										<table align='right' width='410' cellspac ing='0' cellpadding='0' border='0'>
											<tr>
												<td align='justify' style='color:#000; font-size: 16px; padding-left: 10px;'>
													$correo
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<td style='padding-bottom: 10px;'> 
										<table align='left' width='180' cellspacing='0' cellpadding='0' border='0'>
											<tr>
												<td align='right' style='color:#fff; font-size: 16px; '>
													Mensaje:
												</td>
											</tr>
										</table>
										<table align='right' width='410' cellspac ing='0' cellpadding='0' border='0'>
											<tr>
												<td align='justify' style='color:#000; font-size: 16px; padding: 0 10px;'>
													$mensaje
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</body>
		<!-- Jesús Alberto AV -->

		</html>";
		// Envio del correo
		if(!$mail->send()){
			print_r(json_encode(["PHPMailer Error: " => $mail->ErrorInfo]));
		} else {
			print_r(json_encode(["PHPMailer: " => "El correo fue enviado correctamente."]));
		}
	} catch (Exception $e) {
		echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
	}
?>