const express = require('express')
const path = require("path");
const multer  = require('multer')

const app = express()
const port = 3000

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
   return cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const upload = multer({ storage: storage })

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// For Frontend...
app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

app.get('/', (req, res) => {
 return res.render('home')
})

app.post("/upload",upload.single('profileImage'), (req, res) => {
      console.log(req.body);
      console.log(req.file);

      return res.redirect("/");
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})   

