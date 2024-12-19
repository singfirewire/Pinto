/*  ปรับแต่ง CSS ให้สวยงามตามต้องการ  เช่น */
body {
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
}

.container {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.word-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.word {
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  font-size: 16px;
  transition: font-size 0.3s ease; /* เพิ่ม transition */
}

.word.popular { 
  font-size: 24px;
}

.word.very-popular { 
  font-size: 36px;
}

/*  Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 20px;
  }

  .word {
    font-size: 14px;
  }

  .word.popular { 
    font-size: 18px;
  }

  .word.very-popular { 
    font-size: 24px;
  }
}
