const user = require('../models').user

const Op = require('sequelize').Op
module.exports = {
    Signup(req, res) {
        const { username, email, password } = req.body;
        const exuser = user.findAll({
            where: {
                username: username
            }
        }).then(result => {
            if (Object.keys(result).length === 0) {
                user.create({
                    username: username,
                    password: password,
                    email: email,
                })
                    .then(user => res.status(201).send(user))
                    .catch(error => res.status(400).send(error))
            }
            else {
                res.send('user exixts')
            }
        });
    },
    Login(req, res) {
        const { username, password } = req.body
        return user
            .findOne({
                where: {
                    [Op.and]: [
                        { username: username },
                        { password: password }
                    ]
                }
            })
            .then(result => {
                if (!result) {
                    res.send('no such user')
                }
                else {
                    res.send(result)
                }
            }).catch(error => res.send(error))
    }
}