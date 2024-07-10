import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

import { BrowserRouter } from 'react-router-dom'

import store from './redux/redux-store'
import StoreContext from './StoreContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

export const rerenderEntireTree = () => {
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<StoreContext.Provider value={store}>
					<App />
				</StoreContext.Provider>
			</BrowserRouter>
		</React.StrictMode>
	)
}

rerenderEntireTree(store.getState())

store.subscribe(() => {
	rerenderEntireTree()
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
