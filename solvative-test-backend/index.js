const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.get("/", async function (req, res) {
    const axios = require("axios").default;
    console.log(req.query);
    const city_name = req.query.city_name;
    const limit = req.query.limit;
    const offset = req.query.offset;

    const options = {
        method: "GET",
        url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        params: {
            namePrefix: city_name,
            limit: limit,
            offset: offset,
        },
        headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": process.env["API_KEY"], // get key from https://rapidapi.com/wirefreethought/api/geodb-cities/
        },
    };

    await axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            return res.status(200).json(response.data);
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
});

const server = app.listen(5000, function () {
    console.log("Express App running at http://127.0.0.1:5000/");
});
