let endTime;
let interval;
let meetingTimes = [];
let timeoutId;

// ฟังก์ชันโหลดเวลาจาก Local Storage
function loadSavedTime() {
    const savedTime = localStorage.getItem('endTime');
    if (savedTime) {
        endTime = new Date(savedTime);
        startCountdown();
    }
}

// ฟังก์ชันเริ่มนับถอยหลัง
function startCountdown() {
    const days = parseInt(document.getElementById('days').value);
    const now = new Date();

    meetingTimes = []; // รีเซ็ตช่วงเวลาประชุม

    if (days === 1) {
        const endTimeDay1 = document.getElementById('end-time-day1').value;
        if (!endTimeDay1) {
            alert("กรุณาระบุเวลาเลิกประชุม (วันที่ 1)");
            return;
        }
        const [hours, minutes] = endTimeDay1.split(':');
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        meetingTimes.push({ start: now, end });
    } else if (days === 2) {
        const endTimeDay1 = document.getElementById('end-time-day1').value;
        const startTimeDay2 = document.getElementById('start-time-day2').value;
        const endTimeDay2 = document.getElementById('end-time-day2').value;
        if (!endTimeDay1 || !startTimeDay2 || !endTimeDay2) {
            alert("กรุณาระบุเวลาเลิกประชุม (วันที่ 1) และเวลาเริ่มและเลิกประชุม (วันที่ 2)");
            return;
        }
        const [hours1, minutes1] = endTimeDay1.split(':');
        const [startHours2, startMinutes2] = startTimeDay2.split(':');
        const [endHours2, endMinutes2] = endTimeDay2.split(':');
        const endDay1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours1, minutes1);
        const startDay2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, startHours2, startMinutes2);
        const endDay2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, endHours2, endMinutes2);
        meetingTimes.push({ start: now, end: endDay1 });
        meetingTimes.push({ start: startDay2, end: endDay2 });
    } else if (days === 3) {
        const endTimeDay1 = document.getElementById('end-time-day1').value;
        const startTimeDay2 = document.getElementById('start-time-day2').value;
        const endTimeDay2 = document.getElementById('end-time-day2').value;
        const startTimeDay3 = document.getElementById('start-time-day3').value;
        const endTimeDay3 = document.getElementById('end-time-day3').value;
        if (!endTimeDay1 || !startTimeDay2 || !endTimeDay2 || !startTimeDay3 || !endTimeDay3) {
            alert("กรุณาระบุเวลาเลิกประชุม (วันที่ 1), เวลาเริ่มและเลิกประชุม (วันที่ 2), และเวลาเริ่มและเลิกประชุม (วันที่ 3)");
            return;
        }
        const [hours1, minutes1] = endTimeDay1.split(':');
        const [startHours2, startMinutes2] = startTimeDay2.split(':');
        const [endHours2, endMinutes2] = endTimeDay2.split(':');
        const [startHours3, startMinutes3] = startTimeDay3.split(':');
        const [endHours3, endMinutes3] = endTimeDay3.split(':');
        const endDay1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours1, minutes1);
        const startDay2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, startHours2, startMinutes2);
        const endDay2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, endHours2, endMinutes2);
        const startDay3 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, startHours3, startMinutes3);
        const endDay3 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, endHours3, endMinutes3);
        meetingTimes.push({ start: now, end: endDay1 });
        meetingTimes.push({ start: startDay2, end: endDay2 });
        meetingTimes.push({ start: startDay3, end: endDay3 });
    }

    if (meetingTimes.length === 0) {
        alert("กรุณาระบุเวลาประชุม");
        return;
    }

    // บันทึกเวลาลง Local Storage
    localStorage.setItem('endTime', meetingTimes[meetingTimes.length - 1].end.toISOString());

    clearInterval(interval); // เคลียร์ interval เดิม (ถ้ามี)
    interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // เรียกใช้ฟังก์ชันครั้งแรกเพื่อไม่ให้มีดีเลย์
}

// ฟังก์ชันอัปเดตการนับถอยหลัง
function updateCountdown() {
    const now = new Date();
    let totalRemainingTime = 0;

    // คำนวณเวลาที่เหลือในแต่ละช่วงเวลาประชุม
    for (const meeting of meetingTimes) {
        if (now < meeting.start) {
            totalRemainingTime += meeting.end - meeting.start;
        } else if (now >= meeting.start && now <= meeting.end) {
            totalRemainingTime += meeting.end - now;
        }
    }

    // เปลี่ยนสีพื้นหลังเมื่อเหลือ 5 นาทีสุดท้ายหรือหมดเวลา
    if (totalRemainingTime <= 0) {
        document.body.className = "time-up"; // กระพริบเมื่อเวลาติดลบ
    } else if (totalRemainingTime <= 5 * 60 * 1000) { // 5 นาทีสุดท้าย
        document.body.className = "alert";
    } else {
        document.body.className = "";
    }

    // แสดงผลเวลาที่ติดลบถ้าเกินเวลา
    const sign = totalRemainingTime < 0 ? "-" : "";

    // คำนวณเวลาที่เหลือ (หรือเกินเวลา)
    const totalTime = Math.abs(totalRemainingTime);
    const hours = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

    // แสดงผลเวลาในรูปแบบ HH:MM:SS หรือ MM:SS
    if (totalTime <= 60 * 60 * 1000) {
        document.getElementById('countdown').innerText = 
            `${sign}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.getElementById('countdown').classList.add('large'); // เพิ่มคลาส large
    } else {
        document.getElementById('countdown').innerText = 
            `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.getElementById('countdown').classList.remove('large'); // ลบคลาส large
    }
}

// ฟังก์ชันซ่อนเมนู
function hideMenu() {
    document.getElementById('input-container').style.opacity = '0';
    document.getElementById('footer').style.opacity = '0';
}

// ฟังก์ชันแสดงเมนู
function showMenu() {
    document.getElementById('input-container').style.opacity = '1';
    document.getElementById('footer').style.opacity = '1';
    clearTimeout(timeoutId);
    timeoutId = setTimeout(hideMenu, 3000); // ซ่อนเมนูหลังจาก 3 วินาที
}

// ฟังก์ชันติดตามการเคลื่อนไหวของเมาส์
document.addEventListener('mousemove', showMenu);

// เปิดลิงก์ Shopee Affiliate ในแท็บใหม่เมื่อหน้าเว็บโหลด
window.onload = function() {
    window.open("https://s.shopee.co.th/9f4nrovoPz", "_blank"); // เปิดลิงก์ Shopee Affiliate
    loadSavedTime(); // โหลดเวลาที่บันทึกไว้
    timeoutId = setTimeout(hideMenu, 3000); // ซ่อนเมนูหลังจาก 3 วินาที
};

// แสดง/ซ่อนฟิลด์ตามจำนวนวันที่เลือก
document.getElementById('days').addEventListener('change', function() {
    const days = parseInt(this.value);
    document.getElementById('day1').style.display = 'block';
    document.getElementById('day2').style.display = days >= 2 ? 'block' : 'none';
    document.getElementById('day3').style.display = days >= 3 ? 'block' : 'none';
});
