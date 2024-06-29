import React from 'react'

import classes from './Post.module.css'

const Post = () => {
	return (
		<>
			<div className={classes.item}>
				<img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" />
				post 1
				<div>
					<span>like</span>
				</div>
			</div>
		</>
	)
}

export default Post