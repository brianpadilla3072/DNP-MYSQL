import {config} from "dotenv"   

config();

export default {
     host: process.env.HOST || "localhost",
     database: process.env.DATABASE || "rest-api-node-js",
     user: process.env.USER || "root",
     password: process.env.PASSWORD || "1234" ,
     secretPublic: process.env.SECRETPUBLIC || "N0RMA",
     port: process.env.PORT || "3000"
}
