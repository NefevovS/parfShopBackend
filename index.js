import Express from "express"
import dotenv from "dotenv"
dotenv.config();

const PORT=process.env.PORT||5000;
const app = new Express()



app.get("/",(req,res)=>{})

app.listen(PORT,()=>console.log(`Server started PORT:${PORT}`))