import { defineConfig } from "astro/config";
import fs from "fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import remarkUnwrapImages from "remark-unwrap-images";
// @ts-ignore:next-line
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
	site: "https://shkumbinhsn.com/",
	// Replaces the removed @astrojs/prefetch integration. Links opt in with `data-astro-prefetch`.
	prefetch: true,
	markdown: {
		// Astro 7 defaults to the Sätteri processor, which does not run remark plugins.
		processor: unified({
			remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
			remarkRehype: { footnoteLabelProperties: { className: [""] } },
		}),
		shikiConfig: {
			theme: "dracula",
			wrap: true,
		},
	},
	integrations: [mdx({}), sitemap(), icon()],
	vite: {
		plugins: [tailwindcss(), rawFonts([".ttf"])],
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});

function rawFonts(ext: Array<string>) {
	return {
		name: "vite-plugin-raw-fonts",
		// @ts-ignore:next-line
		transform(_, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}
