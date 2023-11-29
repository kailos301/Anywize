import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import MyLocationRoundedIcon from '@material-ui/icons/MyLocationRounded';
import NoteAddRoundedIcon from '@material-ui/icons/NoteAddRounded';
import CloseIcon from '@material-ui/icons/Close';
import BackIcon from '@material-ui/icons/SettingsBackupRestore';
import WarningIcon from '@material-ui/icons/WarningSharp';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const URL = process.env.REACT_APP_API;

const useStyles = makeStyles((theme) => ({
	_box: {
		color: 'white',
		display: 'flex',
		alignItems: 'center',
		padding: '10px 15px',
		border: '1px solid transparent',
		cursor: 'pointer',
		// "&:hover": {
		//     borderColor: "#6F9CEB",
		// },
	},
	_routename: {
		font: 'normal normal normal 18px/24px Roboto',
		color: '#F5F5F5'
	},
	_customername: {
		font: 'normal normal normal 22px/40px Questrial',
		color: '#F5F5F5',
		display: 'block',
		margin: '20px 0'

	},
	_routedetails: {
		display: 'flex',
		alignItems: 'center',
		color: '#F5F5F5',
		font: 'normal normal normal 12px/24px Roboto',
		margin: '20px 0',
		lineHeight: '15px',

		'& svg': {
			marginRight: '10px',
		},

		'& a': {
			color: '#6F9CEB',
		},
	},
	_galleryheading: {
		color: '#F5F5F5',
		marginBottom: '25px',
		marginTop: '60px',
	},
	picture: {
		width: 'auto',
		maxHeight: '300px',
		cursor: 'pointer',
	},
	_warning: {
		color: `${theme.palette.warning.light} !important`,
	}
}));

const Stopview = ({ route, customer, onClose, onSkipStop }) => {
	const [skipWarning, setSkipWarning] = React.useState(false);
	const classes = useStyles();
	const { t } = useTranslation();

	const stop = route.Stops.find((s) => s.customer_id === customer.id);

	return (
		<Box>
			<Box textAlign="right">
				<IconButton onClick={onClose}>
					<CloseIcon style={{ color: 'white' }} />
				</IconButton>
			</Box>
			<Box p={2}>
				<Box>
					<Typography className={classes._routename}>T{route.uuid} {route.Tour.name}</Typography>
					<Typography className={classes._customername}>{!customer.alias ? customer.name : customer.alias} </Typography>
				</Box>
				{
					!stop && !customer.Orders.some((o) => o.delivered_at) && !customer.skipped_at && (
						<Box mb={2}>
							{
								!skipWarning && (
									<Box textAlign="right">
										<Button type="button" size="small" variant="outlined" color="primary" onClick={() => setSkipWarning(true)}>
											{t('Skip this stop')}
										</Button>
									</Box>
								)
							}
							{
								skipWarning && (
									<Box boxShadow={3} border="1px solid #656565" p={2}>
										<Alert severity="warning" elevation={3}>
											{t('Skipping the stop is irreversible')}
										</Alert>
										<Box textAlign="right">
											<Button type="button" size="small" variant="contained" color="secondary" onClick={() => setSkipWarning(false)}>
												{t('Go back')}
											</Button>
											&nbsp;
											<Button type="button" size="small" variant="outlined" color="primary" onClick={() => onSkipStop(route.id, customer.id)}>
												{t('Skip this stop')}
											</Button>
										</Box>
									</Box>
								)
							}
						</Box>
					)
				}
				<Box>
					<div className={classes._routedetails}>
						<LocationOnIcon />&nbsp;
						<Typography>
							{customer.street} {customer.street_number}, {customer.city} ({customer.zipcode}), {customer.country}
						</Typography>
					</div>
					<div className={classes._routedetails}>
						<PersonIcon />&nbsp;
						<Typography>{t(customer.contact_salutation)} {customer.contact_name} {customer.contact_surname}</Typography>
					</div>
					<div className={classes._routedetails}>
						<EmailIcon />&nbsp;
						<Typography>{customer.email}</Typography>
					</div>
					<div className={classes._routedetails}>
						<CallIcon />&nbsp;
						<Typography>{customer.phone}</Typography>
					</div>
					{
						customer.skipped_at && (
							<div className={classes._routedetails}>
								<WarningIcon className={classes._warning} />&nbsp;
								<Typography className={classes._warning} >{t('Skipped at')} {moment(customer.skipped_at).format('DD.MM.YYYY HH:mm')}</Typography>
							</div>
						)
					}

				</Box>
				{
					!!stop && (
						<>
							{
								(!!stop.pictures.length) && (
									<Box mt={4}>
										<Typography variant="h6" className={classes._galleryheading}>{t('Photos')}</Typography>
										<Carousel
											infiniteLoop={true}
											autoPlay={false}
											showArrows={true}
											showIndicators={false}
											showThumbs={false}
											onClickItem={(i) => {
												return window.open(stop.pictures[i], '_blank');
											}}
											statusFormatter={(c, total) => `${c} ${t('of')} ${total}`}
										>
											{
												stop.pictures.map((p) => (
													<Box key={p}>
														<img className={classes.picture} src={p} alt="" />
													</Box>
												))
											}
										</Carousel>
									</Box>
								)
							}
							<Box mt={4}>
								<Typography variant="h6" className={classes._galleryheading}>{t('Delivery')}</Typography>
								<div>
									<div className={classes._routedetails}>
										<NoteAddRoundedIcon />&nbsp;
										<Typography>
											{moment(stop.time).format('DD.MM.YYYY HH:mm')}
											{
												!stop.goods_back && (
													<>
														<br />

														<a href={`${URL}routes/${route.id}/proof-of-delivery/${customer.id}?taira=${localStorage.getItem('token')}`} target="_blank">
															{t('proof of delivery')}
														</a>
													</>
												)
											}

										</Typography>
									</div>
									{
										!!stop.goods_back && (
											<div className={classes._routedetails}>
												<BackIcon />
												<Typography>{t(stop.reason)}</Typography>
											</div>
										)
									}
									<div className={classes._routedetails}>
										<MyLocationRoundedIcon />&nbsp;
										<Typography>
											{stop.location.coordinates[1]}, {stop.location.coordinates[0]}
										</Typography>
									</div>
									<div className={classes._routedetails}>
										<PersonIcon />&nbsp;
										<Typography>{stop.driver_name}</Typography>
									</div>
									<div className={classes._routedetails}>
										<CallIcon />&nbsp;
										<Typography>{stop.driver_phone}</Typography>
									</div>
								</div>
							</Box>
						</>
					)
				}

				<Typography variant="h6" className={classes._galleryheading}>{t('Orders')}</Typography>

				{
					customer.Orders.map((order, i) =>
						<Box key={i} className={classes._box} style={{ background: i % 2 === 0 ? ' #1F1F1F ' : '#525252', }}>
							<Box flex={1} pr={3}>
								<Typography variant="body2">{order.number}</Typography>
							</Box>
							<Box flex={4}>
								<Typography variant="body2">{order.description}</Typography>
							</Box>
						</Box>
					)
				}
			</Box>
		</Box >
	);
};

export default Stopview;