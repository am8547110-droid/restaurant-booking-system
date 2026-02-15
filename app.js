const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const dataFile = './appointments.json';
let appointments = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/book', (req, res) => {
    const { name, time } = req.query;
    if (name && time) {
        appointments.push({ name, time, date: new Date().toLocaleString('ar-EG') });
        fs.writeFileSync(dataFile, JSON.stringify(appointments, null, 2));
    }
    res.send('<h1 dir="rtl">تم الحجز!</h1><a href="/admin">روح شوف الجدول</a>');
});

// صفحة المدير مع زرار المسح
app.get('/admin', (req, res) => {
    let rows = appointments.map((a, index) => `
        <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding:10px;">${a.name}</td>
            <td style="padding:10px;">${a.time}</td>
            <td style="padding:10px;">${a.date}</td>
            <td style="padding:10px;"><a href="/delete?id=${index}" style="color:red; font-weight:bold; text-decoration:none;">❌ حذف</a></td>
        </tr>`).join('');

    res.send(`
        <body dir="rtl" style="font-family:Arial; padding:40px; background:#f4f4f4;">
            <div style="background:white; padding:20px; border-radius:10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <h2 style="text-align:center;">📋 إدارة الحجوزات</h2>
                <table style="width:100%; border-collapse:collapse; text-align:center;">
                    <tr style="background:#333; color:white;">
                        <th style="padding:10px;">الاسم</th>
                        <th style="padding:10px;">الوقت</th>
                        <th style="padding:10px;">التاريخ</th>
                        <th style="padding:10px;">تحكم</th>
                    </tr>
                    ${rows.length > 0 ? rows : '<tr><td colspan="4">مفيش حجوزات يا ريس</td></tr>'}
                </table>
                <br><a href="/" style="display:block; text-align:center;">إضافة حجز جديد</a>
            </div>
        </body>
    `);
});

// كود المسح الفعلي
app.get('/delete', (req, res) => {
    const id = req.query.id;
    if (id !== undefined) {
        appointments.splice(id, 1); // شيل الحجز من القائمة
        fs.writeFileSync(dataFile, JSON.stringify(appointments, null, 2)); // حدث الملف
    }
    res.redirect('/admin'); // ارجع للجدول هتلاقيه اتمسح
});

app.listen(3000, () => console.log('🚀 السيرفر شغال وزرار المسح جاهز!'));