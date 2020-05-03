import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';

export default StyleSheet.create({
	dotStyle: {
		width: 8,
		height: 8,
		borderRadius: 8/2
	},
	hidden: {
		display: 'none'
	},
	noFavouriteGroup: {
		color: theme.COLOR_SOFT_GREY,
		marginBottom: theme.MARGIN_WIDE,
		textAlign: 'center'
	}
});