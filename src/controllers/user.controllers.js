const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const user = await User.findAll();
    return res.json(user)
});

const create = catchError(async(req, res) => {
    const { first_name, last_name, email, password, birthday } = req.body;
    const newBody = { first_name, last_name, email, password, birthday };
    const user = await User.create(newBody);
    return res.json(user).status(201);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if(!user) res.sendStatus(404);
    return res.json(user);
});

const destroy = catchError(async(req, res) =>{
    const { id } = req.params;
    const user = await User.destroy(
        {where: {id}} // {where: {id:id}} -> lo mismo paro acortado
    );
    if(!user) res.sendStatus(404);
    return res.send("User Deleted").status(204);
});

const update = catchError(async(req, res) =>{
    const { id } = req. params;
    const { first_name, last_name, email, birthday } = req.body;
    const newBody = { first_name, last_name, email, birthday };
    const user = await User.findByPk(id);
    if(!user) return res.sendStatus(404);
    const userUpdate =  await User.update(
        newBody, 
        {where:{id}, returning: true}
    );
    return res.json(userUpdate[1][0]);
})

module.exports = {
    getAll,
    create, 
    getOne, 
    destroy, 
    update
}