import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default tseslint.config(
	{
		ignores: ["dist/**", "node_modules/**", ".astro/**", ".github/**", ".changeset/**"],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...astro.configs["flat/recommended"],
	...astro.configs["flat/jsx-a11y-recommended"],
	prettierRecommended,
	{
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		rules: {
			"@typescript-eslint/no-var-requires": "warn",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ varsIgnorePattern: "Props", ignoreRestSiblings: true },
			],
		},
	},
	{
		// Formatting inside .astro templates is handled by prettier-plugin-astro.
		files: ["**/*.astro"],
		rules: {
			"prettier/prettier": "off",
		},
	},
);
