import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {} from '../../styles/common.style';

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
	groupContainer: {
		alignItems: 'center',
		backgroundColor: theme.COLOR_PRIMARY,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	groupDataContainer: {
		alignItems: 'center',
		flexGrow: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: theme.PADDING_WIDE
	},
	groupDescription: {
		color: theme.COLOR_WHITE,
		fontSize: theme.FONT_SIZE_MEDIUM,
		fontStyle: 'italic',
		marginTop: theme.MARGIN_NARROW
	},
	groupDetails: {
		flexDirection: 'row',
		marginLeft: theme.MARGIN_DEFAULT
	},
	groupImage: {
		borderRadius: 72/ 2,
		height: 72,
		width: 72,
	},
	groupName: {
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
		borderRadius: theme.ROUNDNESS_DEFAULT,
		overflow: 'hidden'
	}
});