import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Components/NavBar/Header';
import Home from './Components/Pages/Home';
import SignUp from './Components/Pages/SignUp';

import './App.scss';

function App() {
	return (
		<div className="wrapper">
			<Router>
				<Header />
				<main>
					<Route exact path='/' component={Home} />
					<Route exact path='/signup' component={SignUp} />
				</main>
			</Router>
		</div>
	);
}

export default App;
