import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textHighlight, textPageHeader} from '../../styles/common.style';

export default StyleSheet.create({
	approvalContainer: {
		flexDirection: 'row',
		flex: 1,
		margin: theme.MARGIN_DEFAULT
	},
	approveButton: {
		backgroundColor: theme.COLOR_GREEN,
		flex: 1,
		marginLeft: theme.MARGIN_NARROW
	},
	billDetailContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		margin: theme.MARGIN_WIDE
	},
	billDetail: {
		alignItems: 'center',
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: theme.PADDING_DEFAULT
	},
	billDetailIcon: {
		color: theme.COLOR_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM
	},
	billDetailText: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	},
	billDetailValue: {
		color: theme.COLOR_SOFT_GREY
	},
	billValueContainer: {
		alignItems: 'center',
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: theme.MARGIN_NARROW,
		marginTop: theme.MARGIN_DEFAULT,
		paddingHorizontal: theme.PADDING_DEFAULT
	},
	billValueText: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_SEMI_HEADER,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		textAlign: 'center'
	},
	changePictureButton: {
		flex: 1,
		marginLeft: theme.MARGIN_NARROW
	},
	groupImage: {
		alignSelf: 'center',
		borderRadius: 160/ 2,
		height: 120,
		marginBottom: theme.MARGIN_DEFAULT,
		width: 120
	},
	groupName: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_SUB_HEADER,
		fontWeight: theme.FONT_WEIGHT_BOLD,
		textAlign: 'center'
	},
	header: {
		...textPageHeader,
		marginBottom: theme.MARGIN_EXTRA_WIDE,
		marginTop: theme.MARGIN_EXTRA_WIDE_EXPANDED,
		textAlign: 'center'
	},
	hidden: {
		display: 'none'
	},
	icon: {
		color: theme.COLOR_WHITE,
		marginRight: theme.MARGIN_NARROW
	},
	income: {
		color: theme.COLOR_GREEN,
	},
	noMargin: {
		marginLeft: 0
	},
	noPreview: {
		flexDirection: 'column'
	},
	pageContainer: {
		...pageContainer
	},
	pageContentView: {
		// ...pageContent
	},
	payButton: {
		margin: theme.MARGIN_DEFAULT
	},
	pictureContainer: {
		margin: theme.MARGIN_DEFAULT,
		marginBottom: 0
	},
	pictureConfigContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	rejectButton: {
		backgroundColor: theme.COLOR_RED,
		flex: 1,
		marginRight: theme.MARGIN_NARROW
	},
	rootContainer: {
		...rootContainer
	},
	textField: {
		margin: theme.MARGIN_DEFAULT,
		marginBottom: 0
	},
	viewImageContainer: {
		flex: 1,
		marginRight: theme.MARGIN_NARROW
	},
	viewImage: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: theme.COLOR_PRIMARY,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		height: 40,
		justifyContent: 'center',
		marginRight: theme.MARGIN_NARROW,
	},
	viewImageText: {
		...textHighlight,
		color: theme.COLOR_WHITE
	}
});