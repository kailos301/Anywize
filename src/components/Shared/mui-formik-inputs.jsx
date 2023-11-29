import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  Select as MaterialSelect,
  Checkbox as MaterialCheckbox,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MUIAutocomplete from '@material-ui/lab/Autocomplete';
import UnCheckedIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import CheckedIcon from '@material-ui/icons/CheckBoxSharp';
import CalendarIcon from '@material-ui/icons/EventSharp';

const getErrorForName = (errors, name) => {
  if (!errors) {
    return null;
  }

  if (errors[name]) {
    return errors[name];
  }

  if (name.includes(".")) {
    const split = name.split(".");

    if (errors[split[0]]) {
      let tmp = errors[split[0]];
      for (let i = 1; i < split.length; i += 1) {
        if (tmp[split[i]]) {
          tmp = tmp[split[i]];
        } else {
          tmp = null;
          break;
        }
      }

      if (tmp) {
        return tmp;
      }
    }
  }

  return null;
};

const getHelpOrError = (help, errors, name, t) => {
  const error = getErrorForName(errors, name);

  if (error) {
    return t(error);
  }

  if (help) {
    return help;
  }

  return null;
};

export const Password = (props) => {
  const [showPwd, setShowPwd] = React.useState(false);
  const { type, label, name, errors, value, help, ...rest } = props;
  const { t } = useTranslation();

  const changeShowPwd = () => {
    setShowPwd(!showPwd);
  };

  return (
    <TextField
      label={label || ""}
      margin="normal"
      name={name}
      type={showPwd ? "text" : "password"}
      value={value || ""}
      fullWidth={true}
      helperText={getHelpOrError(help, errors, name, t)}
      error={!!getErrorForName(errors, name)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={changeShowPwd}
            >
              {showPwd ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      variant="filled"
      {...rest}
    />
  );
};

export const Input = (props) => {
  const { type, label, name, errors, value, help, ...rest } = props;
  const { t } = useTranslation();

  return (
    <TextField
      label={label || ""}
      margin="dense"
      name={name}
      type={type || "text"}
      value={value || ""}
      fullWidth={true}
      helperText={getHelpOrError(help, errors, name, t)}
      error={!!getErrorForName(errors, name)}
      inputProps={{ autoComplete: 'off' }}
      variant="filled"
      {...rest}
    />
  );
};

export const InputOnlyNumbers = (props) => {
  const { type, label, name, errors, value, help, onChange, positive, ...rest } = props;
  const { t } = useTranslation();

  return (
    <TextField
      label={label || ""}
      margin="dense"
      name={name}
      type={type || "text"}
      value={value || ""}
      fullWidth={true}
      helperText={getHelpOrError(help, errors, name, t)}
      error={!!getErrorForName(errors, name)}
      inputProps={{ autoComplete: 'off' }}
      variant="filled"
      onChange={(e) => {
        if (positive) {
          if (!/^[0-9+\s]*$/.test(e.target.value)) {
            return;
          }
        } else {
          if (!/^[0-9+-\s]*$/.test(e.target.value)) {
            return;
          }
        }
        return onChange(e);
      }}
      {...rest}
    />
  );
};

export const Select = (props) => {
  const { type, label, name, errors, value, options, help, margin, ...rest } =
    props;
  const { t } = useTranslation();

  return (
    <FormControl fullWidth margin="none" style={{ marginTop: '8px' }}>
      {!!label && <InputLabel style={{ paddingLeft: '10px' }}>{label || ""}</InputLabel>}
      <MaterialSelect
        margin="dense"
        name={name}
        value={value || ""}
        fullWidth={true}
        error={!!getErrorForName(errors, name)}
        variant="filled"
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          getContentAnchorEl: null
        }}
        {...rest}
      >
        {options.map((o, i) => (
          <MenuItem key={i} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </MaterialSelect>
      <FormHelperText error={!!getErrorForName(errors, name)}>
        <span>{getHelpOrError(help, errors, name, t)}</span>
      </FormHelperText>
    </FormControl>
  );
};

export const Textarea = (props) => {
  const { label, name, value, help, errors, ...rest } = props;
  const { t } = useTranslation();

  return (
    <TextField
      label={label || ""}
      margin="normal"
      name={name}
      type={"text"}
      value={value || ""}
      fullWidth={true}
      helperText={getHelpOrError(help, errors, name, t)}
      error={!!getErrorForName(errors, name)}
      {...rest}
      multiline={true}
      rows={3}
      variant="filled"
      inputProps={{ autoComplete: 'off' }}
    />
  );
};

export const Checkbox = (props) => {
  const { label, name, value, ...rest } = props;

  return (
    <MaterialCheckbox
      checked={value}
      value={value}
      name={name}
      icon={<UnCheckedIcon />}
      checkedIcon={<CheckedIcon />}
      {...rest}
    />
  );
};

export const Autocomplete = ({
  name,
  value,
  label,
  help,
  errors,
  options,
  required,
  onChange,
  settings,
  onBlur,
  disabled,
}) => {
  const { t } = useTranslation();
  const opts = {
    disableClearable: false,
    freeSolo: false,
    valueProp: 'value',
    labelProp: 'label',
    filterOptions: null,
    disableInputWhenNoOptions: true,
    ...settings,
  };

  const getValue = (o) => {
    if (typeof opts.valueProp === 'function') {
      return opts.valueProp(o);
    }

    return o[opts.valueProp];
  };

  const getLabel = (o) => {
    if (typeof opts.labelProp === 'function') {
      return opts.labelProp(o);
    }

    return o[opts.labelProp];
  };

  // this prevents a bug when we have an input with
  // options fetched from the api. The input loads before the api
  // and later on the currently selected item is not properly marked.
  if (!options.length && opts.disableInputWhenNoOptions) {
    return (
      <Select
        name={name}
        value={value}
        label={label}
        help={help}
        errors={errors}
        options={[{ label: t('No options'), value: null, disabled: true }]}
        required={required}
        onChange={null}
        onBlur={null}
        disabled={disabled}
        variant="filled"
      />
    );
  }

  return (
    <FormControl fullWidth margin="none">
      <MUIAutocomplete
        id='new-select-autocomplete'
        fullWidth
        value={value ? options.find((o) => getValue(o) === value) : null}
        options={options}
        disableClearable={opts.disableClearable}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        onBlur={onBlur}
        disabled={disabled}
        freeSolo={opts.freeSolo}
        getOptionLabel={(option) => getLabel(option)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t(label)}
            required={required}
            inputProps={{
              ...params.inputProps,
              autoComplete: `off`,
            }}
            margin="dense"
            error={!!getHelpOrError(null, errors, name, t)}
            helperText={getHelpOrError(help, errors, name, t)}
            variant="filled"
          />
        )}
        {...(opts.filterOptions ? { filterOptions: opts.filterOptions } : {})}
      />
    </FormControl>
  );
};

export const DatePicker = (props) => {
  const { label, name, errors, value, help, onChange, required, disablePast, clearable } = props;
  const { t } = useTranslation('common');

  return (
    <KeyboardDatePicker
      name={name}
      value={value}
      placeholder="DD.MM.YYYY"
      onChange={onChange}
      disablePast={disablePast}
      clearable={clearable}
      cancelLabel={t('Cancel')}
      okLabel={t('Ok')}
      keyboardIcon={<CalendarIcon />}
      format="DD.MM.YYYY"
      label={<span style={{ color: 'white' }}>{t(label)}</span>}
      margin="dense"
      autoOk
      inputProps={{
        autoComplete: 'off',
      }}
      required={required}
      fullWidth
      error={!!getHelpOrError(null, errors, name, t)}
      helperText={getHelpOrError(help, errors, name, t)}
    />
  );
};