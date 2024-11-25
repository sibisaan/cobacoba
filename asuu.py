import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Email setup
sender_email = "your-email@example.com"
receiver_email = "recipient@example.com"
subject = "Test Email"
body = "This is a test email sent through SendGrid SMTP relay!"

# Create message
msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = subject
msg.attach(MIMEText(body, 'plain'))

# SMTP server setup
server = smtplib.SMTP('smtp.sendgrid.net', 587)
server.starttls()
server.login("apikey", "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")  # Gunakan 'apikey' sebagai username dan API key Anda sebagai password

# Send email
server.sendmail(sender_email, receiver_email, msg.as_string())
server.quit()

print("Email sent successfully!")
