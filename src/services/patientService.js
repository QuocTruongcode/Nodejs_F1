import { where } from 'sequelize';
import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing body"
                })
            } else {

                await emailService.senđimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    doctorName: data.nameDoctor,
                    timeType: data.timeType,
                    language: data.language,
                    redirectLink: "https://www.youtube.com/watch?v=asoNhXovTtk&list=RDasoNhXovTtk&start_radio=1",

                    stringDataTime: data.stringDataTime,
                })

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    default: {
                        email: data.email,
                        roleId: 'R3'
                    }
                });
                console.log("check data user booking: ", user[0])
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save infor booking succeed!",
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment
}