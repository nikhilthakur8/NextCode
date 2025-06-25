import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Problems } from "./Page/Probelms.jsx";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { Home } from "./Page/Home.jsx";
import { App } from "./App.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" element={<Home />} />
			<Route path="/problem/:titleSlug" element={<Problems />} />
		</Route>
	)
);
createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
