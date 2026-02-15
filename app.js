const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/book', (req, res) => {
    const { name, time } = req.query;
    res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <style>
                body { background: #1a1a1a; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .card { padding: 40px; border: 1px solid #d4a373; border-radius: 20px; background: rgba(255,255,255,0.05); text-align: center; }
                h1 { color: #d4a373; }
                .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #d4a373; color: #1a1a1a; text-decoration: none; border-radius: 5px; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>✅ تم الحجز بنجاح</h1>
                <p>منور يا ${name}، ميعادنا الساعة ${time}</p>
                <a href="/" class="btn">حجز آخر</a>
            </div>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server Ready!'));