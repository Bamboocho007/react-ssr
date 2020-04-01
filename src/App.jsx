import React from "react";
import { renderRoutes } from "react-router-config";
import "./App.scss";

export default function App({ route }) {
	return (
		<div>
			{renderRoutes(route.routes)}
		</div>
	);
}
