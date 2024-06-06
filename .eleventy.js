require("dotenv").config();

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("reset.css");
	eleventyConfig.addPassthroughCopy("theme.css");
};
