import React from "react";
import Home from "../pages/Home";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const MainLayOuts = () => {
	return (
		<div>
			<Navbar></Navbar>
			<Outlet></Outlet>
			<Footer></Footer>
		</div>
	);
};

export default MainLayOuts;
