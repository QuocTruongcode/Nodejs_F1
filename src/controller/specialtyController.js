import specialtyServer from "../services/specialtyServer";

let postDetailSpecialties = async (req, res) => {
    try {
        let infor = await specialtyServer.postDetailSpecialties(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server",
        });
    }
};

let getDetailSpecialties = async (req, res) => {
    try {
        let data = await specialtyServer.getDetailSpecialties()
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getOneDetailSpecialties = async (req, res) => {
    try {
        let data = await specialtyServer.getOneDetailSpecialties(req.query.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    postDetailSpecialties: postDetailSpecialties,
    getDetailSpecialties: getDetailSpecialties,
    getOneDetailSpecialties: getOneDetailSpecialties
};