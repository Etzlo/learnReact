import React, { useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import userPNG from '../../assets/user.png'
import classes from './Header.module.css'

const Header = props => {
	const [redirect, setRedirect] = useState(false)

	const logout = () => {	
		props.logout()
		setRedirect(true)
	}

	return (
		<div className={classes.Header}>
			{redirect && <Navigate to='/login' />}
			<div className={classes.loginBlock}>
				{props.avatar ? (
					<img src={props.avatar} alt='' />
				) : (
					<img src={userPNG} alt='' />
				)}
				{props.isAuth ? (
					<div className={classes.logout}>
						{props.login}
						<button onClick={logout}>Logout</button>
					</div>
				) : (
					<NavLink to='/login'>Login</NavLink>
				)}
			</div>
		</div>
	)
}

export default Header
