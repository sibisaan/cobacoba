const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');  // Menambahkan CORS

const app = express();

// Menggunakan CORS untuk mengizinkan akses dari frontend
app.use(cors({
    origin: 'http://sendemail.moontonofficial.site',  // Ganti dengan URL domain frontend Anda
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

    let mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: emailSubject,
        text: emailBody,
        html: `<p>${emailBody}</p>`,
        attachments: [{
            filename: 'sender_image.jpg',
            content: senderImage,
            encoding: 'base64'
        }]
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email berhasil dikirim!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengirim email.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://77.37.54.94:3000`);
});
