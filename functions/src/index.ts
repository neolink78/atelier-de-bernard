import express from 'express';
import router from './routes'
import fileUpload from "express-fileupload";

const app = express()
const port = 4000

app.use(express.json())
app.use(fileUpload({
  //limits: { fileSize: 100 * 1024 * 1024 },
  useTempFiles: true, 
  tempFileDir: "/tmp/", 
}));
app.use(router)


app.listen(port, () => {
  console.log(`AExample app listening on port ${port}`)
})