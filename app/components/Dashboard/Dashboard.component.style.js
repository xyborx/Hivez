import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {lightPageContainer, pageContent, rootContainer, textHighlight, textPageHeader, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
	editIcon: {
		marginLeft: theme.MARGIN_NARROW
	},
	editListButton: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	favouriteGroup: {
		marginTop: theme.MARGIN_DEFAULT
	},
	favouriteGroupWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: theme.MARGIN_DEFAULT,
	},
	header: {
		...textPageHeader,
		marginBottom: theme.MARGIN_EXTRA_NARROW
	},
	indentSection: {
		paddingHorizontal: theme.PADDING_WIDE
	},
	textHighlight: {
		...textHighlight
	},
	pageContainer: {
		...lightPageContainer
	},
	pageContentView: {
		// ...pageContent
	},
	rootContainer: {
		...rootContainer
	},
	scrollViewWrapper: {
		// backgroundColor: 'red',
		paddingVertical: theme.PADDING_EXTRA_WIDE
	},
	subHeader: {
		...textPageSubHeader
	}
});