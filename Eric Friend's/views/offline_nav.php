<a href="#user" style="width:6%;">
    <img src="../src/images/user-icon.png" style="
        height:100%;
        aspect-ratio: 1 / 1;
        border-radius: 50%;" alt="me again">
</a>
<div class="dropdown" style="width:6%;">
    <a class="dropbtn" style="width:100%"
        onclick="
        var offline = document.getElementById('offline');
        if (offline.style.display === 'flex') {
            offline.style.display = 'none';
        } else {
            offline.style.display = 'flex';
        }">
        <img src="..src/images/user-nav.png" style="
            width:100%;
            height:100%;">
    </a>
    <div id='offline' style="
        height:100%;
        display:flex;
        flex-direction:column;
    ">
        <button id='login' class='btn' style="
        background-color: darkgray;
        color: white;
        width:100%;
        margin: 0 auto;"
        onclick='
            window.location = "/HW3_110705063/views/login.php"
        '><b>登入</b></button>
        <button id='register' class='btn' style="
        background-color: darkgray;
        border-color: black;
        color: white;
        width:100%;
        margin: 0 auto;"
        onclick="
            window.location = '/HW3_110705063/views/doctor_registration.php'
        "><b>醫師註冊</b></button>
        <button id='register' class='btn' style="
        background-color: darkgray;
        border-color: black;
        color: white;
        width:100%;
        margin: 0 auto;"
        onclick="
            window.location = '/HW3_110705063/views/patient_registration.php'
        "><b>病人註冊</b></button>
    </div>
</div>