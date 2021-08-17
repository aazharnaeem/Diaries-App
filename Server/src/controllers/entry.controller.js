const entry= require('../models/').entry

module.exports = {
    getEntry(req, res) {
        const diaryId = req.params.id
        return entry
            .findAll({
                where: {
                    diaryId: diaryId
                }
            }).then(result => {
                if (result.length === 0) {
                    res.send('no entry exist')
                }
                else {
                    res.send(result)
                }
            })
            .catch(error => res.send(error))
    },
    creatEntry(req, res) {
        const diaryId = req.params.id
        const { title, content } = req.body
        return entry
            .create({
                title: title,
                content: content,
                diaryId: diaryId,
            })
            .then(result => res.send(result))
            .catch(error => res.send(error))
    },
    updateEntry(req, res) {
        const entryId = req.params.id
        const { title, content } = req.body
        return entry.update({
            title: title,
            content: content,

        }, {
            where: {
                id: entryId
            }
        })
            .then(result => res.send(result))
            .catch(error => res.send(error))
    },
    deleteEntry(req, res) {
        const entryId = req.params.id
        return entry.destroy({
            where: { id: entryId}
        })
            .then(result => res.send(status))
            .catch(error => res.send(error))
    }
}