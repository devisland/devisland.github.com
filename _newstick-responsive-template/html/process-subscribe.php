<?php
if (isset($_POST['action'])) { // Checking for submit action
	require_once 'mailchimp/MCAPI.class.php';
	require_once 'mailchimp/config.inc.php'; // Write your apikey in this file

	if ($_POST['action'] == 'add') {
		$email		= trim(strip_tags(addslashes($_POST['email'])));
		$api		= new MCAPI($apikey);
		$merge_vars	= array(); // Write the merge variables here!
		
		// By default this sends a confirmation email - you will not see new members
		// until the link contained in it is clicked!
		$retval		= $api->listSubscribe($listId, $email, $merge_vars);
		
		if ($api->errorCode) echo "error|Please enter a valid email address"; // an error message
		else echo "success|Subscribe process completed"; // an success message
	}
} else { // Submit action false
	header("Location: index.html");	
}
?>