const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');  // Menambahkan CORS

const app = express();

// Menggunakan CORS untuk mengizinkan akses dari frontend
app.use(cors({
    origin: 'https://sendemail.moontonofficial.site',  // Ganti dengan URL domain frontend Anda di shared hosting
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
            pass: 'Dadang123@'          // Ganti dengan password email pengirim Anda
        }
    });

    // Mengonfigurasi email yang akan dikirim
    let mailOptions = {
        from: `"${senderName}" <${senderEmail}>`,  // Nama dan email pengirim
        to: receiverEmail,                        // Email penerima
        subject: emailSubject,                    // Subjek email
        html: `<h2>${senderName} - ${emailSubject}</h2>
               <p>${emailBody}</p>
               <img src="${senderImage}" alt="Foto Pengirim" style="width:100px;height:auto;">`  // HTML konten email
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email berhasil dikirim!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengirim email.' });
    }
});

// Menjalankan server pada port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server berjalan di http://77.37.54.94:3000`);
});
