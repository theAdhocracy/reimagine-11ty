const sanity = require("../utils/sanityClient.js");
const imageUrl = require("@sanity/image-url");

function sanityImage(image, width = 960) {
	image = image[0];

	return {
		src: `${imageUrl(sanity)
			.image(image.image)
			.width(width)
			.fit("max")
			.auto("format")}`,
		caption: image.caption,
		alt: image.alt,
	};
}

module.exports = sanityImage;
