import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {iconButton, textHighlight} from '../../styles/common.style';

export default StyleSheet.create({
	icon: {
		...iconButton,
		fontSize: theme.FONT_SIZE_SMALL
	},
	modal: {
		backgroundColor: theme.COLOR_WHITE,
		flexDirection: 'row',
		maxWidth: theme.CONTAINER_WIDTH
	},
	modalCancelContainer: {
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: theme.COLOR_PRIMARY,
		borderRadius: theme.ROUNDNESS_EXTRA_MINIMUM,
		flexDirection: 'row',
		justifyContent: 'center',
		height: 40,
		maxWidth: theme.CONTAINER_WIDTH,
		width: '100%',
	},
	modalCancelButton: {
		alignItems: 'center',
		backgroundColor: theme.COLOR_PRIMARY,
		flexDirection: 'row',
		flexGrow: 1
	},
	modalCancelText: {
		...textHighlight,
		color: theme.COLOR_WHITE,
		width: '100%'
	},
	modalOptionContainer: {
		flexDirection: 'row',
		height: 28,
		alignItems: 'center'
	},
	modalOptionText: {
		flex: 1,
		padding: 20
	},
	modalOptionIcon: {
		...iconButton,
		color: theme.COLOR_PRIMARY
	},
	modalOptionIconHidden: {
		display: 'none'
	},
	modalOverlay: {
		backgroundColor: theme.COLOR_BLACK_OVERLAY,
		alignItems: 'center',
		justifyContent: 'center',
	},
	sectionTextStyle: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY
	}
})