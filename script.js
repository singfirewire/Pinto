// script.js

const submitButton = document.getElementById('submit');
const feelingInput = document.getElementById('feeling');
const wordCloud = document.querySelector('.word-cloud');
const categorySelect = document.getElementById('category');

//  เก็บข้อมูลความรู้สึก
let feelings = {}; 

submitButton.addEventListener('click', () => {
  const feeling = feelingInput.value.trim();
  const category = categorySelect.value;

  if (feeling !== "") {
    //  เพิ่มความรู้สึกใน object  
    if (feelings[feeling]) {
      feelings[feeling]++; 
    } else {
      feelings[feeling] = 1;
    }

    //  อัพเดท word cloud
    updateWordCloud(category); 

    feelingInput.value = ""; 
  }
});

function updateWordCloud(category) {
  wordCloud.innerHTML = ""; 

  for (const word in feelings) {
    if (category === "all" || 
        (category === "positive" && isPositiveWord(word)) ||
        (category === "negative" && isNegativeWord(word)) ||
        (category === "neutral" && isNeutralWord(word))) {
      const wordElement = document.createElement('div');
      wordElement.classList.add('word');
      wordElement.textContent = word;

      //  กำหนดขนาดตัวอักษรตามความนิยม
      if (feelings[word] >= 10) {
        wordElement.classList.add('very-popular');
      } else if (feelings[word] >= 5) {
        wordElement.classList.add('popular');
      }

      wordCloud.appendChild(wordElement);
    }
  }
}

//  ฟังก์ชันตรวจสอบประเภทของคำ (ตัวอย่าง)
function isPositiveWord(word) {
  const positiveWords = ["สนุก", "ดี", "ชอบ", "เข้าใจ"]; 
  return positiveWords.includes(word);
}

function isNegativeWord(word) {
  const negativeWords = ["เบื่อ", "ง่วง", "ยาก"];
  return negativeWords.includes(word);
}

function isNeutralWord(word) {
  //  กำหนดเงื่อนไขสำหรับคำกลางๆ
  return !isPositiveWord(word) && !isNegativeWord(word); 
}
