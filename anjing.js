const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());  // Enable CORS untuk menerima request dari domain yang berbeda
app.use(bodyParser.json({ limit: '10mb' }));  // Menambah limit ukuran request

// Setup transporter Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dadangstoreegg@gmail.com',  // Ganti dengan email pengirim Anda
        pass: 'hzdv toub ewev zskz'  // Ganti dengan password atau app-specific password
    }
});

// Endpoint untuk mengirim email
app.post('/send-email', (req, res) => {
    const { receiverEmail, senderName, senderEmail, senderImage, emailSubject, emailBody } = req.body;

    // Membuat data untuk email
    const mailOptions = {
        from: `"${senderName}" <${senderEmail}>`,  // Nama dan email pengirim di-custom sesuai input
        to: receiverEmail,
        subject: emailSubject,
        html: `
            <p>Dear,</p>
            <p>${emailBody}</p>
            <p>Salam,</p>
            <p>${senderName}</p>
            <img src="data:image/jpeg;base64,${senderImage}" alt="Sender's Image" style="width:100px;height:100px;border-radius:50%;" />
        `
    };

    // Kirim email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send({ message: 'Gagal mengirim email', error });
        }
        console.log('Email sent: ' + info.response);
        return res.status(200).send({ message: 'Email berhasil dikirim', info });
    });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server running at http://77.37.54.94:${port}`);
});
