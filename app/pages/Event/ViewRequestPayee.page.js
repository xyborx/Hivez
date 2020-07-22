import React, {useContext, useState} from 'react';
import {EventContext} from '../../contexts/event.context';
import {LocalizationContext} from '../../contexts/language.context';
import {UserContext} from '../../contexts/user.context';
import ViewRequestPayee from '../../components/Event/ViewRequestPayee.component';

const ViewRequestPayeePage = ({route, navigation}) => {
	const {eventID, payeeList} = route.params;

	const {eventData} = useContext(EventContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {userData} = useContext(UserContext);

	const [eventMember, setEventMember] = useState(payeeList);
	const [displayedEventMember, setDispayedEventMember] = useState(eventMember);
	const [searchValue, setSearchValue] = useState('');

	const onChangeSearch = (searchQuery) => {
		setSearchValue(searchQuery);
		if(searchQuery === '') setDispayedEventMember(eventMember);
		else setDispayedEventMember(eventMember.filter((item) => {
			return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
		}));
	};

	const goBack = () => {
		navigation.pop();
	};

	return (
		<ViewRequestPayee
			contentText={translations['ViewRequestPayee']}
			eventData={eventData}
			eventMember={displayedEventMember}
			currentUser={userData.id}
			searchValue={searchValue}
			onChangeSearch={onChangeSearch}
			goBack={goBack} />
	);
};

export default ViewRequestPayeePage;