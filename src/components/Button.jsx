import React from "react";

export const Button = ({ children, className, ...props }) => {
	return (
		<button
			className={`px-3 py-1 cursor-pointer bg-gray-800 border-gray-700 border rounded flex items-center justify-center ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};
