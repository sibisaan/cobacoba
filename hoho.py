import smtplib
from email.mime.text import MIMEText

# Pengaturan email
sender = "donotreply@register-sc.mononton.com"  # Alamat email pengirim
receiver = "bahanstoree@gmail.com"  # Alamat email penerima
subject = "Test Email"
body = "This is a test email sent from Postfix SMTP server."

# Membuat pesan email
msg = MIMEText(body)
msg["From"] = sender
msg["To"] = receiver
msg["Subject"] = subject

# Pengaturan SMTP lokal
smtp_server = "localhost"  # Gunakan 'localhost' karena Postfix berjalan di server yang sama
smtp_port = 25  # Gunakan port SMTP lokal (port 25)

# Kirim email
try:
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.sendmail(sender, receiver, msg.as_string())
    print("Email berhasil dikirim!")
except Exception as e:
    print(f"Terjadi kesalahan: {e}")
