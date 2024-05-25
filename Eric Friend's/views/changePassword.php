<?php
require_once dirname(__FILE__)."/include/head.php";
require_once dirname(__FILE__)."/login_nav.php";
?>

<div class="container-changePassword">
  <div class="wrapper">
    <form 
      id="form" 
      class="form"
      onsubmit="return false"
      method="get"
      action="/HW3_110705063/models/changePassword_check.php"
    >  
			<h3 class="form-heading">Change password</h3>
      <div>
        <p class="label-txt"><b>請輸入原始密碼</b></p>
        <input 
          id="oldPassword" 
          type="password" 
					class="form-control" 
          placeholder="Old password"
          required=""
        >
      </div>
      <div>
        <p class="label-txt"><b>請輸入新密碼</b></p>
        <input 
          id="newPassword" 
          type="password" 
					class="form-control" 
          placeholder="New password"
          required=""
        >
      </div>
      <div>
        <p class="label-txt"><b>請確認新密碼</b></p>
        <input 
          id="newPasswordConfirm" 
          type="password" 
					class="form-control" 
          placeholder="New password"
          required=""
        >
      </div>
      
      <button>submit</button>
      
    </form>
  </div>
  
</div>

<script>
$("#form").submit(function(e) {
  if ($("#newPassword").val() !== $("#newPasswordConfirm").val()) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: '請再確認一次密碼',
    });
    return;
  } else {
    var params = {
        oldPassword: md5($('#oldPassword').val()),
        newPassword: md5($('#newPassword').val()),
    };
    var query = jQuery.param(params);
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
      type: "POST",
      url: url + '?' + query,
        success: function(data) {
            if (data.includes('錯誤')) {
                Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                html:data,
                });
            }
            if (data.includes('修改成功')) {
                Swal.fire({
                icon: 'success',
                title: 'OK',
                text: '資料修改成功',
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