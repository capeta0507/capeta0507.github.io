<?php

// if (isset($_POST) && count($_POST) > 0){

	
	$field['name'] = $_POST['name'];
	$field['email'] = $_POST['email'];
	$field['phone'] = $_POST['phone'];
	$field['county'] = $_POST['county'];
	$field['district'] = $_POST['district'];

	// $field['name'] = 'name7';
	// $field['email'] = 'email';
	// $field['phone'] = 'phone';
	// $field['county'] = 'county';
	// $field['district'] = 'district';

	$data  = http_build_query($field);
	$headerArray =array("Content-type:application/x-www-form-urlencoded;charset='utf-8'");
	$url = 'https://script.google.com/macros/s/AKfycbyIML8TCpAjEMrPE6XBKwEvmlXcVJjtUmOZm3zGc_bTrEW-6YK5/exec';

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


	// if($output == true){
	// 	echo 'aaa'.$output;
	// }else{
	// 	echo 'bbb';
	// }

	// cmcApiLog($output, $changes);
		

	// $status = true; //failure
	// $msg = '預約成功';


	// $response = array(
	// 	'status' => $status,
	// 	'msg' => $msg.$_POST['name']
	// );
	// echo json_encode($response);
	// exit;
	
// }

?>