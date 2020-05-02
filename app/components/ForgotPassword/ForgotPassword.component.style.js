import {StyleSheet} from 'react-native';
import theme from '../../styles/theme.style';
import {boxContainer, boxShadow, dropdown, pageContainer, pageContent, rootContainer, rowComponent, textAlignLeft, textAlignRight, textAppTitle, textHighlight, textLink} from '../../styles/common.style';

export default StyleSheet.create({
	alignLeft: {
		...textAlignLeft
	},
	alignRight: {
		...textAlignRight
	},
	button: {
		marginTop: theme.PADDING_DEFAULT
	},
	boxContainer: {
		...boxContainer,
		...boxShadow,
		flex: 1,
		maxWidth: theme.CONTAINER_WIDTH,
	},
	centerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	dropdown: {
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	dropdownWrapper: {
		...dropdown,
		alignItems: 'center',
		flexDirection: 'row',
		height: 36,
		paddingHorizontal: theme.PADDING_NARROW
	},
	dropdownIcon: {
		color: theme.COLOR_GREY
	},
	dropdownText: {
		color: theme.COLOR_SOFT_GREY,
		fontSize: theme.FONT_SIZE_MEDIUM,
		paddingHorizontal: theme.PADDING_NARROW
	},
	rootContainer: {
		...rootContainer
	},
	header: {
		...textAppTitle,
		letterSpacing: theme.LETTER_SPACING_WIDE
	},
	headerContainer: {
		margin: theme.MARGIN_EXTRA_WIDE
	},
	hidden: {
		display: 'none'
	},
	link: {
		...textLink
	},
	linkContainer: {
		...rowComponent,
		justifyContent: 'space-between',
		marginTop: theme.PADDING_WIDE
	},
	pageContainer: {
		...pageContainer
	},
	pageContentView: {
		...pageContent
	},
	policyContainer: {
		...rowComponent,
		justifyContent: 'space-around',
		padding: theme.PADDING_WIDE
	},
	scrollViewWrapper: {
		alignSelf: 'stretch',
		padding: 24
	},
	textField: {},
	title: {
		...textHighlight,
		color: theme.COLOR_SOFT_GREY,
		marginBottom: theme.PADDING_DEFAULT,
		textAlign: 'center'
	},
	titleReducedMargin: {
		marginBottom: theme.PADDING_NARROW,
	}
});