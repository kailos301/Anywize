import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/SaveSharp';
import CloseIcon from '@material-ui/icons/CloseSharp';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  primary: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  button: {
    color: 'gray',

    '& .cancel-save-btn-text': {
      opacity: '0',
      fontSize: '0.7rem !important',
    },

    '& svg': {
      transition: 'font-size 0.5s',
    },

    '&:hover': {
      '& svg': {
        fontSize: '1.8rem',
        transition: 'font-size 0.5s',
      },

      '& .cancel-save-btn-text': {
        opacity: '1',
        transition: 'opacity 0.5s',
      },
    },
  },
}));

const FormCancelSaveButton = ({
  disabled,
  onCancel,
  onSave,
}) => {
  const { t } = useTranslation();
  const classes = styles();

  return (
    <>
      {
        !!onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className={classes.button}
            size="large"
          >
            <span className="cancel-save-btn-text">{t('Cancel')}</span>
            &nbsp;
            <CloseIcon />
          </Button>
        )
      }
      <Button
        onClick={onSave}
        disabled={disabled}
        size="large"
        className={clsx(classes.button, classes.primary)}
      >
        <SaveIcon />
        &nbsp;
        <span className="cancel-save-btn-text">{t('Save')}</span>
      </Button>
    </>
  )
};

export default FormCancelSaveButton;
