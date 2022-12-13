import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fleet, Map } from "./pages";
import { SingleVehicleMap } from "./components";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Fleet />} />
				<Route path='/map' element={<Map />} />
				<Route path='/map/:id' element={<SingleVehicleMap />} />
			</Routes>
		</Router>
	);
}

export default App;
