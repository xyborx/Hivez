import React, {useContext, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';
import {GroupContext} from '../../contexts/group.context';
import {LocalizationContext} from '../../contexts/language.context';
import {SpinnerContext} from '../../contexts/spinner.context';
import {UserContext} from '../../contexts/user.context';
import {createDate, currentDate} from '../../utils/date.utils';
import {groupByDay, orderByDate, sum, where} from '../../utils/query.utils';
import {rupiahFormatting} from '../../utils/helper.utils';
import GroupReport from '../../components/Group/GroupReport.component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNFetchBlob from 'rn-fetch-blob';
import Share from "react-native-share";
import {get} from '../../utils/api.utils';

const GroupReportPage = ({route, navigation}) => {
	const {groupID} = route.params;

	const {groupData, initializeGroupData} = useContext(GroupContext);
	const {appLanguage, translations} = useContext(LocalizationContext);
	const {showSpinner, hideSpinner} = useContext(SpinnerContext);
	const {userData} = useContext(UserContext);

	const [reportDetail, setReportDetail] = useState({
		openingBalance: 0,
		inflow: 0,
		outflow: 0,
		endingBalance: 0
	});
	const [transactionList, setTransactionList] = useState([]);
	const [startDate, setStartDate] = useState(currentDate);
	const [endDate, setEndDate] = useState(currentDate);
	const [showReport, setShowReport] = useState(false);

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				showSpinner();
				try {
					await initializeGroupData(groupID, userData.id);
				} catch (error) {
					console.log(error.stack);
				};
				hideSpinner();
			};
			fetchData();
		}, [groupID])
	);

	const transactionListFormatter = (transactionList) => {
		return groupByDay(orderByDate(transactionList, 'date'), 'date').map(item => {
			const income = sum(where(item.data, 'type', str => str === 'INCOME'), 'value');
			const expense = sum(where(item.data, 'type', str => str === 'EXPENSE'), 'value');
			return {...item, sum: income - expense};
		});
	};

	const onChangeStartDate = (startDate) => {
		const formattedDate = createDate(startDate);
		setStartDate(formattedDate);
	};

	const onChangeEndDate = (endDate) => {
		const formattedDate = createDate(endDate);
		setEndDate(formattedDate);
	};

	const resetDate = () => {
		const formattedStartDate = createDate(currentDate);
		const formattedEnd = createDate(currentDate);
		setStartDate(formattedStartDate);
		setEndDate(formattedEnd);
		setShowReport(false);
	};

	const viewReport = async () => {
		try {
			const transactions = await get(`groups/${groupID}/report?start-date=${createDate(startDate).format('YYYY-MM-DD')}&end-date=${createDate(endDate).format('YYYY-MM-DD')}`);
			setReportDetail({
				openingBalance: transactions['output_schema']['opening_balance'],
				inflow: transactions['output_schema']['inflow'],
				outflow: transactions['output_schema']['outflow'],
				endingBalance: transactions['output_schema']['ending_balance']
			});
			setTransactionList(
				transactionListFormatter(
					transactions['output_schema']['transaction_list'].map(transaction => {
						return {
							id: transaction['id'],
							name: transaction['description'],
							date: transaction['date'],
							requester: transaction['requester_name'],
							image: transaction['requester_picture'],
							type: transaction['type'],
							value: transaction['amount'],
							source: transaction['source'],
							approver: ''
						}
					})
				)
			);
			setShowReport(true);
		} catch (error) {
			console.log(error.stack);
		}
	};

	const downloadReport = async () => {
		const isGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
		if (isGranted) {
			const style =
			`<style>
				table, th, td {border: 1px solid black;}
			</style>`;

			const header =
			`<h1>Group Report ${groupData.name}</h1>
			<p>Periode</p>
			<p>${createDate(startDate).format('DD-MM-YYYY')} - ${createDate(endDate).format('DD-MM-YYYY')}<p>`;

			const table =
			`<table style='width:100%'>
				<tr>
					<th>Tanggal</th>
					<th>Deskripsi</th>
					<th>Pemasukan</th>
					<th>Pengeluaran</th>
					<th>Pengaju</th>
					<th>Penyetuju</th>
				<tr>
				${transactionList.map(transactions => {
					return `<tr>
						<td rowspan='${transactions.data.length}'>${createDate(transactions.id).format('DD-MM-YYYY')}</td>
						<td>${transactions.data[0].name}</td>
						${transactions.data[0].type === 'INCOME' ?
							`<td>${rupiahFormatting(transactions.data[0].value)}</td><td></td>` :
							`<td></td><td>${rupiahFormatting(transactions.data[0].value)}</td>`}
						<td>${transactions.data[0].requester}</td>
						<td></td>
					</tr>
					${transactions.data.length > 1 ? transactions.data.slice(1).map(transactionDetail => {
						return `<tr>
							<td>${transactionDetail.name}</td>
							${transactionDetail.type === 'INCOME' ?
								`<td>${rupiahFormatting(transactionDetail.value)}</td><td></td>` :
								`<td></td><td>${rupiahFormatting(transactionDetail.value)}</td>`}
							<td>${transactionDetail.requester}</td>
							<td></td>
						</tr>`
					}).join('') : ''}
				`}).join('')}
			</table>`;

			let options = {
				html: `${style}${header}${table}`,
				fileName: 'Report'
			};
		
			let file = await RNHTMLtoPDF.convert(options);

			const shareOptions = {
				message: 'message',
				title: 'title',
				url: `file://${file.filePath}`
			};
			Share.open(shareOptions).then(res => console.log(res)).catch(err => console.log(err));
		}
	};

	const viewGroupBillDetail = (billID) => {
		navigation.navigate('GroupBillDetail', {
			billID: billID,
			groupID: groupID
		});
	};

	const viewGroupRequestDetail = (requestID) => {
		navigation.navigate('GroupRequestDetail', {
			requestID: requestID,
			groupID: groupID
		});
	};

	const goBack = () => {
		navigation.replace('GroupList');
	};

	const openDrawer = () => {
		navigation.openDrawer();
	};

	return (
		<GroupReport
			contentText={translations['GroupReport']}
			groupDetail={groupData}
			reportDetail={reportDetail}
			transactionList={transactionList}
			startDate={startDate}
			setStartDate={onChangeStartDate}
			endDate={endDate}
			setEndDate={onChangeEndDate}
			showReport={showReport}
			resetDate={resetDate}
			viewReport={viewReport}
			downloadReport={downloadReport}
			viewGroupBillDetail={viewGroupBillDetail}
			viewGroupRequestDetail={viewGroupRequestDetail}
			openDrawer={openDrawer}
			goBack={goBack} />
	);
};

export default GroupReportPage;