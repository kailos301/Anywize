import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from "@material-ui/core/styles";
import copy from '../../assets/img/copy.svg';

const useStyles = makeStyles({
  _tourdetailbar: {
    background: '#93B5F0',
    width: '205px',
    height: '57px',
    position: 'relative',
    // right: 0,
    top: '-10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: ' space-around',
    marginLeft: '-25px',
    color: 'black',
    "&::before": {
      content: '""',
      height: 0,
      width: 0,
      position: 'absolute',
      left: '46%',
      bottom: '-36px',
      border: '20px solid transparent',
      borderTopColor: '#93B5F0',
      // borderRightColor: '#DA362A',
    }
  },
  _codetext: {
    fontSize: '15px',
  },
  _codedetail: {
    font: 'normal normal bold 12px/24px Roboto',
    color: '#121212'
  },
  _codevalue: {
    font: ' normal normal normal 12px/24px Roboto',
    letterSpacing: '0px',
    color: '#121212'
  },
  _1F1F1F: {
    background: '#1F1F1F',
  },
  _525252: {
    background: '#525252',
  },
  _textalignright: {
    textAlign: 'right',

  },
  _edit: {
    background: '#6F9CEB',
    borderRadius: '50%',
    padding: '2px',
    width: '13px',
    height: '13px',
  },
  _pointer: {
    cursor: 'pointer'
  },
  _width111: '111px ',
  _fontsize12: {
    fontSize: '12px',
    cursor: 'pointer'
  }
});
export default function TooltipBar(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const copyCode = () => {
    props.name === 'callicon' ?
      navigator.clipboard.writeText(`Mobile:${props.rowData.driver_phone}`) :
      navigator.clipboard.writeText(`Tourcode:${props.rowData.code}, Password:${props.rowData.password}`)
  };

  return (
    <div className={classes._tourdetailbar} >
      {console.log(props, "props")}
      {props.name === 'callicon' ?
        <div className={classes._codetext}>
          <span className={classes._codedetail}>Mobile:</span> <span className={classes._codevalue}>{props.rowData.driver_phone}</span>
        </div>
        :
        <div className={classes._codetext}>
          <div>
            <span className={classes._codedetail}>{t('Tourcode')}:</span><span className={classes._codevalue}> {props.rowData.code}</span>
          </div>
          <div style={{ marginTop: '-5px' }}>
            <span className={classes._codedetail}>{t('Password')}:</span> <span className={classes._codevalue}>{props.rowData.password}</span>
          </div>
        </div>
      }
      <img alt="icon" src={copy} onClick={copyCode} style={{ color: 'black', cursor: 'pointer' }} />
    </div>
  )
}
