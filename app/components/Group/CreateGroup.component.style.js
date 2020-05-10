import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textHighlight, textPageHeader} from '../../styles/common.style';

export default StyleSheet.create({
	button: {
		marginHorizontal: theme.MARGIN_DEFAULT
	},
	changePictureButton: {
		marginBottom: theme.MARGIN_DEFAULT
	},
	createGroupContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		margin: theme.MARGIN_WIDE,
		paddingVertical: theme.PADDING_DEFAULT,
	},
	groupImage: {
		alignSelf: 'center',
		borderRadius: 160/ 2,
		height: 160,
		marginBottom: theme.MARGIN_DEFAULT,
		width: 160
	},
	header: {
		...textPageHeader,
		marginBottom: theme.MARGIN_EXTRA_WIDE,
		marginTop: theme.MARGIN_EXTRA_WIDE_EXPANDED,
		textAlign: 'center'
	},
	pageContainer: {
		...pageContainer
	},
	pageContentView: {
		// ...pageContent
	},
	rootContainer: {
		...rootContainer
	},
	textField: {
		marginBottom: theme.MARGIN_DEFAULT,
		marginHorizontal: theme.MARGIN_DEFAULT,
	}
});