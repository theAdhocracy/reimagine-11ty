const groq = require("groq");
const sanity = require("../../utils/sanityClient.js");
const sanityImage = require("../../utils/sanityImage.js");

async function getGlobalData() {
	const filter = groq`*[_type == "global"]`;
	const data = await sanity.fetch(filter).catch((err) => console.error(err));
	return transformGlobal(data[0]);
}

function transformGlobal(data) {
	return {
		footer: {
			desc: data.footer_description,
			socials: data.footer_socials.map((social) => {
				return {
					title: social.title,
					url: social.url,
					image: sanityImage(social.logo),
				};
			}),
			newsletter: data.footer_newsletter,
			copyright: data.footer_copyright,
			terms: data.footer_terms[0].links,
			menus: data.footer_menus.map((menu) => {
				return {
					title: menu.title,
					links: menu.links,
				};
			}),
		},
	};
}

module.exports = getGlobalData;
