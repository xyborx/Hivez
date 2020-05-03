import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textPageHeader} from '../../styles/common.style';

export default StyleSheet.create({
	eventListContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		flex: 1,
		flexGrow: 1,
		margin: theme.MARGIN_WIDE,
		marginTop: 0,
		paddingBottom: theme.PADDING_DEFAULT
	},
	header: {
		...textPageHeader,
		marginVertical: theme.MARGIN_EXTRA_WIDE,
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
	searchField: {
		margin: theme.MARGIN_DEFAULT
	}
});