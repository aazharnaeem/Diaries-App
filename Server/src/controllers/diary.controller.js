const diary = require('../models').diary

module.exports = {
    getDiary(req, res) {
        const userId = req.params.id
        return diary
            .findAll({
                where: {
                    userId: userId
                }
            }).then(result => {
                if (result.length === 0) {
                    res.send('no diary exist')
                }
                else {
                    res.send(result)
                }
            })
            .catch(error => res.send(error))
    },
    creatDiary(req, res) {
        const userId = req.params.id
        const { title, isPrivate, content } = req.body
        console.log(req.body)
        return diary
            .create({
                title: title,
                content: content,
                isPrivate: isPrivate,
                userId: userId,
            })
            .then(result => res.send(result))
            .catch(error => res.send(error))
    },
    updateDiary(req, res) {
        const diaryId = req.params.id
        const { title, isPrivate, content } = req.body
        return diary.update({
            title: title,
            isPrivate: isPrivate,
            content: content,

        }, {
            where: {
                id: diaryId
            }
        })
            .then(result => res.send(result))
            .catch(error => res.send(error))
    },
    deleteDiary(req, res) {
        const diaryId = req.params.id
        return diary.destroy({
            where: { id: diaryId}
        })
            .then(result => res.send(status))
            .catch(error => res.send(error))
    }
}