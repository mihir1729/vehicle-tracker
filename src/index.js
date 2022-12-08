import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { VehicleProvider } from "./context/vehicle_context";
import { LocationProvider } from "./context/location_context";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Auth0Provider
			domain='mihiryadav.us.auth0.com'
			clientId='KyeTguZ0jyUKaAClBaPkx9acYBZrIsyc'
			redirectUri={window.location.origin}
		>
			<VehicleProvider>
				<LocationProvider>
					<App />
				</LocationProvider>
			</VehicleProvider>
		</Auth0Provider>
	</React.StrictMode>
);
