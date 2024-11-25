const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');  // Menambahkan CORS untuk komunikasi dengan frontend

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

    // Mengonversi gambar base64 ke buffer untuk attachment
    const imageBuffer = Buffer.from(senderImage, 'base64');

    let mailOptions = {
        from: `"${senderName}" <${senderEmail}>`,
        to: receiverEmail,
        subject: emailSubject,
        html: `<h2>${senderName} - ${emailSubject}</h2>
               <p>${emailBody}</p>
               <img src="cid:senderImage" alt="Foto Pengirim" style="width:100px;height:auto;">`,
        attachments: [
            {
                filename: 'sender-image.jpg',
                content: imageBuffer,
                cid: 'senderImage',  // Menandai untuk digunakan dalam tag <img>
            },
        ],
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

// Menjalankan server pada port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://77.37.54.94:3000}`);
});
