import {config} from "dotenv"   

config();

export default {
     host: process.env.HOST || "localhost" || "containers-us-west-196.railway.app",
     database: process.env.DATABASE || "rest-api-node-js"|| "railway",
     user: process.env.USER || "root"|| "root",
     password: process.env.PASSWORD || "1234" || "LyeVEnUFwfJ93IkpRcoE",
     secretPublic: process.env.SECRETPUBLIC || "N0RMA",
     port: process.env.PORT || "3000" || "6891"
}
