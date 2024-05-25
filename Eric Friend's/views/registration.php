<?php
require_once dirname(__FILE__) . "/include/head.php";
require_once dirname(__FILE__) . "/login_nav.php";
?>

<div class="container-register">
  <div class="wrapper">
    <form 
      id="form" 
      class="form"
      onsubmit="return false" 
      action="/HW3_110705063/models/registration_check.php"
    >    
      <h3 class="form-heading">Register</h3>
      <div>
        <p class="label-txt"><b>請輸入EMAIL</b></p>
        <input 
          id="email" 
          type="email" 
					class="form-control" 
					placeholder="Email"  
          required=""
        >
      </div>
      <div>
        <p class="label-txt"><b>請輸入使用者名稱</b></p>
        <input 
          id="username" 
          type="text" 
					class="form-control"  
					placeholder="Username" 
          required=""
        >
      </div>
      <div>
        <p class="label-txt"><b>請輸入密碼</b></p>
        <input 
          id="passwordInput" 
          type="password" 
					class="form-control"  
					placeholder="Password" 
          required=""
        >
    </div>
      <div>
        <p class="label-txt"><b>再確認一次密碼</b></p>
        <input 
          id="passwordConfirm" 
          type="password" 
					class="form-control"  
					placeholder="Reassure password" 
          autocomplete="Off" 
          required=""
        >
      </div>
      <button>submit</button>
    </form>
  </div>
</div>

<script>
$("#form").submit(function(e) {
  if ($("#passwordInput").val() !== $("#passwordConfirm").val()) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: '請再確認一次密碼',
    });
    return;
  } else {
    var params = {
      email: $('#email').val(),
      username: $('#username').val(),
      password: md5($('#passwordInput').val()),
    };
    var query = jQuery.param(params);
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
      type: "POST",
      url: url + '?' + query,
      success: function(data) {
        if (data.includes('已註冊過')) {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            html:data,
          });
        }
        if (data.includes('資料新增成功')) {
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: '資料新增成功',
            allowOutsideClick: false,
            showCancelButton: false,
          }).then((result) => {
            if (result.value) {
              window.location = '/HW3_110705063/views/index.php'
            }
          })
        }
      }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.
  }
});
</script>


<style>
</style>