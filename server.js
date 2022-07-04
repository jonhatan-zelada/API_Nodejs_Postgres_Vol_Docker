// Import the postgres client
const { Client } = require('pg');

const express = require("express");
const app = express();
const port = 8080;

//** set the location of static files */
app.use(express.static("public"));

//**https://node-postgres.com/api/client */
const client = new Client({
  password: "admin1234",
  user: "admin",
  host: "postgresql_database",
  database: "productDb",
});

 //** API Service PEOPLES */
app.get("/peoples", async (req, res) => {
    const results = await client
      .query("SELECT * FROM people")
      .then((payload) => {
        return payload.rows;
      })
      .catch(() => {
        throw new Error("Query failed");
      });
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
  });
  
  (async () => {
    await client.connect();
  
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })();


app.get("/", function(req,res){
        res.setHeader("Content-Type","text/html");
        res.status(200);
        res.send("<h1>Hello, this is a response on express WITH</h1>");
       
});
