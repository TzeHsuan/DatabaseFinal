<ul 
  class="nav justify-content-end" 
>
  <button 
    class="btn-outline-dark btn" 
    onclick="window.location = '/HW3_110705063/views/doctor_registration.php'"
  >
    <b>醫師註冊</b>
  </button>
  <button 
    class="btn-outline-dark btn" 
    onclick="window.location = '/HW3_110705063/views/patient_registration.php'"
  >
    <b>病人註冊</b>
  </button>
  <button 
    class="btn-outline-dark btn" 
    onclick="window.location = '/HW3_110705063/views/login.php'"
  >
    <b>登入</b>
  </button>
  <button 
    class="btn-outline-dark btn" 
    onclick="window.location = '/HW3_110705063/views/index.php'"
  >
    <b>返回</b>
  </button>
  <button 
    class="btn-outline-dark btn" 
    onclick="window.location = '/HW3_110705063/views/changePassword.php'"
  >
    <b>修改密碼</b>
  </button>
</ul>

<style>
  ul {
    background-color: darkgray;
    display:flex;
    flex-direction:row;

    width: 90%;
    height: 60px;
    margin: 0 auto;

    position: relative;
  }
  ul > button {
    margin: 1% auto;
    width: 20%;
    height: 100%;

    background-color: darkslategray;

    font-size: 20px;
    font-weight: bold;
    color:white;
    text-decoration: none;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
    
    transition: all 1s ease;
  }
  ul > button:disabled {
    color: darkgray
  }
</style>