import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LocalizationContext} from '../../utils/language.utils';
import styles from './TabBar.component.style';

const TabBar = ({state, descriptors, navigation}) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();
	return (
		<View style={styles.buttonContainer}>
			{state.routes.map((route, index) => {
				const {options} = descriptors[route.key];

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
					type: 'tabLongPress',
					target: route.key,
					});
				};

				return (
					<TouchableOpacity
						activeOpacity={0.25}
						accessibilityRole="button"
						accessibilityStates={isFocused ? ['selected'] : []}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						key={index}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={styles.button}>
						<View>
							<FontAwesome5 name={options.icon} solid style={[styles.icon, isFocused ? styles.iconFocus : {}]} />
							<Text style={isFocused ? styles.text : styles.hidden}>{translations['BottomTabNavigator'][options.text]}</Text>
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

export default TabBar;