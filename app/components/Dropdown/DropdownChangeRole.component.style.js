import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxContainer, boxShadow, iconButton, textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	modal: {
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		flexDirection: 'row',
		maxWidth: theme.CONTAINER_WIDTH
	},
	modalCancelContainer: {
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: theme.COLOR_PRIMARY,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		flexDirection: 'row',
		justifyContent: 'center',
		height: 40,
		maxWidth: theme.CONTAINER_WIDTH,
		overflow: 'hidden',
		width: '100%',
	},
	modalCancelButton: {
		alignItems: 'center',
		backgroundColor: theme.COLOR_PRIMARY,
		flexDirection: 'row',
		flexGrow: 1
	},
	modalCancelText: {
		...textHighlight,
		color: theme.COLOR_WHITE,
		width: '100%'
	},
	modalOptionContainer: {
		flexDirection: 'row',
		height: 28,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	modalOptionText: {
		flex: 1
	},
	modalOptionIcon: {
		...iconButton,
		color: theme.COLOR_PRIMARY,
		width: theme.MARGIN_DEFAULT
	},
	modalOptionIconHidden: {
		display: 'none'
	},
	modalOverlay: {
		backgroundColor: theme.COLOR_BLACK_OVERLAY,
		alignItems: 'center',
		justifyContent: 'center',
	},
	sectionTextStyle: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	},
	buttonContainer: {
		flexDirection: 'row',
		marginTop: theme.MARGIN_DEFAULT
	},
	button: {
		flex: 1,
		marginLeft: theme.MARGIN_NARROW
	},
	boxContainer: {
		...boxContainer,
		...boxShadow,
		flex: 1,
		maxWidth: theme.CONTAINER_WIDTH,
		overflow: 'hidden'
	},
	cancelButton: {
		backgroundColor: theme.COLOR_RED,
		marginLeft: 0,
		marginRight: theme.MARGIN_NARROW
	},
	centerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	content: {
		color: theme.COLOR_SOFT_GREY,
		textAlign: 'center'
	},
	header: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY,
		marginBottom: theme.MARGIN_DEFAULT,
		textAlign: 'center'
	}
})