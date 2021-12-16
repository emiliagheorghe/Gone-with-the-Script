const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'GoneWithTheScript.db'
})

sequelize.authenticate()
    .then(() => { console.warn('we are connected!!!') })
    .catch((error) => {
        console.warn(error)
    })

const User = sequelize.define('user', {
    //1.	id utilizator – unic, autogenerate
    //2.	user name - unic
    //3.	data creare cont – timestamp automat

    userName:
    {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('userName', value.toLowerCase())
        }
    },

    firstName:
    {
        type: Sequelize.STRING(20),
        allowNull: false,
        set(value) {
            this.setDataValue('firstName', value.toLowerCase())
        }
    },

    lastName:
    {
        type: Sequelize.STRING(20),
        allowNull: false,
        set(value) {
            this.setDataValue('lastName', value.toLowerCase())
        }
    }

})

const Feedback = sequelize.define('feedback', {
    //1.	id experienta – unic, autogenerate
    //2.	id utilizator ref baza de date utilizatori
    //3.	data adaugare experienta – timestamp automat
    //4.	Punct plecare
    //5.	Punct sosire
    //6.	Mijloc de transport folosit: bus, metro, tram, etc
    //7.	Ora plecare
    //8.	Durata Calatoriei
    //9.	Grad de aglomerare
    //10.	Observatii
    //11.	Nivel de satisfactie

    start:
    {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('start', value.toLowerCase())
        }
    },

    end:
    {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('end', value.toLowerCase())
        }
    },

    vehicle:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    hourOfDeparture:
    {
        type: Sequelize.DATE,
        allowNull: false
    },

    duration:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    congestionLevel:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    details:
    {
        type: Sequelize.TEXT,
    },

    happinessLevel:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})

User.hasMany(Feedback)

const app = express()
app.use(bodyParser.json())

//
// app.get('/sync', async (req, res) =>{
//     try{
//         await sequelize.sync({ force: true })
//         res.status(201).json({message: 'tables created?'})
//     } catch (error) {
//         console.warn(error)
//         res.status(500).json({ message: 'server error'})
//     }
// })

//
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll( )
        res.status(200).json(users)
    } catch (error) {
        console.warn(error)
    }
})
app.post('/users', async (req, res) => {
    try {
        await User.create(req.body)
        res.status(201).json({message: 'user created'})
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})

//
app.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if(user){
            res.status(201).json(user)
        }else{
            res.status(404).json({message: 'user not found'})
        }
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})
app.put('/users/:userId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if(user){
            await user.update(req.body, { fields: ['start', 'end', 'firstName'] })
            res.status(202).json({ message: 'accepted' })
        }else{
            res.status(404).json({message: 'user not found'})
        }
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})
app.delete('/users/:userId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if(user){
            await user.destroy()
            res.status(202).json({ message: 'accepted' })
        }else{
            res.status(404).json({message: 'user not found'})
        }
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})

// FEEDBACKS

app.get('/feedbacks', async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll()
        res.status(200).json(feedbacks)
    } catch (error) {
        console.warn(error)
    }
})
app.post('/feedbacks', async (req, res) => {
    try {
        await Feedback.create(req.body)
        res.status(201).json({message: 'feedback created'})
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})

//
app.get('/feedbacks/:fbId', async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.fbId)
        if(feedback){
            res.status(201).json(feedback)
        }else{
            res.status(404).json({message: 'feedback not found'})
        }
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})
app.put('/feedbacks/:fbId', async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.fbId)
        if(feedback){
            await feedback.update(req.body, { fields: ['start', 'end', 'vehicle', 'hourOfDeparture', 'duration', 'congestionLevel', 'details', 'happinessLevel'] })
            res.status(202).json({ message: 'accepted' })
        }else{
            res.status(404).json({message: 'feedback not found'})
        }
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})
app.delete('/feedbacks/:fbId', async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.fbId)
        if(feedback){
            await feedback.destroy()
            res.status(202).json({ message: 'accepted' })
        }else{
            res.status(404).json({message: 'feedback not found'})
        }
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})

//Feedbacks in functie de utilizatori
app.get('/users/:userId/feedbacks', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if(user){
            const feedbacks = await user.getFeedbacks()
            res.status(200).json(feedbacks)
        }else{
            res.status(404).json({message: 'user not found'})
        }
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})

app.post('/users/:userId/feedbacks', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if(user){
            const feedback = req.body
            feedback.userId = user.id
            await Feedback.create(feedback)
            res.status(201).json({ message: 'user update accepted' })
        }else{
            res.status(404).json({message: 'user not found'})
        }
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})

app.get('/users/:userId/feedbacks/:fbId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if(user){
            const feedbacks = await user.getFeedbacks( { where: { id: req.params.fbId} } )
            const feedback = feedbacks.shift()
            if (feedback){
                res.status(200).json(feedback)
            } else{
                res.status(404).json({message: 'feedback not found'})
            }
        }else{
            res.status(404).json({message: 'user not found'})
        }
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})

app.post('/users/:userId/feedbacks/:fbId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if(user){
            const feedbacks = await user.getFeedbacks( { where: { id: req.params.fbId} } )
            const feedback = feedbacks.shift()
            if (feedback){
                await feedback.update(req.body)
                res.status(202).json({message: 'update accepted'})
            } else{
                res.status(404).json({message: 'feedback not found'})
            }
        }else{
            res.status(404).json({message: 'user not found'})
        }
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})

app.delete('/users/:userId/feedbacks/:fbId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if(user){
            const feedbacks = await user.getFeedbacks( { where: { id: req.params.fbId} } )
            const feedback = feedbacks.shift()
            if (feedback){
                await feedback.destroy()
                res.status(202).json({message: 'delete accepted'})
            } else{
                res.status(404).json({message: 'feedback not found'})
            }
        }else{
            res.status(404).json({message: 'user not found'})
        }
    } catch (error) {
        console.warn(error)
        res.status(500).json({ message: 'server error'})
    }
})

app.listen(8080)

// sequelize.sync()
//     .then(() => console.log('created'))
//     .catch((error) => console.log(error))