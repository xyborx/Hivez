import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textHighlight, textPageHeader, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
	button: {
		marginTop: theme.MARGIN_NARROW
	},
	dateField: {
		marginTop: theme.MARGIN_DEFAULT
	},
	dateDetails: {
		flex: 1,
		marginLeft: theme.MARGIN_NARROW
	},
	eventImageContainer: {
		alignSelf: 'center',
		borderRadius: 160/ 2,
		height: 160,
		marginBottom: theme.MARGIN_WIDE,
		overflow: 'hidden',
		width: 160
	},
	eventImage: {
		height: '100%',
		width: '100%'
	},
	eventName: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_SUB_HEADER,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		textAlign: 'center',
		marginBottom: theme.MARGIN_WIDE
	},
	header: {
		...textPageHeader,
		marginBottom: theme.MARGIN_EXTRA_WIDE,
		marginTop: theme.MARGIN_EXTRA_WIDE_EXPANDED,
		textAlign: 'center'
	},
	headerText: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_SUB_HEADER,
		marginHorizontal: theme.MARGIN_DEFAULT,
		marginBottom: theme.MARGIN_NARROW
	},
	hidden: {
		display: 'none'
	},
	memberDetailContainer: {
		flex: 1
	},
	memberImage: {
		borderRadius: 48/2,
		flexGrow: 0,
		height: 48,
		marginRight: theme.MARGIN_DEFAULT,
		width: 48
	},
	memberItemContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: theme.PADDING_DEFAULT,
		paddingVertical: theme.PADDING_NARROW
	},
	memberRole: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL
	},
	memberJoinDate: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL,
		marginTop: theme.MARGIN_EXTRA_NARROW
	},
	pageContainer: {
		...pageContainer
	},
	pageContentView: {
		// ...pageContent
	},
	redText: {
		color: theme.COLOR_RED
	},
	rootContainer: {
		...rootContainer
	},
	sectionContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		margin: theme.MARGIN_WIDE,
		marginTop: 0,
		paddingVertical: theme.PADDING_DEFAULT
	},
	sectionContainerWithPadding: {
		padding: theme.PADDING_DEFAULT
	},
	settingsItem: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: theme.PADDING_DEFAULT
	},
	settingsItemContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		flexGrow: 1,
		justifyContent: 'space-between'
	},
	settingsItemIcon: {
		fontSize: theme.FONT_SIZE_MEDIUM,
		color: theme.COLOR_GREY
	},
	settingsItemText: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	}
});