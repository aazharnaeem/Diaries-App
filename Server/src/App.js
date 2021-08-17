const express = require('express')
const cors = require('cors')
const models = require('./models')



const app = express()
app.use(cors())
app.use(express.json())


const { user, diary, entry } = require('./routes')

app.get('/', (req, res) => {
    res.send('welcome to Diaries API')
})



app.use('/user', user)
app.use('/diary', diary)
app.use('/entry', entry)


models.sequelize.sync().then(() => {
    console.log('database connected')
})
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`server running on ${PORT}`))
