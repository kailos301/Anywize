import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { useTranslation } from 'react-i18next';
import { PATHS } from 'util/appConstants';
import { CURRENT_TOURS_COLUMNS } from 'constants/ui-constants'
import { getColumns, getLocalization } from "util/table-utils";
import { mapTableData } from 'util/helpers';
import TableExpansionPanel from 'components/Routes/TableExpansionPanel';
import { selectCompleted, selectRouteStatus, getFinisedRoutes } from 'redux/slices/routeSlice';
import arrowpanel from '../../assets/img/arrow-panel.svg';
import DarkLayout from 'components/Shared/DarkLayout';
import Navbar from 'components/Navbar';
import ToursNavbar from 'components/Masterbar/TourBar';

const RecentTours = () => {
	const history = useHistory();
	const dispatch = useDispatch()
	const tableRef = useRef();
	const { t } = useTranslation();
	const routes = useSelector(selectCompleted);
	const [tabledata, settableData] = useState(routes)
	const loading = useSelector(selectRouteStatus);
	const myDivToFocus = useMemo(() => Array(tabledata.length).fill(0).map(i => React.createRef()), [tabledata.length]);

	useEffect(() => {
		if (!loading) {
			dispatch(getFinisedRoutes());
		}
	}, []); // eslint-disable-line

	useEffect(() => {
		settableData(routes);
	}, [routes]);

	const scroll = (scrollOffset, rowData) => {
		myDivToFocus[rowData.tableData.id].current.scrollLeft += scrollOffset;
	};

	const redirectView = (pathway, rowData) => {
		if (!pathway) {
			return history.push({ pathname: `${PATHS.tours.map}/${rowData.id}` });
		}

		history.push({ pathname: `${PATHS.tours.map}/${rowData.id}/${pathway.id}` });
	};

	return (
		<>
			<Navbar />
			<ToursNavbar />
			<DarkLayout doublebar loading={loading}>
				<MaterialTable
					tableRef={tableRef}
					data={mapTableData(tabledata)}
					localization={getLocalization(t)}
					columns={getColumns(CURRENT_TOURS_COLUMNS(tableRef, null, redirectView, t), t)}
					options={{
						pageSize: 50,
						pageSizeOptions: [50, 100],
						paging: false,
						detailPanelColumnAlignment: 'right',
						header: false,
						searchFieldAlignment: "left",
						showTitle: false,
						cellStyle: {
							color: 'white',
							border: 'none',
							font: 'normal normal normal 18px/24px Roboto',
						},
						rowStyle: rowData => {
							if (rowData.tableData.id % 2 === 0) {
								return { backgroundColor: ' #1F1F1F ' };
							}
							else {
								return { backgroundColor: '#525252' };
							}
						}
					}}
					detailPanel={[
						{
							icon: () => <img alt="icon" src={arrowpanel} style={{
								width: '22px',
								height: ' 10px',
								transform: ' rotate(180deg)'
							}} />,
							openIcon: () => <img alt="icon" src={arrowpanel} style={{
								width: '22px',
								height: ' 10px'
							}} />,
							render: rowData => {
								return (
									<TableExpansionPanel
										{...{
											rowData, scroll, redirectView, myDivToFocus,
										}}
									/>
								);
							}
						}
					]}
				/>
			</DarkLayout>
		</>
	);
};

export default RecentTours;
