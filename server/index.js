import express from "express"
// import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import postRoutes from "./routers/posts.js"
import userRoutes from "./routers/users.js"
import dotenv from "dotenv"
dotenv.config();
const app = express();
// you don't need to install additional body-parser package, it ab ver:4.16 the express has own parser
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port:${PORT}`)))
    .catch((err) => console.log(err.message))



// mongoose.set('useFindAndModify', false)

