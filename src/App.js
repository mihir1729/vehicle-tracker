import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fleet, Map } from "./pages";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Fleet />} />
				<Route path='/map' element={<Map />} />
			</Routes>
		</Router>
	);
}

export default App;
