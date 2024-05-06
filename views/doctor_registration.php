<?php
require_once dirname(__FILE__) . "/include/head.php";
require_once dirname(__FILE__) . "/login_nav.php";
?>
<!--Name	Sex	Age	Dept	Password	ID	Email	PhoneNum(10)-->
<div class="container-register">
  <div class="wrapper">
    <form 
      id="form" 
      class="form"
      onsubmit="return false" 
      action="/HW3_110705063/models/doctor_registration_check.php"
    >    
      <h3 class="form-heading">Doctor register</h3>
      <div>
        <p class="label-txt"><b>請輸入姓名</b></p>
        <input 
          id="name" 
          type="text" 
					class="form-control"  
					placeholder="Name" 
          required=""
        >
      </div>
      <div>
        <p class="label-txt"><b>請輸入性別</b></p>
        <select id="sex">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div>
        <p class="label-txt"><b>請輸入生日</b></p>
        <input 
          id="birth" 
          type="date" 
          value="2018-07-22"
          min="2018-01-01"
          max="2018-12-31"
					class="form-control"  
					placeholder="ex:2002-12-26" 
          required=""
        >
      </div>
      <div>
        <p class="label-txt"><b>請輸入部門</b></p>
        <select id="dept">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div>
        <p class="label-txt"><b>請輸入身分證字號</b></p>
        <input 
          id="ID" 
          type="text" 
					class="form-control"  
					placeholder="ID" 
          pattern="[A-Z][0-9]{9}" 
          required=""
        >
      </div>
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
        <p class="label-txt"><b>請輸入電話號碼</b></p>
        <input 
          id="phonenum" 
          type="text" 
					class="form-control" 
					placeholder="ex:0123456789"
          pattern="[0-9]{10}" 
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
      name: $('#name').val(),
      sex: $('#sex').val(),
      birth: $('#birth').val(),
      dept: $('#dept').val(),
      ID: $('#ID').val(),
      email: $('#email').val(),
      phonenum: $('#phonenum').val(),
      password: md5($('#passwordInput').val()),
    };
    console.log(params)
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