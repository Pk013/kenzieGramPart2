function photoDisplays(imgNames) {
    let outputString = "";
    for (let i = 0; i < imgNames.length; i++) {
      const name = imgNames[i];
      console.log(name);
      outputString += `<img src="uploads/${name}"/>`
    }
    return outputString;
  }

  const express = require("express");
const multer = require("multer");
const fs = require("fs")

const publicPath = "public/";
const uploadPath = "public/uploads/"
const port = 3000;
const app = express();
const upload = multer({ dest: uploadPath })

app.use(express.static(publicPath));
app.set("view engine", "pug")

const uploadedFiles = [];

app.get('/', function (req, res) {
  const path = './public/uploads';
  fs.readdir(path, function (err, items) {
    res.render('index', { title: 'Kenziegram get pugged', message: 'KenzieGram just got pugged', array: items })
  })
})

function photoDisplays(imgNames) {
  let outputString = "";
  for (let i = 0; i < imgNames.length; i++) {
    const name = imgNames[i];
    outputString += `<img src="uploads/${name}"/>`
  }
  return outputString;
}

app.post('/uploads', upload.single('myFile'), function (request, response, next) {
  uploadedFiles.push(request.file.filename);
  response.render('uploads', { title: 'Uploaded Picture With Pug', message: 'Congratulations you have clicked a button to upload a picture!!!', image: request.file.filename });
})

app.listen(port, () => console.log("Server running on " + port))