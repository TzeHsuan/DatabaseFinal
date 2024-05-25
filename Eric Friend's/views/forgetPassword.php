<?php
require_once dirname(__FILE__)."/include/head.php";
require_once dirname(__FILE__)."/login_nav.php";

?>


<div class="container">
	<div class="wrapper">
		<form
			id="form"
			class="form-signin"
			method="get"  
			action="/HW3_110705063/models/forgetPassword_check.php" 
		>       
			<h3 class="form-signin-heading">Login</h3>
			<input
				id="username"
				name="username" 
				type="text" 
				class="form-control" 
				placeholder="Username" 
				required=""
			>
			<input
				id="email"
				name="email"  
				type="email" 
				class="form-control" 
				placeholder="email" 
				required=""
			>     		  
			<button 
				class="btn btn-lg btn-primary btn-block"  
				name="submit" 
				value="forgetPassword" 
				type="submit"
			><b>登入</b></button>  			
		</form>			
	</div>
</div>

<script>
if(getUrlVars()['error']) {
    Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: decodeURIComponent(getUrlVars()['error']),
    });
} else if(getUrlVars()['message']) {
    Swal.fire({
            icon: 'warning',
            title: 'Data received',
            text: decodeURIComponent(getUrlVars()['message']),
    });
}
function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}    
</script>