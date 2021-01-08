<?php
date_default_timezone_set('Asia/Taipei');

function get_client_ip() {
    $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
       $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}


if (isset($_POST) && count($_POST) > 0){

	
	$field['name'] = $_POST['name'];
	$field['gender'] = $_POST['gender'];
	$field['phone'] = $_POST['phone'];
	$field['appointment'] = $_POST['appointment'];
	$field['remarks'] = $_POST['remarks'];
	$field['ip'] = get_client_ip();
	$field['create_dt'] = date('Y-m-d H:i:s');

	// $field['name'] = 'name7';
	// $field['gender'] = 'gender';
	// $field['phone'] = 'phone';
	// $field['appointment'] = 'appointment';
	// $field['remarks'] = 'remarks';

	$data  = http_build_query($field);
	$headerArray =array("Content-type:application/x-www-form-urlencoded;charset='utf-8'");
	$url = 'https://script.google.com/macros/s/AKfycbz0giLY5EktvSlr-mltGtHQobZpJMrcVtCjo9v0yHKSoUutPdY/exec';

	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST,FALSE);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	curl_setopt($curl,CURLOPT_HTTPHEADER,$headerArray);//Can not
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true); //keyman 

	$output = curl_exec($curl);
	$err = curl_error($curl);

	curl_close($curl);

	if ($err) {
	  // echo "cURL Error #:" . $err;
		echo json_encode(array('status' => 'error', 'msg'=>'error code(1)'));
		exit;
	} else {
	   $response = json_decode($output);
	   if($response->status == 'success'){
		  echo json_encode(array('status' => 'success', 'msg'=>'success!'));
	   }else{
	  	  echo json_encode(array('status' => 'error', 'msg'=>'error code(2)'));
	   }
	   exit;
	}

	
}

?>