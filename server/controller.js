require('dotenv').config()

const {CONNECTION_STRING} = process.env

const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req,res) => {
        sequelize.query(`

        DROP TABLE IF EXISTS cards;
        DROP TABLE IF EXISTS users;

        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            username VARCHAR(50),
            password TEXT
        );

        CREATE TABLE cards (
            card_id SERIAL PRIMARY KEY,
            creator_id INT NOT NULL REFERENCES users(user_id),
            name VARCHAR(50),
            naughty INT,
            img text
        );

        INSERT INTO users (name, username, password)
        VALUES('dax', 'daxp', 'pass'),
        ('user', 'curruser', 'pass2');

        INSERT INTO cards (creator_id, name, naughty, img)
        VALUES (1, 'mike', 50, 'https://kh.wiki.gallery/images/9/90/Mike_Wazowski_KHIII.png'),
        (1, 'peter', 80, 'https://www.freeiconspng.com/thumbs/spiderman-png/png-marvell-hero-spiderman-image-2.png');

        `).then(()=> {
            console.log('db seeded')
            res.sendStatus(200)
        }).catch(err => console.log('it appears your database is unchanged',err))
    },
    getAllCards: (req,res) => {
        sequelize.query(`
        SELECT * 
        FROM cards
        ORDER BY card_id;
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    createNewCard: (req,res) => {
        sequelize.query(`
        INSERT INTO cards (creator_id, name, naughty, img)
        VALUES (2, '${req.body.name}', ${req.body.naughty}, '${req.body.img}');
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))

    },
    updateCard: (req,res) => {
        let {card_id} = req.params
        let {type, naughty} = req.body
        if (naughty < 5 && type === 'minus' ){
            res.status(400).send('0 is minimum')
        }else if(type === 'minus' ){
            naughtyValue = naughty - 5
        }else if(naughty > 95 && type === 'plus'){
            res.status(400).send('100 is maximum')
        }else if(type === 'plus' ){
            naughtyValue = naughty + 5}
        console.log('controller',req.params,req.body)
        sequelize.query(`
        UPDATE cards
        SET naughty = ${naughtyValue}
        WHERE card_id = ${card_id};`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))

    },
    deleteCard: (req,res) => {
        let {card_id} = req.params
        
        sequelize.query(`
        DELETE
        FROM cards
        WHERE card_id = ${card_id};
        `)
    },
}

