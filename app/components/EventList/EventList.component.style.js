import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, rootContainer, textPageHeader} from '../../styles/common.style';

export default StyleSheet.create({
	eventListContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		flex: 1,
		flexGrow: 1,
		margin: theme.MARGIN_NARROW,
		marginTop: 0
	},
	header: {
		...textPageHeader,
		marginVertical: theme.MARGIN_EXTRA_WIDE,
		textAlign: 'center'
	},
	pageContainer: {
		flexDirection: 'row',
		overflow: 'hidden',
		padding: theme.PADDING_DEFAULT,
		paddingTop: 0
	},
	pageContentView: {
		flexGrow: 1
	},
	rootContainer: {
		...rootContainer
	},
	searchField: {
		margin: theme.MARGIN_DEFAULT
	}
});