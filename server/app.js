const express = require("express");
const app = express();
const port = 5000;
const updatedb = require("./db/update");
const readdb = require("./db/read");
const insertdb = require("./db/insert");
const deletedb = require("./db/delete");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.json("Hello World!");
});

// readdb()

app.get("/api/employees", (req, res) => {
	console.log("hi")
	readdb().then((info) => res.json(info));
});

app.post("/api/employees/insert", (req, res) => {
	const { name, age, email, salary, country, state, city } = req.body;
	insertdb(name, age, email, salary, country, state, city)
	.then(readdb().then((info) => res.json(info)))
});

app.delete("/api/employees/delete", (req, res) => {
	console.log("hi")
	console.log(req.body);
	deletedb(req.body.id)
	.then(readdb().then((info) => res.json(info)))
});

app.put("/api/employees/put", (req, res) => {
	console.log(req.body);
	const { id, name, age, email, salary, country, state, city } = req.body;
	updatedb(id, name, age, email, salary, country, state, city)
	.then(readdb().then((info) => res.json(info)))
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
