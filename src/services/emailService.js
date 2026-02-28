require('dotenv').config();
import nodemailer from 'nodemailer';

let senđimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use true for port 465, false for port 587
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"Pen game website" <nguyenquoctruong110605@gmail.com>',
        to: dataSend.reciverEmail,
        subject: "Thông tin đặt lịch khám bệnh!!!",

        html: `
            <h3> Xin chào ${dataSend.patientName} </h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Web pen game </p>
            <p>Thông tin đặt lịch khám bệnh: </p>
            <div><b>${dataSend.doctorName} <b> <div>
            <div><b>${dataSend.timeType} </b> </div>
            <p>Nếu thông tin trên là chính xác, vui lòng ấn xác nhận để hoàn tất đặt lịch</p>
            <div>
                <a href= ${dataSend.redirectLink} target="_blank"> Xác nhận </a>
            </div>
        `, // HTML version of the message
    });
}

module.exports = {
    senđimpleEmail: senđimpleEmail
}