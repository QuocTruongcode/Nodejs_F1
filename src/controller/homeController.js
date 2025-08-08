import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }


}

let getAbout = (req, res) => {
    return res.render('test/aboutMe.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body);
    return res.send('Your information was posted in server');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('-------------------------------------------------------------------');
    console.log(data);
    console.log('-------------------------------------------------------------------');
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
}