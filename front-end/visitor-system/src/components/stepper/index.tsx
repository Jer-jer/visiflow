import React, { Dispatch, SetStateAction } from "react";

interface StepperProgress {
	progress: number;
	setProgress: Dispatch<SetStateAction<number>>;
}

export default function Stepper({ progress, setProgress }: StepperProgress) {
	return (
		<div className="flex h-[136px] w-[inherit] items-center justify-center bg-accent">
			<div className="w-[80%]">
				<div className="overflow-hidden rounded-full bg-white">
					<div
						className={`h-2 ${
							progress === 1
								? "w-1/3"
								: progress === 2
								? "w-2/3"
								: progress === 3 && "w-3/3"
						} rounded-full bg-primary-500`}
					></div>
				</div>

				<ol className="mt-4 grid grid-cols-3 text-lg font-normal text-white">
					<li className="flex cursor-default items-center justify-start text-primary-600 sm:gap-1.5">
						<span className="hidden sm:inline">Visit Date & Purpose</span>

						<svg
							className="h-6 w-6 sm:h-5 sm:w-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
							/>
						</svg>
					</li>

					<li
						className={`flex cursor-default items-center justify-center ${
							(progress === 2 || progress === 3) && "text-primary-600"
						} sm:gap-1.5`}
					>
						<span className="hidden sm:inline"> Visitor Information </span>

						<svg
							className="h-6 w-6 sm:h-5 sm:w-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
							/>
						</svg>
					</li>

					<li
						className={`flex cursor-default items-center justify-end ${
							progress === 3 && "text-primary-600"
						} sm:gap-1.5`}
					>
						<span className="hidden sm:inline"> Confirmation </span>

						<svg
							className="h-6 w-6 sm:h-5 sm:w-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</li>
				</ol>
			</div>
		</div>
	);
}
