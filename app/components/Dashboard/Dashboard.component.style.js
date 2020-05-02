import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textHighlight, textPageHeader, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
	boxShadow: {
		...boxShadow,
	},
	editIcon: {
		color: theme.COLOR_PRIMARY,
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
		marginTop: theme.MARGIN_EXTRA_WIDTH,
		marginBottom: theme.MARGIN_EXTRA_NARROW
	},
	indentSection: {
		paddingHorizontal: theme.PADDING_WIDE
	},
	textHighlight: {
		...textHighlight
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
	scrollViewWrapper: {
		paddingVertical: theme.PADDING_EXTRA_WIDE
	},
	subHeader: {
		...textPageSubHeader
	}
});