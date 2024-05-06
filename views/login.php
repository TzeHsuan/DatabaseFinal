<?php
require_once dirname(__FILE__)."/include/head.php";
require_once dirname(__FILE__)."/login_nav.php";
unset($_SESSION['login']);
unset($_SESSION['id']);
unset($_SESSION['name']);
?>

<div class="container-signin">
	<div class="wrapper">
		<form
			id="form"
			class="form"
			method="get"  
			action="/HW3_110705063/models/login_check.php" 
		>       
			<h3 class="form-heading">Login</h3>
			<div>
				<p class="label-txt"><b>請選擇身分</b></p>
				<select id="identity" name="identity">
					<option value="doctor">Doctor</option>
					<option value="patient">Patient</option>
				</select>
			</div>
			<div>
				<p class="label-txt"><b>請輸入使用者名稱</b></p>
				<input
					id="name"
					name="name" 
					type="text" 
					class="form-control" 
					placeholder="name" 
					required=""
				>
			</div>
			<div>
				<p class="label-txt"><b>請輸入密碼</b></p>
				<input
					id="password"
					name="password"  
					type="password" 
					class="form-control" 
					placeholder="Password" 
					required=""
				>     		 
			</div>
			<button 
				class="btn btn-lg btn-primary btn-block"  
				name="submit" 
				value="Login" 
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
