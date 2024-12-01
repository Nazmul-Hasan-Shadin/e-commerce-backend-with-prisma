import express, { Application } from "express";
import router from "./app/routes";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use('/api/v1',router);

 
app.get('/',(req,res)=>{
   res.send('server is listenting')
})




export default app;
