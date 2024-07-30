const express = require("express");
const fs = require("fs");
const { get } = require("http");
const path = require("path");

function getRandomItem(arr) {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * arr.length);
    
    // Return the item at the random index
    return arr[randomIndex];
}

const app = express();

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
