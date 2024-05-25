<a href="#user" style="width:6%;">
    <img src="../src/images/myhead.jpg" style="
        height:100%;
        aspect-ratio: 1 / 1;
        border-radius: 50%;" alt="me again">
</a>
<div class="dropdown" style="width:6%;">
    <a class="dropbtn" style="width:100%"
        onclick="
        var online = document.getElementById('online');
        if (online.style.display === 'flex') {
            online.style.display = 'none';
        } else {
            online.style.display = 'flex';
        }">
        <img src="..src/images/user-nav.png" style="
            width:100%;
            height:100%;">
    </a>
    <div id='online' style="
        height:100%;
        display:none;
        flex-direction:column;
    ">
        <button id='logout' class='btn' style="
        background-color: darkgray;
        color: white;
        width:100%;
        margin: 0 auto;" 
        onclick="
            Swal.fire({
            icon: 'warning',
            title: 'warning',
            text: '確定要登出嗎?',
            showCancelButton: true,
            }).then((result) => {
            if (result.value) {
                window.location = '/HW3_110705063/views/logout.php'
            }
            })"
        ><b>登出</b></button>
        <button id='changePassword' class='btn' style="
        background-color: darkgray;
        border-color: black;
        color: white;
        width:100%;
        margin: 0 auto;"
        onclick='
            window.location = "/HW3_110705063/views/changePassword.php"
        '><b>修改密碼</b></button>
    </div>
</div>
