import dotenv from 'dotenv';


import {app} from './app.js'
dotenv.config();





app.listen(process.env.PORT || 8000, () => {
    console.log(`\n Server is running at port : ${process.env.PORT} ✅`);
})
