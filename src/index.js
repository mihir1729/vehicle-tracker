import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { VehicleProvider } from "./context/vehicle_context";
import { LocationProvider } from "./context/location_context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<VehicleProvider>
			<LocationProvider>
				<App />
			</LocationProvider>
		</VehicleProvider>
	</React.StrictMode>
);
