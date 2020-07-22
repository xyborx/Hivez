import React, {createContext, useState} from 'react';
import {get} from '../utils/api.utils';

export const GroupContext = createContext();

export const GroupProvider = ({children}) => {
	const [groupData, setGroupData] = useState({});

	const fetchData = async (groupID, userID) => {
		try {
			const data = await get(`/groups/${groupID}/detail?user-id=${userID}`);
			const image = await get(`/groups/${groupID}/picture`);
			return {
				id: groupID,
				image: image['output_schema']['group_picture'],
				name: data['output_schema']['group_name'],
				description: data['output_schema']['group_description'],
				allowSearchByName: data['output_schema']['is_searchable'] === 'Y' ? true : false,
				balance: data['output_schema']['group_balance'],
				role: data['output_schema']['user_role']
			};
		} catch (error) {
			console.log(error.stack);
		}
	};

	const initializeGroupData = async (groupID, userID) => {
		try {
			const currentGroupData = groupData;
			if ((Object.keys(currentGroupData).length === 0 && currentGroupData.constructor === Object) ||
				(currentGroupData.hasOwnProperty('id') && currentGroupData['id'] !== groupID)) {
				setGroupData(await fetchData(groupID, userID));
			}
		} catch (error) {
			console.log(error.stack);
		}
	};

	return (
		<GroupContext.Provider
			value = {{
				groupData,
				setGroupData,
				initializeGroupData
			}}>
			{children}
		</GroupContext.Provider>
	);
};