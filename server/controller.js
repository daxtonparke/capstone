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
        VALUES (1, 'mike', 50, 'https://kh.wiki.gallery/images/9/90/Mike_Wazowski_KHIII.png');

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
    createCard: (req,res) => {
        let {name, naughty, img} = req.body
            sequelize.query(`
            INSERT INTO cards (creator_id, name, naughty, img)
            VALUES (2, ${name}, ${naughty}, ${img});
            `).then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },
    updateCard: (req,res) => {
        let {naughty, card_id} = req.body
        sequelize.query(`
        UPDATE cards
        SET naughty = ${naughty}
        WHERE card_id = ${card_id};
        `).then(dbRes => res.status(200).send(dbRes[0]))
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

