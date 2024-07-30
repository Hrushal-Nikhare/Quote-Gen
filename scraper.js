const fs = require('fs');
const path = require('path');
const axios = require("axios");
const cheerio = require("cheerio");

const categories = {
    Home: "https://www.goodreads.com/quotes",
    Love: "https://www.goodreads.com/quotes/tag/love",
    Life: "https://www.goodreads.com/quotes/tag/life",
    Inspirational: "https://www.goodreads.com/quotes/tag/inspirational",
    Humor: "https://www.goodreads.com/quotes/tag/humor",
    Philosophy: "https://www.goodreads.com/quotes/tag/philosophy",
    Inspirational: "https://www.goodreads.com/quotes/tag/inspirational",
    Truth: "https://www.goodreads.com/quotes/tag/truth",
    Wisdom: "https://www.goodreads.com/quotes/tag/wisdom",
    Friendship: "https://www.goodreads.com/quotes/tag/friendship",
    Happiness: "https://www.goodreads.com/quotes/tag/happiness",
    Hope: "https://www.goodreads.com/quotes/tag/hope",
    "Life Lessons": "https://www.goodreads.com/quotes/tag/life-lessons",
    Romance: "https://www.goodreads.com/quotes/tag/romance",
    Death: "https://www.goodreads.com/quotes/tag/death",
    Writing: "https://www.goodreads.com/quotes/tag/writing",
    Success: "https://www.goodreads.com/quotes/tag/success",
    Motivational: "https://www.goodreads.com/quotes/tag/motivational",
    Poetry: "https://www.goodreads.com/quotes/tag/poetry",
};


/**
 * Retrieves quotes from the specified category.
 * @param {string} category - The category of quotes to retrieve.
 * @returns {Promise<string[]>} - A promise that resolves to an array of quote contents.
 * @throws {Error} - If there is an error retrieving the quotes.
 */
async function getQuotes(category = "Home") {

	try {
		const categories = {
			Home: "https://www.goodreads.com/quotes",
			Love: "https://www.goodreads.com/quotes/tag/love",
			Life: "https://www.goodreads.com/quotes/tag/life",
			Inspirational: "https://www.goodreads.com/quotes/tag/inspirational",
			Humor: "https://www.goodreads.com/quotes/tag/humor",
			Philosophy: "https://www.goodreads.com/quotes/tag/philosophy",
			Inspirational: "https://www.goodreads.com/quotes/tag/inspirational",
			Truth: "https://www.goodreads.com/quotes/tag/truth",
			Wisdom: "https://www.goodreads.com/quotes/tag/wisdom",
			Friendship: "https://www.goodreads.com/quotes/tag/friendship",
			Happiness: "https://www.goodreads.com/quotes/tag/happiness",
			Hope: "https://www.goodreads.com/quotes/tag/hope",
			"Life Lessons": "https://www.goodreads.com/quotes/tag/life-lessons",
			Romance: "https://www.goodreads.com/quotes/tag/romance",
			Death: "https://www.goodreads.com/quotes/tag/death",
			Writing: "https://www.goodreads.com/quotes/tag/writing",
			Success: "https://www.goodreads.com/quotes/tag/success",
			Motivational: "https://www.goodreads.com/quotes/tag/motivational",
			Poetry: "https://www.goodreads.com/quotes/tag/poetry",
		};

		const { data } = await axios.get(categories[category]);

		const $ = cheerio.load(data);

		const quoteContents = [];

		// GPT Helped me with this :)
		$("div.quoteText").each((_idx, el) => {
			let quoteContent = $(el).text();

			// console.log(quoteContent);

			quoteContent = quoteContent.replace(
				/\/\/<!\[CDATA\[.*\/\/\]\]>/s,
				""
			); // magic gpt part

			quoteContent = quoteContent
				.replace(/\n/g, " ")
				.replace(/\s\s+/g, " ")
				.trim();

			quoteContent = quoteContent.replace(/,/g, "");

			// console.log(quoteContent);

			quoteContents.push(quoteContent);
		});

		return quoteContents;
	} catch (error) {
		throw error;
	}
}

// // Example
// getQuotes('Wisdom')
//     .then((Quote) => console.log(Quote));

async function saveQuotesToFile() {
    const quotesDir = path.join(__dirname, 'quotes');
    if (!fs.existsSync(quotesDir)) {
        fs.mkdirSync(quotesDir);
    }

    for (const category in categories) {
        try {
            const quotes = await getQuotes(category);
            const filePath = path.join(quotesDir, `${category}.json`);
            fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2));
            console.log(`Saved quotes for category: ${category}`);
        } catch (error) {
            console.error(`Failed to fetch quotes for category: ${category}`, error);
        }
    }
}

saveQuotesToFile();


