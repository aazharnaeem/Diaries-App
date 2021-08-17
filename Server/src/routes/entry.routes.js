const { Router } = require('express')
const router = Router()

const entry = require('../controllers').entry

router.get('/:id', entry.getEntry)
router.post('/:id', entry.creatEntry)
router.put('/:id', entry.updateEntry)
router.delete('/:id', entry.deleteEntry)

module.exports = router