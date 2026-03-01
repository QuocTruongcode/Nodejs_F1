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
        subject: headerlEmail(dataSend),

        html: bodyHtmlEmail(dataSend)
    });
}

let bodyHtmlEmail = (dataSend) => {
    let result;
    if (dataSend.language === 'vi') {
        result = `
            <h3> Xin chào ${dataSend.patientName} </h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Web pen game </p>
            <p>Thông tin đặt lịch khám bệnh: </p>
            <div><b>Tên bác sĩ: ${dataSend.doctorName} <b> <div>
            <div><b>Thời gian: ${dataSend.stringDataTime} </b> </div>
            <p>Nếu thông tin trên là chính xác, vui lòng ấn xác nhận để hoàn tất đặt lịch</p>
            <div>
                <a href= ${dataSend.redirectLink} target="_blank"> Xác nhận </a>
            </div>
        `
    }
    if (dataSend.language === 'en') {
        result = `
            <h3> Hello ${dataSend.patientName} </h3>
            <p>You received this email because you scheduled an online appointment via Web pen game. </p>
            <p>Appointment scheduling information: </p>
            <div><b>Doctor fullname: ${dataSend.doctorName} <b> <div>
            <div><b>Time: ${dataSend.stringDataTime} </b> </div>
            <p>If the information above is correct, please press confirm to complete the booking.</p>
            <div>
                <a href= ${dataSend.redirectLink} target="_blank"> Confirm </a>
            </div>
        `
    }
    return result;
}

let headerlEmail = (dataSend) => {
    let result;
    if (dataSend.language === 'vi') {
        result = "Thông tin đặt lịch khám bệnh"


    }
    if (dataSend.language === 'en') {
        result = "Appointment scheduling information"
    }
    return result;
}


module.exports = {
    senđimpleEmail: senđimpleEmail
}