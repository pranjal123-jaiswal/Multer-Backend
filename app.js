const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json())
const cors = require("cors")
app.use(cors())
app.use("/files" , express.static("files"))


const mongourl = 'mongodb+srv://pranjalunoffical:ZKvWwJVRGi6nRuXg@images1.1aefzvx.mongodb.net/?retryWrites=true&w=majority'; // Specify the database name in the connection URL

mongoose.connect(mongourl, {
  useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: 'images', // Move the database name to the connection options
})
  .then(() => {
    console.log('Connected to MongoDB'); 
    // Your application logic goes here
  })
  .catch((e) => {
    console.error('Error connecting to MongoDB:', e.message);
  });

require("./pdfDetails")
const pdfSchema = mongoose.model("PdfDetails")
  const multer  = require('multer')
// const upload = multer({ dest: './files' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix+file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })

app.post("/upload-files" , upload.single("file") , async (req , res) => {
    console.log(req.file)
    const title = req.body.title;
    const filename = req.file.filename;
    try{
        await pdfSchema.create({title: title , pdf: filename })
        res.json({status: "ok"})
    }catch(err) {
        res.json({status: err})
    }
   
})


app.get("/" , async(req , res) => {
    res.send("success")
})

app.get("/get-files", async (req, res) => {
    try {
      PdfSchema.find({}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {}
  });
app.listen(5000 , () => {
    console.log("server connected")
})



