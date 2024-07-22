import { connect } from 'react-redux'
import { compose } from 'redux'
import { addMessageAC } from '../../redux/dialogs-reducer'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import Dialogs from './Dialogs'

const mapStateToProps = state => {
	return {
		dialogsPage: state.dialogsPage
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addMessage: newMessageBody => {
			dispatch(addMessageAC(newMessageBody))
		}
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs)
