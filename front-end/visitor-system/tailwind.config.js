/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,tsx}"],
	theme: {
		extend: {
			extend: {
				colors: {
					primary: {
						50: "#E7F7F3",
						100: "#B4E7D9",
						200: "#90DCC6",
						300: "#5DCBAD",
						400: "#3DC19D",
						500: "#0db284", // Main Primary
						600: "#0CA278",
						700: "#097E5E",
						800: "#076249",
						900: "#054B37",
					},
					accent: "#2C4C32",
					neutral: "#D0D2CC",
					success: "#0db284",
					warning: "#ffce0a",
					error: "#FD4A4A",
					black: "#0C0D0D",
					yellow: "#ffce0a",
					orange: "#E88B23",
				},
				fontFamily: {
					sans: ["Roboto", "sans-serif"],
					serif: ["Roboto", "serif"],
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/typography"),
		require("tailwindcss-animate"),
		require("daisyui"),
		require("@headlessui/react"),
	],
	daisyui: {
		themes: [
			{
				visiFlow: {
					primary: {
						50: "#E7F7F3",
						100: "#B4E7D9",
						200: "#90DCC6",
						300: "#5DCBAD",
						400: "#3DC19D",
						500: "#0db284", // Main Primary
						600: "#0CA278",
						700: "#097E5E",
						800: "#076249",
						900: "#054B37",
					},
					accent: "#2C4C32",
					neutral: "#D0D2CC",
					"base-100": "#FFFFFF",
					success: "#0db284",
					warning: "#ffce0a",
					error: "#FD4A4A",
				},
			},
		], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: "", // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
		prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
	},
};
