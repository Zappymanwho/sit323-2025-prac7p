const express = require("express");
const res = require("express/lib/response");
const app=express();

//Addition microservice
app.get("/add", (req, res) => {
    try {
        const n1 = parseFloat(req.query.num1);
        const n2 = parseFloat(req.query.num2);

        if (isNaN(n1)) throw new Error("n1 is incorrectly defined");
        if (isNaN(n2)) throw new Error("n2 is incorrectly defined");

        const result = n1 + n2;
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        console.error("Addition error:", error.message);
        res.status(400).json({ statusCode: 400, msg: error.message });
    }
});

//subtraction microservice

app.get("/subtract", (req, res) => {
    try {
        const n1 = parseFloat(req.query.num1);
        const n2 = parseFloat(req.query.num2);

        if (isNaN(n1)) throw new Error("n1 is incorrectly defined");
        if (isNaN(n2)) throw new Error("n2 is incorrectly defined");

        const result = n1 - n2;
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        console.error("Addition error:", error.message);
        res.status(400).json({ statusCode: 400, msg: error.message });
    }
});
//Multiplication microservice
app.get("/multiply", (req, res) => {
    try {
        const n1 = parseFloat(req.query.num1);
        const n2 = parseFloat(req.query.num2);

        if (isNaN(n1)) throw new Error("n1 is incorrectly defined");
        if (isNaN(n2)) throw new Error("n2 is incorrectly defined");

        const result = n1 * n2;
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        console.error("Addition error:", error.message);
        res.status(400).json({ statusCode: 400, msg: error.message });
    }
});

//Division microservice
app.get("/Divide", (req, res) => {
    try {
        const n1 = parseFloat(req.query.num1);
        const n2 = parseFloat(req.query.num2);

        if (isNaN(n1)) throw new Error("n1 is incorrectly defined");
        if (isNaN(n2)) throw new Error("n2 is incorrectly defined");
        if (n2 === 0) throw new Error("Will cause a dividebyzero exception");
        const result = n1 / n2;
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        console.error("Addition error:", error.message);
        res.status(400).json({ statusCode: 400, msg: error.message });
    }
});
const port=3060;
app.get('/', (req, res) => {
    res.send('Hello from Kubernetes!');
  });

app.listen(port,()=> {
    console.log("I'm listening to this port here"+port);
})