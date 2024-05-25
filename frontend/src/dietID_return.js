// 我們只有三個營養師，Diet_ID分別為 1,2,3
// 所以只需要製作三個營養師的選項，每個營養師在被點擊之後會分別回傳 1,2,3
// 回傳的值會回傳到 diet_choose.php 裡的 $diet_id = $_POST['diet_id']

document.getElementById('yourButtonId').addEventListener('click', function() {
    // 假設 '1' 是我想要回傳的值
    fetch('diet_choose.php', {
      method: 'POST',
      body: JSON.stringify({ diet_id: 1 })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Log the response from the PHP file
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  