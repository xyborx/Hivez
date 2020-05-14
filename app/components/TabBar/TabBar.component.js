import React, {useContext, useEffect, useState} from 'react';
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LocalizationContext} from '../../utils/language.utils';
import styles from './TabBar.component.style';

const TabBar = ({state, descriptors, navigation}) => {
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	initializeAppLanguage();
	const [showTab, setShowTab] = useState(true);

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
		Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

		return () => {
			Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
			Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
		};
	}, []);

	const _keyboardDidShow = () => {
		setShowTab(false);
	};

	const _keyboardDidHide = () => {
		setShowTab(true);
	};
	
	return ( showTab &&
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