const nodemailer = require('nodemailer');

// Membuat transporter menggunakan Gmail SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dadangstoreegg@gmail.com',  // Ganti dengan alamat email Anda
        pass: 'Dadang123@'                 // Ganti dengan password email Anda
    }
});

// Opsi email
let mailOptions = {
    from: 'donotreply@moonton.com',  // Alamat email pengirim
    to: 'donebank2000@gmail.com',    // Alamat email penerima
    subject: 'Test Email',
    text: 'This is a test email.'    // Isi email
};

// Kirim email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
