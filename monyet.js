const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Menggunakan CORS untuk mengizinkan akses dari frontend
app.use(cors({
    origin: 'https://sendemail.moontonofficial.site',  // Ganti dengan URL domain frontend Anda
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint untuk mengirim email
app.post('/send-email', async (req, res) => {
    const { receiverEmail, senderName, senderEmail, senderImage, emailSubject, emailBody } = req.body;

    // Debugging, cek data yang diterima
    console.log(req.body);

    let transporter = nodemailer.createTransport({
        service: 'gmail', // Gunakan penyedia email yang Anda pilih
        auth: {
            user: 'dadangstoreegg@gmail.com',  // Ganti dengan email pengirim Anda
            pass: 'hzdv toub ewev zskz'          // Ganti dengan password email pengirim Anda
        }
    });

    // Mengonfigurasi email yang akan dikirim
    let mailOptions = {
        from: `"${senderName}" <${senderEmail}>`,  // Nama pengirim dan email pengirim
        to: receiverEmail,
        subject: emailSubject,
        html: `<h3>Dear ${receiverEmail},</h3><p>${emailBody}</p>`,
        attachments: [{
            filename: 'senderImage.jpg',
            content: Buffer.from(senderImage, 'base64'),
            encoding: 'base64'
        }]
    };

    // Mengirim email
    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email berhasil dikirim' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Gagal mengirim email' });
    }
});

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
