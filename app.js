const express = require("express");
const fs = require("fs");
const { get } = require("http");
const path = require("path");
const rateLimit = require('express-rate-limit');


require('dotenv').config()

const Unsplash_Key = process.env.UNSPLASH_KEY;

function getRandomItem(arr) {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * arr.length);
    
    // Return the item at the random index
    return arr[randomIndex];
}

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    validate: {
		xForwardedForHeader: false,
        ip: true,
		default: true,
	},
    });

app.use(limiter);

allCategories = [ 'Home', 'Love', 'Life', 'Inspirational', 'Humor', 'Philosophy', 'Truth', 'Wisdom', 'Friendship', 'Happiness', 'Hope', 'Life Lessons', 'Romance', 'Death', 'Writing', 'Success', 'Motivational', 'Poetry' ];


app.get("/quotes/:category", (req, res) => {
    // console.log(req.params.category);
    let category = req.params.category;
    if (category.toLowerCase() === "random") {
        category = getRandomItem(allCategories);
    }
    fs.readFile(`quotes/${category}.json`, "utf8", function (err, data) {
        if (err) {
            res.status(404).send("Category not found");
            return;
        }
        const obj = JSON.parse(data);
        res.send(JSON.stringify(getRandomItem(obj)));
    });
});

app.get("/image",(req,res)=>{
    let options = ('nature','landscape','portrait','people','animals','food','fashion','architecture','travel','technology','business','health','sports','music');
    fetch(`https://api.unsplash.com/search/photos?client_id=${Unsplash_Key}&query=${getRandomItem(options)}&orientation=landscape&per_page=30`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        // res.send(JSON.stringify(data.results[0].urls.regular));
        // console.log(data.results);
        // data.results.forEach(element => {
        //     console.log(element.urls.regular);
        // });
        // console.log(getRandomItem(data.results)); // WORKS!!
        // res.send(JSON.stringify(getRandomItem(data.results).urls.full)); // too high rez takes time
        let randoimg = getRandomItem(data.results)
        // console.log(randoimg); // DEBUG
        let the_img = randoimg.urls.regular;
        let coloooors = randoimg.color;
        res.send(JSON.stringify({the_img , coloooors})); // only image
        // res.send(JSON.stringify(getRandomItem(data.results).urls.small)); // fastest but really bad quality

    });
});

app.get("/categories", (req, res) => {
    res.send(allCategories);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public\\index.html"));
});


// Start the server
app.listen(3000, () => {
	console.log("Server listening on port 3000");
});
