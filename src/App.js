// App.js
import React from 'react'
import './App.css'
import Dialogs from './components/Dialogs/Dialogs'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import Profile from './components/Profile/Profile'

import { Route, Routes } from 'react-router-dom'

const App = props => {
	return (
		<div className='app-wrapper'>
			<Header />
			<Nav />
			<div className='app-wrapper-content'>
				<Routes>
					<Route
						path='/profile'
						element={<Profile state={props.state.profilePage} />}
					/>
					<Route
						path='/messages/*'
						element={<Dialogs state={props.state.dialogsPage} />}
					/>
				</Routes>
			</div>
		</div>
	)
}

export default App
