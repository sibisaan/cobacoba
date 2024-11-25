const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

// Set up SMTP with Hostinger or SMTP server you use
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',  // SMTP server Hostinger
    port: 587,  // Port untuk TLS
    secure: false,  // Gunakan TLS (false untuk port 587)
    auth: {
        user: 'testing@sendemail.moontonofficial.site',  // Ganti dengan alamat email pengirim Anda
        pass: 'Memek7656@'  // Ganti dengan password email Anda
    }
});

// Middleware
app.use(cors());  // Enable CORS untuk menerima request dari domain yang berbeda
app.use(bodyParser.json({ limit: '10mb' }));  // Menambah limit ukuran request

// Endpoint untuk mengirim email
app.post('/send-email', (req, res) => {
    const { receiverEmail, senderName, senderEmail, emailSubject, emailBody } = req.body;

    // Membuat data untuk email
    const mailOptions = {
        from: `"${senderName || 'Mobile Legends: Bang Bang'}" <${senderEmail || 'testing@sendemail.moontonofficial.site'}>`,  // Nama pengirim dan email pengirim yang di-custom
        to: receiverEmail,  // Penerima email
        subject: emailSubject,  // Subjek email
        html: `<p>${emailBody}</p>`  // Isi email dalam format HTML
    };

    // Kirim email menggunakan Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: 'Gagal mengirim email', error });
        }
        console.log('Email sent: ' + info.response);
        return res.status(200).send({ message: 'Email berhasil dikirim' });
    });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server running at http://77.37.54.94:${port}`);
});
