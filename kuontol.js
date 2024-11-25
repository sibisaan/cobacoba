const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');  // Menambahkan CORS

const app = express();

// Menggunakan CORS untuk mengizinkan akses dari frontend
app.use(cors({
    origin: '*',  // Ganti dengan URL domain frontend Anda jika sudah diketahui
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Menambah batas ukuran payload menjadi 10MB
app.use(bodyParser.json({ limit: '10mb' }));  // Meningkatkan limit dari default (100kb) menjadi 10MB
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // Jika mengirim data dengan URLencoded

// Endpoint untuk mengirim email
app.post('/send-email', async (req, res) => {
    const { receiverEmail, senderName, senderEmail, senderImage, emailSubject, emailBody } = req.body;

    console.log('Data yang diterima:', req.body);  // Debugging

    let transporter = nodemailer.createTransport({
        service: 'gmail',
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
                cid: 'senderImage',  // Menyertakan ID CID untuk gambar
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

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
