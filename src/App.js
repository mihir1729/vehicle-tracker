import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { Fleet, Map } from "./pages";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<Fleet />} />
				<Route path='/map' element={<Map />} />
			</Routes>
		</Router>
	);
}

export default App;
