const axios = require('axios');
const cheerio = require('cheerio');

const getQuotes = async () => {
	try {
		
		const { data } = await axios.get(
			'https://www.goodreads.com/quotes'
		);

		
		const $ = cheerio.load(data);

		
		const quoteContents = [];

        const quoteAuthors = [];

		
		// $('#bodycontainer > div.mainContentContainer > div.mainContent > div.mainContentFloat > div.leftContainer > div.quotes > div > div.quoteDetails > div.quoteText > span.authorOrTitle').each((_idx, el) => {
		// 	let quoteAuthor = $(el).text();
        //     quoteAuthor = quoteAuthor.replace(/\n/g, '').replace(/\s\s+/g, '').replace(/,/g, '');
		// 	quoteAuthors.push(quoteAuthor)
		// });

        $('#bodycontainer > div.mainContentContainer > div.mainContent > div.mainContentFloat > div.leftContainer > div.quotes > div > div.quoteDetails > div.quoteText').each((_idx, el) => {
			let quoteContent = $(el).text();
            quoteContent = quoteContent.replace(/\n/g, '').replace(/\s\s+/g, '').replace(/,/g, '');
			quoteContents.push(quoteContent)
		});

		
		return quoteContents;
	} catch (error) {
		throw error;
	}
};

getQuotes()
    .then((Quote) => console.log(Quote));