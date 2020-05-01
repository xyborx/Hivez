import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {rootContainer, textPageHeader} from '../../styles/common.style';

export default StyleSheet.create({
	eventListContainer: {
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		flex: 1,
		flexGrow: 1
	},
	header: {
		...textPageHeader,
		marginVertical: theme.MARGIN_WIDE,
		textAlign: 'center'
	},
	pageContainer: {
		flexDirection: 'row',
		overflow: 'hidden',
		padding: theme.PADDING_DEFAULT
	},
	pageContentView: {
		flexGrow: 1
	},
	rootContainer: {
		...rootContainer
	},
	searchField: {
		margin: theme.MARGIN_WIDE
	}
});