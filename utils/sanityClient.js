require("dotenv");

const { createClient } = require("@sanity/client");

const sanity = {
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
};

module.exports = createClient({
	...sanity,
	apiVersion: "2024-06-06",
	useCdn: false,
	token: process.env.SANITY_READ_TOKEN,
});
