import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { useTranslation } from 'react-i18next';
import { CURRENT_TOURS_COLUMNS } from 'constants/ui-constants'
import { getColumns, getLocalization } from "util/table-utils";
import { mapTableData } from 'util/helpers';
import { PATHS } from 'util/appConstants';
import { selectCurrent, selectRouteStatus, getCurrentRoutes } from 'redux/slices/routeSlice';
import arrowpanel from '../../assets/img/arrow-panel.svg';
import TableExpansionPanel from 'components/Routes/TableExpansionPanel';
import DarkLayout from 'components/Shared/DarkLayout';
import Navbar from 'components/Navbar';
import ToursNavbar from 'components/Masterbar/TourBar';

const CurrentTours = () => {
	const dispatch = useDispatch()
	const history = useHistory();
	const tableRef = useRef();
	const { t } = useTranslation();
	const routes = useSelector(selectCurrent);
	const [tabledata, settableData] = useState(routes)
	const loading = useSelector(selectRouteStatus);
	const myDivToFocus = useMemo(() => Array(tabledata.length).fill(0).map(i => React.createRef()), [tabledata.length]);
	console.info('routes: ', routes)

	useEffect(() => {
		if (!loading) {
			dispatch(getCurrentRoutes());
		}
	}, []);

	useEffect(() => {
		settableData(routes);
	}, [routes]);

	const scroll = (scrollOffset, rowData) => {
		myDivToFocus[rowData.tableData.id].current.scrollLeft += scrollOffset;
	};

	const markFavourite = (e, rowData) => {
		let favourites = localStorage.getItem('current-tours-favourites');
		favourites = favourites ? favourites.split(',') : [];

		if (rowData.is_favourite) {
			favourites = favourites.filter((f) => parseInt(f, 10) !== rowData.id);
		} else {
			favourites = favourites.concat([rowData.id]);
		}

		localStorage.setItem('current-tours-favourites', favourites.join(','));

		const newData = tableRef.current.state.data.map((item) => {
			if (item.id === rowData.id) {
				return {
					...item,
					is_favourite: !item.is_favourite,
				};
			}

			return item;
		});

		settableData(newData.sort((a, b) => b.is_favourite - a.is_favourite));
	}

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
					columns={getColumns(CURRENT_TOURS_COLUMNS(tableRef, markFavourite, redirectView, t), t)}
					options={{
						pageSize: 50,
						pageSizeOptions: [50, 100],
						sorting: false,
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
	)
}
export default CurrentTours;
