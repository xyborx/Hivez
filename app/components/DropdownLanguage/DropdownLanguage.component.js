import React from 'react';
import {Text, View} from 'react-native';
import ModalSelector from 'react-native-modal-selector'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Flag} from 'react-native-svg-flagkit'
import styles from '../DropdownLanguage/DropdownLanguage.component.style';

const DropdownLanguage = (props) => {
    const data = [
        { key: -1, section: true, label: props.contentText['SELECT_LANGUAGE']},
        ...props.dataList.map((value, i) => ({
            key: i,
            label: value,
            component: (
                <View style={styles.modalOptionContainer}>
                    <Flag id={props.langaugeIcons[value]} size={0.1} />
                    <Text style={styles.modalOptionText}>{props.dataListContext[value]}</Text>
                    <FontAwesome5 name={'check'} style={props.currentValue === value ? styles.modalOptionIcon : styles.modalOptionIconHidden} />
                </View>
            )
        }))
    ];
    return (
        <ModalSelector
            backdropPressToClose={true}
            cancelContainerStyle={styles.modalCancelContainer}
            cancelStyle={styles.modalCancelButton}
            cancelText={props.contentText['CANCEL_SELECT']}
            cancelTextStyle={styles.modalCancelText}
            data={data}
            onChange={(option) => {props.onChange(option.label)}}
            optionContainerStyle={styles.modal}
            overlayStyle={styles.modalOverlay}
            style={styles.container} >
            <View style={styles.wrapper}>
                <Flag id={props.langaugeIcons[props.currentValue]} size={0.075} style={styles.flag} />
                <Text style={styles.text}>{props.dataListContext[props.currentValue]}</Text>
                <FontAwesome5 name={'caret-down'} style={styles.icon} />
            </View>
        </ModalSelector>
    );
}

export default DropdownLanguage;