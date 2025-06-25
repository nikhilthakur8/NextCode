import React from "react";
import { Outlet } from "react-router-dom";

import { Analytics } from "@vercel/analytics/react";
export const App = () => {
	return (
		<div>
			<Outlet />
			<Analytics />
		</div>
	);
};
