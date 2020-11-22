const express = require('express');
const https = require("https");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {

res.sendFile(__dirname + "/index.html");

});


app.post("/", (req,res) => {
    const query = req.body.city;
    const apiKey = "212fa7f3fe4dee6b53c4c8d593eb5788";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
    console.log(url);
https.get(url, (response) => {
   response.on("data", (data) =>{
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const image = `http://openweathermap.org/img/wn/${icon}@2x.png`
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.write(`<h1> The temperature in ${query} is  ${temp} degree celcius </h1>`);
        res.write(`<p>The weather is currently ${description}.</p>`);
        res.write(`<img src = "${image}">`)
        res.send();
   });
});
});

app.listen(3000, () =>{
    console.log("server has started on port 3000");
});