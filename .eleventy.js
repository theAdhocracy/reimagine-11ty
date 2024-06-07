require("dotenv").config();
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginWebC = require("@11ty/eleventy-plugin-webc");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("reset.css");
	eleventyConfig.addPassthroughCopy("theme.css");
	eleventyConfig.addPlugin(pluginWebC, {
		components: "_includes/components/*.webc",
	});
	eleventyConfig.addPlugin(EleventyRenderPlugin);
};
