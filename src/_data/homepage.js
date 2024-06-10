const groq = require("groq");
const sanity = require("../../utils/sanityClient.js");
const sanityImage = require("../../utils/sanityImage.js");

async function getHomepageData() {
	const filter = groq`*[_type == "homepage"]`;
	const data = await sanity.fetch(filter).catch((err) => console.error(err));
	return transform(data[0]);
}

function transform(data) {
	return {
		title: data.title,
		subtitle: data.subtitle,
		copy: data.copy,
		highlights: data.highlights.map((highlight) => {
			return {
				title: highlight.title,
				desc: highlight.description,
				category: highlight.category,
				url: `/${highlight.slug.current}`,
				thumb: sanityImage(highlight.thumbnail),
			};
		}),
		content: data.content.map((block) => {
			let output;
			switch (block._type) {
				case "banner":
					output = {
						title: block.title,
						copy: block.copy,
						link: {
							url: block.link[0].url,
							label: block.link[0].label,
						},
					};
					break;
				case "revelation_grid":
					output = {
						title: block.title,
						subtitle: block.subtitle,
						desc: block.description,
						link: {
							url: block.header_link[0]?.url,
							label: block.header_link[0]?.label,
						},
						cards: block.cards.map((card) => {
							return {
								id: card._key,
								title: card.title,
								desc: card.description,
							};
						}),
					};
					break;
				case "logo_grid":
					output = {
						title: block.title,
						subtitle: block.subtitle,
						link: {
							url: block.link[0].url,
							label: block.link[0].label,
						},
						logos: block.logos.map((logo) => {
							return sanityImage(logo);
						}),
					};
					break;
			}

			return {
				type: block._type,
				...output,
			};
		}),
		links: data.links.map((link) => {
			return {
				url: link.url,
				label: link.label,
			};
		}),
	};
}

module.exports = getHomepageData;
