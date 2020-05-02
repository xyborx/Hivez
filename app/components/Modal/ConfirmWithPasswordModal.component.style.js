import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxContainer, boxShadow, pageContainer, pageContent, rootContainer, textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
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
		marginBottom: theme.MARGIN_NARROW,
		textAlign: 'center'
	},
	header: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY,
		marginBottom: theme.MARGIN_DEFAULT,
		textAlign: 'center'
	},
	pageContainer: {
		...pageContainer
	},
	pageContentView: {
		...pageContent
	},
	rootContainer: {
		...rootContainer,
		padding: theme.PADDING_WIDE,
		backgroundColor: 'rgba(0,0,0,0.8)'
	}
});