import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textHighlight, textPageHeader, textPageSubHeader} from '../../styles/common.style';

export default StyleSheet.create({
	actionContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	actionIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_LARGE,
		marginLeft: theme.MARGIN_NARROW
	},
	button: {
		marginHorizontal: theme.MARGIN_DEFAULT
	},
	configButtonContainer: {
		flexDirection: 'row',
		marginHorizontal: theme.MARGIN_DEFAULT,
		marginBottom: theme.MARGIN_DEFAULT
	},
	configButton: {
		flex: 1,
	},
	configButtonLeft: {
		marginRight: theme.MARGIN_NARROW
	},
	configButtonRight: {
		marginLeft: theme.MARGIN_NARROW
	},
	dateField: {
		marginTop: theme.MARGIN_DEFAULT
	},
	dateDetails: {
		flex: 1,
		marginLeft: theme.MARGIN_NARROW
	},
	emptyList: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: theme.MARGIN_NARROW
	},
	emptyListText: {
		...textHighlight,
		fontSize: theme.FONT_SIZE_MEDIUM,
		color: theme.COLOR_GREY
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
		textAlign: 'center'
	},
	expense: {
		color: theme.COLOR_RED,
		fontWeight: theme.FONT_WEIGHT_BOLD
	},
	floatingContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderTopLeftRadius: theme.ROUNDNESS_DEFAULT,
		borderTopRightRadius: theme.ROUNDNESS_DEFAULT,
		bottom: 0,
		left: theme.MARGIN_WIDE,
		right: theme.MARGIN_WIDE,
		paddingVertical: theme.PADDING_DEFAULT,
		position: 'absolute'
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
	memberActionIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM,
		textAlign: 'center'
	},
	memberActionItem: {
		marginLeft: theme.MARGIN_NARROW
	},
	memberActionContainer: {
		// alignItems: 'center',
		// flexDirection: 'row'
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
	memberName: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontWeight: theme.FONT_WEIGHT_BOLD
	},
	memberRole: {
		...textPageSubHeader,
		fontSize: theme.FONT_SIZE_SMALL
	},
	numberField: {
		marginHorizontal: theme.MARGIN_DEFAULT,
		marginBottom: theme.MARGIN_NARROW
	},
	pageContainer: {
		...pageContainer
	},
	pageContentView: {
		// ...pageContent,
		paddingBottom: 68
	},
	rootContainer: {
		...rootContainer
	},
	searchField: {
		marginHorizontal: theme.MARGIN_DEFAULT,
		marginBottom: theme.MARGIN_DEFAULT
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
	switch: {
		margin: theme.MARGIN_WIDE
	}
});