const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

const app = express();
const port = 3000;

// Set SendGrid API Key
sgMail.setApiKey('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');  // Ganti dengan API key yang valid

// Middleware
app.use(cors()); // Enable CORS untuk menerima request dari domain yang berbeda
app.use(bodyParser.json({ limit: '10mb' }));  // Menambah limit ukuran request

// Endpoint untuk mengirim email
app.post('/send-email', (req, res) => {
    const { receiverEmail, senderName, senderEmail, senderImage, emailSubject, emailBody } = req.body;

    // Membuat data untuk email
    const msg = {
        to: receiverEmail,
        from: {
            name: senderName || "Mobile Legends: Bang Bang",  // Nama pengirim (default jika tidak diisi)
            email: senderEmail || "donotreply@register-sc.moonton.com",  // Email pengirim (gunakan email Moonton)
        },
        subject: emailSubject,
        html: `
            <p>Dear,</p>
            <p>${emailBody}</p>
            <p>Salam,</p>
            <p>${senderName || "Mobile Legends: Bang Bang"}</p>
            <img src="data:image/jpeg;base64,${senderImage}" alt="Sender's Image" style="width:100px;height:100px;border-radius:50%;" />
        `
    };

    // Kirim email menggunakan SendGrid
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
            res.status(200).send({ message: 'Email berhasil dikirim!' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({ message: 'Terjadi kesalahan saat mengirim email.', error });
        });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server running at http://77.37.54.94:${port}`);
});
