import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textPageHeader} from '../../styles/common.style';

export default StyleSheet.create({
	groupImage: {
		alignSelf: 'center',
		borderRadius: 160/ 2,
		height: 160,
		marginBottom: theme.MARGIN_DEFAULT,
		marginTop: theme.MARGIN_EXTRA_WIDE_EXPANDED,
		width: 160
	},
	groupName: {
		...textPageHeader,
		textAlign: 'center'
	},
	groupDescription: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_LARGE,
		fontStyle: 'italic',
		marginBottom: theme.MARGIN_WIDE,
		marginTop: theme.MARGIN_NARROW,
		textAlign: 'center'
	},
	hidden: {
		display: 'none'
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
	transactionList: {
		...boxShadow,
		marginBottom: theme.MARGIN_WIDE
	}
});