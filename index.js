const express = require("express")
const app = express()
const path = require("path")
const favicon = require("express-favicon")

// using favicon
app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(express.static(path.join(__dirname, "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("Now listening to ort " + PORT)
})