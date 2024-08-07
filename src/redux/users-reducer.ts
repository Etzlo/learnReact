// users-reducer.ts

import { Dispatch } from 'react'
import { usersAPI } from '../api/users-api'
import { UserType } from '../types/types'
import { updateObjectInArray } from '../utils/helpers/object-helper'
import { BasedThunkType, InferActionsTypes } from './redux-store'

type ThunkType = BasedThunkType<ActionsType>

type initialStateType = {
	users: Array<UserType>
	pageSize: number
	totalUsersCount: number
	currentPage: number
	isFetching: boolean
	followingInProgress: Array<number> // array of userId
	filter: FilterType
}

// export type initialStateType = typeof initialState
export type FilterType = {
	term: string
	isFollowed: null | boolean
}

const initialState: initialStateType = {
	users: [],
	pageSize: 12,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [],
	filter: {
		term: '',
		isFollowed: null as boolean | null
	}
}

const usersReducer = (
	state = initialState,
	action: ActionsType
): initialStateType => {
	switch (action.type) {
		case 'FOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userID, 'id', {
					followed: true
				})
			}
		case 'UNFOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userID, 'id', {
					followed: false
				})
			}
		case 'SET_USERS':
			return {
				...state,
				users: action.users
			}
		case 'SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.currentPage
			}
		case 'SET_TOTAL_USERS_COUNT':
			return {
				...state,
				totalUsersCount: action.totalUsersCount
			}
		case 'TOGGLE_IS_FETCHING':
			return {
				...state,
				isFetching: action.isFetching
			}
		case 'TOGGLE_IS_FOLLOWING_PROGRESS':
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userID]
					: state.followingInProgress.filter(id => id !== action.userID)
			}
		case 'SET_FILTER':
			return {
				...state,
				filter: action.payload
			}
		default:
			return state
	}
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
	followAC: (userID: number) => ({ type: 'FOLLOW', userID }) as const,
	unfollowAC: (userID: number) => ({ type: 'UNFOLLOW', userID }) as const,
	setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users }) as const,
	setCurrentPage: (currentPage: number) =>
		({ type: 'SET_CURRENT_PAGE', currentPage }) as const,
	setTotalUsersCount: (totalUsersCount: number) =>
		({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount }) as const,
	toggleIsFetching: (isFetching: boolean) =>
		({ type: 'TOGGLE_IS_FETCHING', isFetching }) as const,
	toggleFollowingProgress: (isFetching: boolean, userID: number) =>
		({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userID }) as const,
	setFilter: (filter: FilterType) =>
		({ type: 'SET_FILTER', payload: filter }) as const
}

export const getUsersAPI =
	(
		page: number,
		pageSize: number,
		filter: FilterType
	): ThunkType =>
	async dispatch => {
		dispatch(actions.toggleIsFetching(true))
		dispatch(actions.setFilter(filter))

		const data = await usersAPI.getUsers(page, pageSize, filter)
		dispatch(actions.setUsers(data.items))
		dispatch(actions.setTotalUsersCount(data.totalCount))
		dispatch(actions.setCurrentPage(page))
		dispatch(actions.toggleIsFetching(false))
	}

const _toggleFollowFlow = async (
	dispatch: Dispatch<ActionsType>,
	userID: number,
	apiMethod: Promise<any>,
	actionCreator: (userId: number) => ActionsType
) => {
	dispatch(actions.toggleFollowingProgress(true, userID))
	const res = await apiMethod
	console.log(res.data)
	if (res.data.resultCode === 0) dispatch(actionCreator(userID))
	dispatch(actions.toggleFollowingProgress(false, userID))
}

export const follow =
	(userID: number): ThunkType =>
	async dispatch => {
		console.log('Dispatching follow action for userID:', userID)
		await _toggleFollowFlow(
			dispatch,
			userID,
			usersAPI.follow(userID),
			actions.followAC
		)
	}

export const unfollow =
	(userID: number): ThunkType =>
	async dispatch => {
		console.log('Dispatching unfollow action for userID:', userID)
		await _toggleFollowFlow(
			dispatch,
			userID,
			usersAPI.unfollow(userID),
			actions.unfollowAC
		)
	}

export default usersReducer
