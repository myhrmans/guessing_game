import dotenv from 'dotenv';
dotenv.config();

const configDB = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: true,
    },
};

export default configDB;
