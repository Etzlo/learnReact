import React, { Suspense, lazy, startTransition, useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import classes from './App.module.css'
import HeaderContainer from './components/Header/HeaderContainer'
import Nav from './components/Nav/Nav'
import Preloader from './components/common/Preloader/Preloader'
import { initializeApp } from './redux/app-reducer'
import { AppStateType } from './redux/redux-store'

interface OwnPropsType {
	logout: () => void
	avatar: string
	isAuth: boolean
	login: string
}

const DialogsContainer = lazy(
	() => import('./components/Dialogs/DialogsContainer')
)
const ProfileContainer = lazy(
	() => import('./components/Profile/ProfileContainer')
)
const Login = lazy(() => import('./components/Login/Login'))
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'))
const MusicContainer = lazy(() => import('./components/Music/MusicContainer'))
const SettingsContainer = lazy(
	() => import('./components/Settings/SettingsContainer')
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & OwnPropsType

const App: React.FC<Props> = ({
	initialized,
	initializeApp,
	logout,
	avatar,
	isAuth,
	login
}) => {
	const navigate = useNavigate()

	useEffect(() => {
		startTransition(() => {
			initializeApp()
		})
	}, [initializeApp])

	useEffect(() => {
		if (!initialized) {
			navigate('/login', { replace: true })
		}
	}, [initialized, navigate])

	if (!initialized) {
		return <Preloader />
	}

	return (
		<div className={classes.App}>
			<HeaderContainer
				logout={function (): void {
					throw new Error('Function not implemented.')
				}}
				avatar={''}
				isAuth={false}
				login={null}
			/>
			<Nav />
			<div className={classes.AppContent}>
				<Suspense fallback={<Preloader />}>
					<Routes>
						<Route path='/profile/:userId' element={<ProfileContainer />} />
						<Route path='/messages/*' element={<DialogsContainer />} />
						<Route path='/users' element={<UsersContainer />} />
						<Route path='/music' element={<MusicContainer />} />
						<Route path='/settings' element={<SettingsContainer />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</Suspense>
			</div>
		</div>
	)
}

const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialized
})

const connector = connect(mapStateToProps, {
	initializeApp
})

export default connector(App)