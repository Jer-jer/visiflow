import React from "react";

function NotFound() {
	return (
		<main className="flex h-screen w-full flex-col items-center justify-center">
			<h1 className="text-9xl font-extrabold tracking-widest text-primary-500">
				404
			</h1>
			<div className="absolute rotate-12 rounded bg-accent px-2 text-sm text-white">
				Page Not Found
			</div>
			<button
				className="active:text-orange-500 group relative mt-5 inline-block text-sm font-medium text-white focus:outline-none focus:ring"
				onClick={() => window.history.go(-1)}
			>
				<span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-primary-500 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

				<span className="relative block border border-current bg-accent px-8 py-3">
					Go Back
				</span>
			</button>
		</main>
	);
}

export default NotFound;
