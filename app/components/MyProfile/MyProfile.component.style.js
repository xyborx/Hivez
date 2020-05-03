import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, textHighlight, textPageHeader, rootContainer} from '../../styles/common.style';

export default StyleSheet.create({
	header: {
		...textPageHeader,
		textAlign: 'center',
		marginVertical: theme.MARGIN_EXTRA_WIDE,
	},
	profileImage: {
		alignSelf: 'center',
		borderRadius: 160/ 2,
		height: 160,
		marginBottom: theme.MARGIN_DEFAULT,
		width: 160
	},
	pageContainer: {
		...pageContainer
	},
	pageContentView: {
		// ...pageContent
	},
	profileSection: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		marginBottom: theme.MARGIN_WIDE,
		overflow: 'hidden'
	},
	profileSectionItem: {
		alignSelf: 'stretch',
		padding: theme.PADDING_DEFAULT
	},
	profileSectionItemContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	profileSectionItemIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM
	},
	profileSectionItemText: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	},
	profileSectionItemValue: {
		color: theme.COLOR_SOFT_GREY
	},
	rootContainer: {
		...rootContainer
	},
	sectionHeader: {
		...textHighlight,
		marginVertical: theme.MARGIN_DEFAULT,
		textAlign: 'center'
	},
	scrollViewWrapper: {
		alignSelf: 'stretch',
		paddingHorizontal: theme.PADDING_WIDE
	},
	versionText: {
		...textHighlight,
		color: theme.COLOR_GREY,
		textAlign: 'center',
		marginBottom: theme.MARGIN_DEFAULT
	}
});