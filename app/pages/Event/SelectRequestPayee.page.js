import React, {useContext, useState} from 'react';
import {EventContext} from '../../contexts/event.context';
import {LocalizationContext} from '../../contexts/language.context';
import {UserContext} from '../../contexts/user.context';
import {sum} from '../../utils/query.utils';
import SelectRequestPayee from '../../components/Event/SelectRequestPayee.component';

const SelectRequestPayeePage = ({route, navigation}) => {
	const {eventID, payeeList, maxExpense} = route.params;

	const {eventData} = useContext(EventContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {userData} = useContext(UserContext);

	const [eventMember, setEventMember] = useState(payeeList);
	const [displayedEventMember, setDispayedEventMember] = useState(eventMember);
	const [type, setType] = useState('SIMPLE');
	const [searchValue, setSearchValue] = useState('');
	const [saveButtonAccessbility, setSaveButtonAccessbility] = useState(Math.round(sum(payeeList, 'expense')) == maxExpense);

	const onChangeType = (type) => {
		setType(type);
	};

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setDispayedEventMember(eventMember);
		else setDispayedEventMember(eventMember.filter((item) => {
			return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
		}));
	};

	const updateEventMember = (userID, expense) => {
		const elementsIndex = eventMember.findIndex(element => element.id == userID);
		let newArray = [...eventMember];
		if (type === 'ADVANCED') {
			newArray[elementsIndex] = {...newArray[elementsIndex], expense: Number(expense)};
		}
		else {
			const countCurrentSelected = newArray.filter(item => item.expense !== 0).length;
			if (newArray[elementsIndex].expense === 0) {
				newArray = newArray.map(item => {
					if (item.expense !== 0) return {...item, expense: maxExpense / (countCurrentSelected + 1)}
					return item;
				});
				newArray[elementsIndex] = {...newArray[elementsIndex], expense: maxExpense / (countCurrentSelected + 1)};
			}
			else {
				if (countCurrentSelected) {
					newArray = newArray.map(item => {
						if (item.expense !== 0) return {...item, expense: maxExpense / (countCurrentSelected - 1)}
						return item;
					});
				}
				newArray[elementsIndex] = {...newArray[elementsIndex], expense: 0};
			}
		}
		setEventMember(newArray);
		if(searchValue === '') setDispayedEventMember(newArray);
		else setDispayedEventMember(newArray.filter((item) => {
			return item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
		}));
		setSaveButtonAccessbility(Math.round(sum(newArray, 'expense')) == maxExpense);
	};

	const goBack = () => {
		navigation.pop();
	};

	const selectAll = () => {
		const newArray = eventMember.map(item => ({...item, expense: maxExpense / eventMember.length}));
		setEventMember(newArray);
		if(searchValue === '') setDispayedEventMember(newArray);
		else setDispayedEventMember(newArray.filter((item) => {
			return item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
		}));
		setSaveButtonAccessbility(true);
	};

	const reset = () => {
		const newArray = eventMember.map(item => ({...item, expense: 0}));
		setEventMember(newArray);
		if(searchValue === '') setDispayedEventMember(newArray);
		else setDispayedEventMember(newArray.filter((item) => {
			return item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
		}));
		setSaveButtonAccessbility(false);
	}

	const save = () => {
		navigation.navigate('CreateEventRequest', {payeeList: eventMember});
	};

	return (
		<SelectRequestPayee
			contentText={translations['SelectRequestPayee']}
			eventData={eventData}
			maxExpense={maxExpense}
			eventMember={displayedEventMember}
			currentUser={userData.id}
			type={type}
			setType={onChangeType}
			searchValue={searchValue}
			updateEventMember={updateEventMember}
			saveButtonAccessbility={saveButtonAccessbility}
			onChangeSearch={onChangeSearch}
			selectAll={selectAll}
			reset={reset}
			save={save}
			goBack={goBack} />
	);
};

export default SelectRequestPayeePage;