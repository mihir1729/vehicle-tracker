import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { VehicleProvider } from "./context/vehicle_context";
import { LocationProvider } from "./context/location_context";
import { LoginProvider } from "./context/login_context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<LoginProvider>
			<VehicleProvider>
				<LocationProvider>
					<App />
				</LocationProvider>
			</VehicleProvider>
		</LoginProvider>
	</React.StrictMode>
);
