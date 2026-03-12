import { where } from 'sequelize';
import db from '../models/index';
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';
import { defaults } from 'lodash';

let buildUrlEmail = (token, doctorId) => {
    return `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing body"
                })
            } else {
                let token = uuidv4();

                await emailService.sendimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    doctorName: data.nameDoctor,
                    timeType: data.timeType,
                    language: data.language,
                    redirectLink: buildUrlEmail(token, data.doctorId),

                    stringDataTime: data.stringDataTime,
                })

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
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
                            timeType: data.timeType,
                            token: token,
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

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId && !data.token) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing body"
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();

                    resolve({
                        errCode: 0,
                        errMessage: "Verify schedule booking succeed!",
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Do not find information schedule!",
                    })
                }

            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}