const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3060;


const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo-0.mongo.default.svc.cluster.local:27017`;


console.log("Attempting to connect to MongoDB at URI:", uri);

MongoClient.connect(uri)
  .then(client => {
    console.log(" Connected to MongoDB");

    const db = client.db("calculator");
    const operations = db.collection("operations");

  
    app.get("/", (req, res) => {
      res.send("Hello from MongoDB-backed calculator!");
    });

    // Addition
    app.get("/add", async (req, res) => {
      try {
        const n1 = parseFloat(req.query.num1);
        const n2 = parseFloat(req.query.num2);
        if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input");

        const result = n1 + n2;
        await operations.insertOne({ operation: "add", n1, n2, result, date: new Date() });
        res.status(200).json({ statusCode: 200, data: result });
      } catch (error) {
        res.status(400).json({ statusCode: 400, msg: error.message });
      }
    });

    // Subtraction
    app.get("/subtract", async (req, res) => {
      try {
        const n1 = parseFloat(req.query.num1);
        const n2 = parseFloat(req.query.num2);
        if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input");

        const result = n1 - n2;
        await operations.insertOne({ operation: "subtract", n1, n2, result, date: new Date() });
        res.status(200).json({ statusCode: 200, data: result });
      } catch (error) {
        res.status(400).json({ statusCode: 400, msg: error.message });
      }
    });

    // Multiplication
    app.get("/multiply", async (req, res) => {
      try {
        const n1 = parseFloat(req.query.num1);
        const n2 = parseFloat(req.query.num2);
        if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input");

        const result = n1 * n2;
        await operations.insertOne({ operation: "multiply", n1, n2, result, date: new Date() });
        res.status(200).json({ statusCode: 200, data: result });
      } catch (error) {
        res.status(400).json({ statusCode: 400, msg: error.message });
      }
    });

    // Division
    app.get("/Divide", async (req, res) => {
      try {
        const n1 = parseFloat(req.query.num1);
        const n2 = parseFloat(req.query.num2);
        if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input");
        if (n2 === 0) throw new Error("Cannot divide by zero");

        const result = n1 / n2;
        await operations.insertOne({ operation: "divide", n1, n2, result, date: new Date() });
        res.status(200).json({ statusCode: 200, data: result });
      } catch (error) {
        res.status(400).json({ statusCode: 400, msg: error.message });
      }
    });

    // Reading stored operations
    app.get("/results", async (req, res) => {
      try {
        const results = await operations.find().toArray();
        res.status(200).json({ statusCode: 200, data: results });
      } catch (error) {
        res.status(500).json({ statusCode: 500, msg: "Failed to fetch results" });
      }
    });

    // Start server
    app.listen(port, () => {
      console.log(" App is listening on port " + port);
    });
  })
  .catch(err => {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1);
  });