import { where } from 'sequelize';
import db from '../models/index';
require('dotenv').config();

let postDetailSpecialties = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.description || !data.contentMarkdown || !data.contentHTML || !data.avatar || !data.nameSepcialties) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing body"
                })
            } else {

                await db.Specialty.upsert({
                    description: data.description,
                    image: data.avatar,
                    name: data.nameSepcialties,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    id: data.id
                })
                resolve({
                    errCode: 0,
                    errMessage: "Save infor specialties success"
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}

let getDetailSpecialties = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({
                attributes: ['id', 'name']
            });

            resolve({
                errCode: 0,
                errMessage: "Get infor specialties success!",
                data: data
            });




        } catch (e) {
            reject(e);
        }
    })
}

let getOneDetailSpecialties = async (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing body"
                })
            } else {
                let data = await db.Specialty.findOne(
                    {
                        where: { id: inputId }
                    }
                );

                resolve({
                    errCode: 0,
                    errMessage: "Get infor specialties success!",
                    data: data
                });
            }





        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postDetailSpecialties: postDetailSpecialties,
    getDetailSpecialties: getDetailSpecialties,
    getOneDetailSpecialties: getOneDetailSpecialties,
}