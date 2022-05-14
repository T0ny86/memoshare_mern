import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import postRouters from "./routers/posts.js"

const app = express();
// you don't need to install additional body-parser package, it ab ver:4.16 the express has own parser
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/posts', postRouters)


const CONNECTION_URL = "mongodb+srv://memos:memos@cluster0.d33db.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port:${PORT}`)))
    .catch((err) => console.log(err.message))



// mongoose.set('useFindAndModify', false)

