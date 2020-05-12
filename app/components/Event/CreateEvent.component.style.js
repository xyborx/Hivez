import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow, pageContainer, rootContainer, textHighlight, textPageHeader} from '../../styles/common.style';

export default StyleSheet.create({
	button: {
		marginHorizontal: theme.MARGIN_DEFAULT
	},
	changePictureButton: {
		flex: 1,
		marginLeft: theme.MARGIN_NARROW
	},
	createEventContainer: {
		...boxShadow,
		backgroundColor: theme.COLOR_WHITE,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		margin: theme.MARGIN_WIDE,
		paddingVertical: theme.PADDING_DEFAULT,
	},
	eventImageContainer: {
		alignSelf: 'center',
		borderRadius: 160/ 2,
		height: 160,
		marginBottom: theme.MARGIN_DEFAULT,
		overflow: 'hidden',
		width: 160
	},
	eventImage: {
		height: '100%',
		width: '100%'
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
	noMargin: {
		marginLeft: 0
	},
	noPreview: {
		flexDirection: 'column',
		marginHorizontal: theme.MARGIN_DEFAULT,
		marginBottom: theme.MARGIN_DEFAULT
	},
	pageContainer: {
		...pageContainer
	},
	pageContentView: {
		// ...pageContent
	},
	pictureConfigContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: theme.MARGIN_DEFAULT,
		marginBottom: theme.MARGIN_DEFAULT
	},
	rootContainer: {
		...rootContainer
	},
	textField: {
		marginBottom: theme.MARGIN_DEFAULT,
		marginHorizontal: theme.MARGIN_DEFAULT,
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
		justifyContent: 'center'
	},
	viewImageText: {
		...textHighlight,
		color: theme.COLOR_WHITE
	}
});