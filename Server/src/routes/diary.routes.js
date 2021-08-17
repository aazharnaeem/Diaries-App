const { Router } = require('express')
const router = Router()

const diary = require('../controllers').diary

router.get('/get/:id', diary.getDiary)
router.post('/add/:id', diary.creatDiary)
router.put('/update/:id', diary.updateDiary)
router.delete('/:id', diary.deleteDiary)

module.exports = router