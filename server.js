const express = require('express');
const app = express();
const port = 3000; //  หรือพอร์ตอื่นๆ ที่ต้องการ

//  กำหนดให้ Express ใช้ static files ในโฟลเดอร์ public
app.use(express.static('public'));

//  กำหนด route สำหรับหน้าแรก
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//  เริ่มต้น server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
