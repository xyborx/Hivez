import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textHighlight, textPageHeader, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
	button: {
		marginTop: theme.MARGIN_NARROW
	},
	eventImage: {
		alignSelf: 'center',
		borderRadius: 120/ 2,
		height: 120,
		marginBottom: theme.MARGIN_DEFAULT,
		width: 120
	},
	eventName: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_SUB_HEADER,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		textAlign: 'center',
		marginBottom: theme.MARGIN_WIDE
	},
	fullName: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY,
		marginTop: theme.MARGIN_EXTRA_NARROW,
		textAlign: 'center'
	},
	header: {
		...textPageHeader,
		marginBottom: theme.MARGIN_EXTRA_WIDE,
		marginTop: theme.MARGIN_EXTRA_WIDE_EXPANDED,
		textAlign: 'center'
	},
	headerText: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_SUB_HEADER
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
	profileImage: {
		alignSelf: 'center',
		borderRadius: 40/ 2,
		height: 40,
		width: 40
	},
	rootContainer: {
		...rootContainer
	},
	rowButton: {
		flex: 1
	},
	rowButtonLeft: {
		marginRight: theme.MARGIN_NARROW
	},
	rowButtonRight: {
		marginLeft: theme.MARGIN_NARROW
	},
	rowColumn: {
		flexDirection: 'row',
		marginTop: theme.MARGIN_DEFAULT
	},
	sectionContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		margin: theme.MARGIN_WIDE,
		marginTop: 0,
		padding: theme.PADDING_DEFAULT
	},
	settlementIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_LARGE,
		marginHorizontal: theme.MARGIN_DEFAULT
	},
	username: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL,
		textAlign: 'center'
	},
	usersContainer: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	userItem: {
		flex: 1
	},
	userTitle: {
		color: theme.COLOR_PRIMARY,
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		marginBottom: theme.MARGIN_NARROW,
		textAlign: 'center'
	},
	settlementValue: {
		color: theme.COLOR_RED,
		fontSize: theme.FONT_SIZE_LARGE,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		marginTop: theme.MARGIN_NARROW,
		textAlign: 'center'
	}
});