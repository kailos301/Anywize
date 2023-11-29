import React, { useEffect } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Navbar from 'components/Navbar';
import DarkLayout from 'components/Shared/DarkLayout';
import ToursNavbar from 'components/Masterbar/TourBar';
import { DatePicker } from 'components/Shared/mui-formik-inputs';

const locales = {
  'en-us': 'en',
  en: 'en',
  de: 'de'
};

const EditTour = () => {
  const [dates, setDates] = React.useState({
    from: moment().subtract(3, 'months').startOf('day'),
    to: moment().endOf('day'),
  });
  const { i18n, t } = useTranslation();

  return (
    <>
      <Navbar />
      <ToursNavbar />
      <DarkLayout doublebar>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={locales[i18n.language.toLowerCase()]}>
          <Box display="flex">
            <Box flex={1} mr={2}>
              <DatePicker
                onChange={(date) => {
                  if (date && date.isValid) {
                    setDates({ ...dates, from: date });
                  }

                  if (date === null) {
                    setDates({ ...dates, from: null });
                  }
                }}
                name="from"
                value={dates.from}
                errors={{}}
                label="From"
                required
              />
            </Box>
            <Box flex={1} mr={2}>
              <DatePicker
                onChange={(date) => {
                  if (date && date.isValid) {
                    setDates({ ...dates, to: date });
                  }

                  if (date === null) {
                    setDates({ ...dates, to: null });
                  }
                }}
                name="to"
                value={dates.to}
                errors={{}}
                label="To"
                required
              />
            </Box>
            <Box flex={1} mr={2}>
              <Box pt={2}>
                {
                  !!dates.from && !!dates.to && (
                    <Button
                      component="a"
                      variant="contained"
                      color="primary"
                      download
                      href={`${process.env.REACT_APP_API}routes/export/excel/${dates.from.startOf('day').format('YYYY-MM-DD HH:mm:ss')}/${dates.to.endOf('day').format('YYYY-MM-DD HH:mm:ss')}?taira=${localStorage.getItem('token')}`}
                    >
                      {t('Download')}
                    </Button>
                  )
                }
              </Box>
            </Box>
          </Box>
        </MuiPickersUtilsProvider>
      </DarkLayout>
    </>

  );
};

export default EditTour;
