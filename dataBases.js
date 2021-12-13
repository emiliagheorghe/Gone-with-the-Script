
//USING ORM SEQUELIZE   
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
        type: Sequelize.TIME,
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

sequelize.sync()
    .then(() => console.log('created'))
    .catch((error) => console.log(error))