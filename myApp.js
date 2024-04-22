require('dotenv').config({ path: "./process.env" });

const bodyParser = require('body-parser');
let express = require('express');
let app = express();

console.log("Hello World")

app.use(function (req, res, next) {
	const method = req.method
	const path = req.path
	const ip = req.ip
	console.log(`${method.toUpperCase()} ${path} - ${ip}`)
	next()
})


app.use(bodyParser.urlencoded({extended: false}))



app.get("/", function (req, res) {
	absolutePath = __dirname + '/views/index.html'
	res.sendFile(absolutePath)
})

app.get("/now", function (req, res, next) {
	req.time = new Date().toString()
	next();
}, function (req, res) {
	res.json({time: req.time})
})

app.use("/public", express.static(__dirname + "/public"))

app.get("/json", function(req,res) { 
	let message = "Hello json"
	if (process.env.MESSAGE_STYLE == "uppercase") {
		message = "Hello json".toUpperCase()
	}
	res.json({"message": message}) 
})

app.get("/:word/echo", function(req, res, next){
	let word= req.params.word
	res.json({echo: word})
})

app.get("/name", function (req, res, next) {
	let {first, last} = req.query
	res.json({name: `${first} ${last}`})
})

app.post("/name", function(req, res, next) {
	let {first, last} = req.body
	res.json({name: `${first} ${last}`})
})

























 module.exports = app;
