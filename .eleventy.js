require("dotenv").config();
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginWebC = require("@11ty/eleventy-plugin-webc");

module.exports = function (eleventyConfig) {
	// Plugins
	eleventyConfig.addPlugin(pluginWebC, {
		components: "src/_includes/components/**/*.webc",
	});
	eleventyConfig.addPlugin(EleventyRenderPlugin);

	// Assets
	eleventyConfig.addPassthroughCopy("styles");
	eleventyConfig.addPassthroughCopy({ "src/_includes/assets": "/assets" });

	return {
		dir: {
			input: "src",
		},
	};
};
