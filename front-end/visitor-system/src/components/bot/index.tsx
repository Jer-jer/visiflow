import React, { Component } from "react";

// Assets
import "./styles.scss";

export class ChatBot extends Component {
	// componentDidMount(): void {
	// 	(function (d, m) {
	// 		var kommunicateSettings = {
	// 			appId: "1533584fa23c162f32fe0da228affe252",
	// 			popupWidget: true,
	// 			automaticChatOpenOnNavigation: true,
	// 		};
	// 		var s = document.createElement("script");
	// 		s.type = "text/javascript";
	// 		s.async = true;
	// 		s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
	// 		var h = document.getElementsByTagName("head")[0];
	// 		h.appendChild(s);
	// 		window.kommunicate = m;
	// 		m._globals = kommunicateSettings;
	// 	})(document, window.kommunicate || {});
	// 	/* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */
	// }

	render() {
		return <div>ChatBot</div>;
	}
}

export default ChatBot;
