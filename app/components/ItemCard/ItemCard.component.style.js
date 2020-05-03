import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxShadow} from '../../styles/common.style';

export default StyleSheet.create({
	actionContainer:{
		alignItems: 'center',
		backgroundColor: theme.COLOR_WHITE,
		flexDirection: 'row',
        justifyContent: 'space-around'
	},
	expandButton: {
		height: '100%',
		paddingHorizontal: theme.PADDING_WIDE
	},
    expandIcon: {
		alignSelf: 'center',
        color: theme.COLOR_WHITE,
        fontSize: theme.FONT_SIZE_SUB_HEADER,
	},
	expandWrapper: {
		flex: 1,
		justifyContent: 'center'
	},
	itemContainer: {
		alignItems: 'center',
		backgroundColor: theme.COLOR_PRIMARY,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	itemDataButton: {
		flexGrow: 1,
	},
	itemDataContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: theme.PADDING_WIDE
	},
	itemDescription: {
		color: theme.COLOR_WHITE,
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontStyle: 'italic',
		marginTop: theme.MARGIN_NARROW
	},
	itemDetails: {
		flexDirection: 'row',
		marginLeft: theme.MARGIN_DEFAULT
	},
	itemImage: {
		borderRadius: 72/ 2,
		height: 72,
		width: 72,
	},
	itemName: {
		fontSize: theme.FONT_SIZE_SUB_HEADER, 
		fontWeight: theme.FONT_WEIGHT_BOLD, 
		color: theme.COLOR_WHITE,
    },
    hidden: {
        display: 'none'
    },
    iconButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: theme.MARGIN_DEFAULT
    },
	itemCard: {
		...boxShadow,
		borderRadius: theme.ROUNDNESS_DEFAULT,
		overflow: 'hidden',
		marginHorizontal: theme.MARGIN_NARROW,
		marginVertical: theme.MARGIN_EXTRA_NARROW
	}
});