import React, {createContext, useState, useEffect} from 'react';
import {get} from '../utils/api.utils';

export const GroupContext = createContext();

export const GroupProvider = ({children}) => {
	const [groupData, setGroupData] = useState({});

	const fetchDta = async (groupID) => {
		const data = await get(`/groups/${groupID}/detail`);
		const image = await get(`/groups/${groupID}/picture`);
		return {
			id: groupID,
			image: image['output_schema']['group_picture'],
			name: data['output_schema']['group_name'],
			description: data['output_schema']['group_description'],
			allowSearchByName: data['output_schema']['is_searchable'] === 'Y' ? true : false,
			balance: data['output_schema']['group_balance']
		};
	};

	const initializeGroupData = async (groupID) => {
		const currentGroupData = groupData;

		if (Object.keys(currentGroupData).length === 0 && currentGroupData.constructor === Object) {
			const newGroupData = await fetchDta(groupID);
			setGroupData(newGroupData);
			return newGroupData;
		} else if (currentGroupData.hasOwnProperty('id') && currentGroupData['id'] !== groupID) {
			const newGroupData = await fetchDta(groupID);
			setGroupData(newGroupData);
			return newGroupData;
		} else {
			return currentGroupData;
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