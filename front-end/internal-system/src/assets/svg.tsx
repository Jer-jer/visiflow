import React from "react";

export const DangerIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="text-error-500 ml-2 h-7 w-7"
		>
			<path
				fillRule="evenodd"
				d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const Search = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			className="h-5 w-5"
		>
			<path
				fillRule="evenodd"
				d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export const ArrowDown = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-4 w-4"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M19.5 8.25l-7.5 7.5-7.5-7.5"
			/>
		</svg>
	);
};

export const TabClose = () => {
	return (
		<svg
			width="15"
			height="17"
			viewBox="0 0 15 17"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="close-circle-svgrepo-com 1">
				<path
					id="Vector"
					d="M7.5 2.03027C4.05625 2.03027 1.25 4.94445 1.25 8.52066C1.25 12.0969 4.05625 15.011 7.5 15.011C10.9437 15.011 13.75 12.0969 13.75 8.52066C13.75 4.94445 10.9437 2.03027 7.5 2.03027ZM9.6 10.0134C9.78125 10.2017 9.78125 10.5132 9.6 10.7014C9.50625 10.7988 9.3875 10.8442 9.26875 10.8442C9.15 10.8442 9.03125 10.7988 8.9375 10.7014L7.5 9.20864L6.0625 10.7014C5.96875 10.7988 5.85 10.8442 5.73125 10.8442C5.6125 10.8442 5.49375 10.7988 5.4 10.7014C5.21875 10.5132 5.21875 10.2017 5.4 10.0134L6.8375 8.52066L5.4 7.02787C5.21875 6.83965 5.21875 6.52811 5.4 6.33989C5.58125 6.15167 5.88125 6.15167 6.0625 6.33989L7.5 7.83267L8.9375 6.33989C9.11875 6.15167 9.41875 6.15167 9.6 6.33989C9.78125 6.52811 9.78125 6.83965 9.6 7.02787L8.1625 8.52066L9.6 10.0134Z"
					fill="#0DB284"
				/>
			</g>
		</svg>
	);
};

export const ExcelDownload = (props: any) => {
	return (
		<svg
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`ml-[5px] inline-block align-baseline ${props.size}`}
		>
			<g id="excel-document-svgrepo-com 1">
				<path
					id="Vector"
					fillRule="evenodd"
					clipRule="evenodd"
					d="M3.55928 0.00244141C2.46475 0.00244141 1.57764 0.890332 1.57764 1.98447V23.0161C1.57764 24.111 2.46475 24.9981 3.55928 24.9981H21.4397C22.5339 24.9981 23.4218 24.111 23.4218 23.0161V7.93603L16.0382 0.00244141H3.55928Z"
					fill="#45B058"
				/>
				<path
					id="Vector_2"
					d="M9.15205 21.0696C9.06768 21.0696 8.98994 21.0345 8.94111 20.9642L7.48486 19.0228L6.02197 20.9642C5.97275 21.0345 5.89541 21.0696 5.81104 21.0696C5.65635 21.0696 5.52979 20.9501 5.52979 20.7884C5.52979 20.7321 5.54346 20.6688 5.58604 20.6196L7.10557 18.6153L5.69189 16.7302C5.65674 16.681 5.63525 16.6247 5.63525 16.5685C5.63525 16.4349 5.74775 16.2872 5.91689 16.2872C6.00127 16.2872 6.08564 16.3294 6.14189 16.3997L7.48486 18.2075L8.82783 16.3927C8.87744 16.3224 8.95439 16.2872 9.03916 16.2872C9.18682 16.2872 9.32744 16.4067 9.32744 16.5685C9.32744 16.6247 9.31338 16.681 9.27783 16.7302L7.86416 18.6083L9.38408 20.6196C9.41924 20.6688 9.43291 20.7251 9.43291 20.7813C9.43291 20.936 9.30635 21.0696 9.15205 21.0696ZM13.054 21.0204H10.9231C10.6907 21.0204 10.5009 20.8306 10.5009 20.5985V16.5685C10.5009 16.4138 10.6274 16.2872 10.8032 16.2872C10.9579 16.2872 11.0849 16.4138 11.0849 16.5685V20.5001H13.054C13.1942 20.5001 13.3071 20.6126 13.3071 20.7532C13.3071 20.9079 13.1942 21.0204 13.054 21.0204ZM15.7813 21.1048C15.0853 21.1048 14.536 20.8728 14.1356 20.5208C14.0724 20.4646 14.0442 20.3872 14.0442 20.3099C14.0442 20.1692 14.1497 20.0146 14.3185 20.0146C14.3747 20.0146 14.438 20.0286 14.4876 20.0708C14.811 20.3591 15.261 20.5841 15.8028 20.5841C16.6399 20.5841 16.9067 20.1341 16.9067 19.7751C16.9067 18.5653 14.129 19.2337 14.129 17.5595C14.129 16.786 14.8181 16.2583 15.7396 16.2583C16.3442 16.2583 16.8649 16.4411 17.2446 16.7575C17.3079 16.8138 17.3435 16.8911 17.3435 16.9685C17.3435 17.1091 17.2235 17.2497 17.0688 17.2497C17.0122 17.2497 16.9489 17.2286 16.9001 17.1864C16.5552 16.9052 16.1267 16.7786 15.6974 16.7786C15.1349 16.7786 14.7337 17.081 14.7337 17.5243C14.7337 18.5794 17.5118 17.9743 17.5118 19.7259C17.5118 20.4087 17.0478 21.1048 15.7813 21.1048Z"
					fill="white"
				/>
				<path
					id="Vector_3"
					fillRule="evenodd"
					clipRule="evenodd"
					d="M23.4192 7.95V8.34062H18.4188C18.4188 8.34062 15.9532 7.84844 16.0255 5.7207C16.0255 5.7207 16.1063 7.95 18.37 7.95H23.4192Z"
					fill="#349C42"
				/>
				<path
					id="Vector_4"
					opacity="0.5"
					fillRule="evenodd"
					clipRule="evenodd"
					d="M16.0347 0V5.68789C16.0347 6.33477 16.4659 7.95 18.419 7.95H23.4194L16.0347 0Z"
					fill="white"
				/>
			</g>
		</svg>
	);
};

export const ArrowLeft = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-6 w-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
			/>
		</svg>
	);
};

export const Home = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-5 w-5"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
			/>
		</svg>
	);
};

export const Hamburger = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-5 w-5"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
			/>
		</svg>
	);
};

export const PieChart = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-5 w-5"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
			/>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
			/>
		</svg>
	);
};

export const Calendar = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-5 w-5"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
			/>
		</svg>
	);
};

export const UserGroup = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-5 w-5"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
			/>
		</svg>
	);
};

export const Users = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-6 w-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
			/>
		</svg>
	);
};

export const Edit = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-5 w-5"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
			/>
		</svg>
	);
};

export const Camera = () => {
	return (
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 31.5 30" 
			fill="none"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-5 w-5"
		>
  			<path 
				d="M27.5916 10.5C28.4361 10.5 28.8583 10.5 29.2066 10.5844C30.2985 10.849 31.151 11.7015 31.4156 12.7933C31.5 13.1416 31.5 13.5638 31.5 14.4083V24C31.5 26.8284 31.5 28.2426 30.6213 29.1213C29.7426 30 28.3284 30 25.5 30H24H12H10.5C7.67157 30 6.25735 30 5.37868 29.1213C4.5 28.2426 4.5 26.8284 4.5 24V14.4083C4.5 13.5638 4.5 13.1416 4.58442 12.7933C4.84906 11.7015 5.70152 10.849 6.79331 10.5844C7.14161 10.5 7.56385 10.5 8.40832 10.5C8.88147 10.5 9.11803 10.5 9.33915 10.4668C10.0235 10.3643 10.6514 10.0282 11.1164 9.51573C11.2666 9.35013 11.3978 9.1533 11.6602 8.75962L12 8.25C12.5946 7.35816 12.8918 6.91224 13.2982 6.6055C13.5464 6.41818 13.8222 6.27058 14.1157 6.168C14.5964 6 15.1323 6 16.2042 6H19.7958C20.8677 6 21.4037 6 21.8843 6.168C22.1778 6.27058 22.4536 6.41818 22.7017 6.6055C23.1081 6.91224 23.4054 7.35816 24 8.25L24.3397 8.75962C24.6022 9.1533 24.7333 9.35013 24.8836 9.51573C25.3486 10.0282 25.9765 10.3643 26.6608 10.4668C26.8819 10.5 27.1185 10.5 27.5916 10.5Z" 
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
  			<path 
				d="M22.5 19.5C22.5 21.9854 20.4854 24 18 24C15.5146 24 13.5 21.9854 13.5 19.5C13.5 17.0146 15.5146 15 18 15C20.4854 15 22.5 17.0146 22.5 19.5Z" 
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export const WalkinQR = () => {
	return (
		<svg 
			xmlns="http://www.w3.org/2000/svg"
			viewBox="4 4 39 39" 
			fill="none"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-5 w-5"
		>
			<path 
				d="M40.5,5.5H7.5a2,2,0,0,0-2,2v33a2,2,0,0,0,2,2h33a2,2,0,0,0,2-2V7.5A2,2,0,0,0,40.5,5.5Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<line 
				x1="10.55" 
				y1="10.5" 
				x2="17.27" 
				y2="37.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<line 
				x1="24" 
				y1="10.5" 
				x2="17.27" 
				y2="37.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<line 
				x1="24" 
				y1="10.5" 
				x2="30.73" 
				y2="37.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<line 
				x1="37.45" 
				y1="10.5" 
				x2="30.73" 
				y2="37.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export const PreregisterQR = () => {
	return (
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="4 4 39 39" 
			fill="none"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-5 w-5"
		>
			<path 
				d="M40.5,5.5H7.5a2,2,0,0,0-2,2v33a2,2,0,0,0,2,2h33a2,2,0,0,0,2-2V7.5A2,2,0,0,0,40.5,5.5Z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path 
				d="M15,37.5v-27H24a9.07,9.07,0,0,1,0,18.14H15"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export const Form = () => {
	return (
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="2 3 25 30" 
			fill="none"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-5 w-5"
		>
  			<path 
				d="M5.33334 10.5C5.33334 7.67157 5.33334 6.25735 6.11439 5.37868C6.89543 4.5 8.15251 4.5 10.6667 4.5H21.3333C23.8475 4.5 25.1045 4.5 25.8856 5.37868C26.6667 6.25735 26.6667 7.67157 26.6667 10.5V22.5C26.6667 26.7426 26.6667 28.8639 25.4951 30.1819C24.3235 31.5 22.4379 31.5 18.6667 31.5H13.3333C9.5621 31.5 7.67648 31.5 6.50491 30.1819C5.33334 28.8639 5.33334 26.7426 5.33334 22.5V10.5Z" 
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
  			<path 
				d="M20 27V31.5M12 27V31.5" 
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
  			<path 
				d="M12 12H20" 
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
  			<path 
				d="M12 18H20" 
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}