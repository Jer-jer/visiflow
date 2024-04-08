import "./styles.scss";

import React, { useEffect } from "react";
const google = (window as any).google;

const GoogleTranslateComponent: React.FC = () => {
	useEffect(() => {
		if (!google || !google.translate) {
			const script = document.createElement("script");
			script.src =
				"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
			script.async = true;
			script.onerror = () => {
				console.error("Error loading Google Translate script");
			};
			document.body.appendChild(script);

			return () => {
				document.body.removeChild(script);
			};
		} else {
			(window as any).googleTranslateElementInit = () => {
				google.translate.TranslateElement(
					{ pageLanguage: "en", includedLanguages: "en,hi" },
					"google_translate_element",
				);
			};
			(window as any).googleTranslateElementInit();
		}
	}, []);

	return (
		<div>
			<div id="google_translate_element"></div>
		</div>
	);
};

export default GoogleTranslateComponent;
