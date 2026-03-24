
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui, {serve, setup } from 'swagger-ui-express';
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db.js';
import router from './routes/userRoutes.js';
import cors from "cors"
import morgan from 'morgan';
import middleware from './middleware/Authenticition.js';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import profilerouter from './routes/profileRoutes.js';
import companyRoute from './routes/companyRoutes.js';
import helmet from 'helmet';


dotenv.config();


const PORT = process.env.PORT

// Api documentation 
// swagger-ui 
// swagger-api-documentation 
const options = {
    definition: {   
        openapi: "3.0.0",
        info: {
            title: "Job Portal Application",
            version: "1.0.0",   
            description: "MERN stack job portal application",
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ]
    },
    apis: ["./routes/*.js"],
};

const spec = swaggerJSDoc(options);

const app = express();
app.use(express());
// secuity ke inputs hai yeah 
app.use(helmet())
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true
  })
)
app.use(morgan("dev"));


// app.use("/", (req, res) => {
//     res.send('hello world')
// }) 

app.use("/api/auth", router)
app.use("/api/auth", profilerouter)
app.use("/api/auth", companyRoute)

app.use("/api-doc", swaggerui.serve, swaggerui.setup(spec));
app.use(middleware);

app.listen(PORT, () => {
    connectDB();
    console.log(chalk.bgGreen.white(`server will be start on the port ${PORT}`))

})




