import React from "react";

interface SearchInputProps {
	globalStyling?: string | "";
	inputSyling?: string | "";
	iconStyling?: string | "";
	placeHolder: string;
}

function SearchInput({
	globalStyling,
	inputSyling,
	iconStyling,
	placeHolder,
}: SearchInputProps) {
	return (
		// Global Styling
		<div className={`${globalStyling}`}>
			<div>
				<div className="group relative">
					<input
						type="text"
						id="example9"
						className="block w-full rounded-md border-gray-300 px-10 hover:bg-gray-50 focus:border-primary-500 focus:ring-0"
						placeholder={placeHolder}
					/>
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-gray-500">
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
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchInput;
