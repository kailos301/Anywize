import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slices/userSlice";

const useStyles = makeStyles((theme) => ({
  _container: {
    backgroundColor: "#1F1F1F",
    height: "72px",
    padding: "0 130px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  _title: {
    color: "#F5F5F5",
    font: "normal normal normal 36px/40px Questrial",
  },
  _menuitem: {
    textDecoration: "none",
    padding: 0,
    color: "#F5F5F5",
    font: "normal normal normal 22px / 40px Questrial",
    width: "unset",
    display: "unset",
    margin: "0 16px",
    "& .MuiListItemText-primary": {
      font: "normal normal normal 16px/28px Questrial",
    },
  },
  _nav: {
    display: "flex",
  },
  _nomargin: {
    margin: 0,
  },
  _isactive: {
    color: "#6F9CEB",
    borderBottom: "1px solid #6F9CEB",
  },
  appbar: {
    backgroundColor: "#1F1F1F",
    top: "64px",
    marginBottom: theme.spacing(2),
  },
  toolbar: {
    paddingLeft: "130px",
    paddingRight: "130px",
    boxShadow: "0px 0px 4px #ffffff52",
    display: "flex",
    justifyContent: "space-between",

    [theme.breakpoints.down("md")]: {
      paddingLeft: "20px",
      paddingRight: "20px",
    },
  },
}));

const Masterbar = (props) => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const classes = useStyles();

  return (
    <Box mb={10}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes._title} variant="h4">
            {t(props.name)}
          </Typography>
          <List className={classes._nav} component="nav">
            {props.list
              .filter((item) => !item.permission || item.permission(user))
              .map((item, i) => (
                <ListItem
                  activeClassName={classes._isactive}
                  className={classes._menuitem}
                  key={i}
                  component={NavLink}
                  to={item.path}
                >
                  <ListItemText className={classes._nomargin}>
                    {t(item.name)}
                  </ListItemText>
                </ListItem>
              ))}
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Masterbar;
