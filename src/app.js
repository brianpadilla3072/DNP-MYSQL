import  express  from "express";
import morgan from "morgan";
//routs
import devocionales from "./routs/devocionales";
import user from "./routs/user";

const app= express();

// settings

app.set('port',4000);
//Midd Lewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}
));
app.use(express.static("static"));

//routs 

app.use('/API/user',user);

app.use('/API/devocionales',devocionales);
export default app;

