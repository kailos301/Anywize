import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import { makeStyles } from "@material-ui/core/styles";
import arrow from "../../assets/img/arrow.svg";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slices/userSlice";

const useStyles = makeStyles({
  _container: {
    backgroundColor: "#121212",
    padding: "60px 130px",
    minHeight: "60vh",
    "& .MuiInputBase-root": {
      color: "#F5F5F5",
    },
    "& .MuiPaper-elevation2": {
      boxShadow: "none",
    },
    "& .MuiTableCell-root": {
      border: "none",
      color: "white",
      fontSize: "12px",
      width: "unset !important",
    },
    "& .MuiTableSortLabel-root:hover": {
      color: "#F5F5F5",
    },
    "& .MuiTablePagination-root": {
      border: "none",
      color: "white",
    },
    "& .MuiPaper-root ": {
      backgroundColor: "#121212",
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #525252",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "1px solid #525252",
    },
    "& .MuiIconButton-root *.MuiSvgIcon-root , .MuiIconButton-root": {
      color: "#F5F5F5",
    },
    "& .MuiTableCell-alignLeft *.MuiSvgIcon-root": {
      color: "#ADADAD",
      width: "22px",
      height: "22px",
      cursor: "pointer",
    },
    "& .MuiTypography-root": {
      color: "#F5F5F5",
    },
  },
  _tourdetailbar: {
    background: "#6F9CEB",
    width: "255px",
    height: "70px",
    position: "absolute",
    right: 0,
    marginTop: "-240px",
    display: "flex",
    alignItems: "center",
    justifyContent: " space-around",
    color: "black",
    "&::before": {
      content: '""',
      height: 0,
      width: 0,
      position: "absolute",
      left: "46%",
      bottom: "-40px",
      border: "20px solid transparent",
      borderTopColor: "#6F9CEB",
      // borderRightColor: '#DA362A',
    },
  },
  _codetext: {
    fontSize: "15px",
  },
  _codedetail: {
    fontSize: "15px",
    fontWeight: "bold",
  },
  _1F1F1F: {
    background: "#1F1F1F",
  },
  _525252: {
    background: "#525252",
  },
  _textalignright: {
    textAlign: "right",
  },
  _edit: {
    background: "#6F9CEB",
    borderRadius: "50%",
    padding: "2px",
    width: "13px",
    height: "13px",
  },
  _pointer: {
    cursor: "pointer",
  },
  _width111: "111px",
  _fontsize12: {
    fontSize: "12px",
    cursor: "pointer",
    height: "8px",
  },
});

const TableExpansionPanel = ({
  rowData,
  scroll,
  redirectView,
  myDivToFocus,
}) => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  return (
    <div
      style={{
        padding: "15px",
        background: rowData.tableData.id % 2 === 0 ? " #1F1F1F " : "#525252",
      }}
    >
      <>
        <div
          style={{
            width: "5%",
            float: "left",
            margin: "25px 0",
            textAlign: "center",
          }}
        >
          <div
            style={{ display: "inline-block" }}
            onClick={() => scroll(-12000, rowData)}
          >
            <img
              alt="icon"
              src={arrow}
              className={classes._fontsize12}
              style={{ transform: "rotate(180deg)" }}
            />
            <img
              alt="icon"
              src={arrow}
              className={classes._fontsize12}
              style={{ transform: "rotate(180deg)" }}
            />
          </div>
          <img
            alt="icon"
            src={arrow}
            onClick={() => scroll(-100, rowData)}
            className={classes._fontsize12}
            style={{ marginLeft: "15px", transform: "rotate(180deg)" }}
          />
        </div>
        <div
          style={{
            width: "5%",
            float: "right",
            margin: "25px 0",
            textAlign: "center",
          }}
        >
          <img
            alt="icon"
            style={{ marginRight: "15px" }}
            src={arrow}
            onClick={() => scroll(12000, rowData)}
            className={classes._fontsize12}
          />
          <div
            style={{ display: "inline-block" }}
            onClick={() => scroll(100, rowData)}
          >
            <img alt="icon" src={arrow} className={classes._fontsize12} />
            <img alt="icon" src={arrow} className={classes._fontsize12} />
          </div>
        </div>
        <div
          ref={myDivToFocus[rowData.tableData.id]}
          className={"hide-scrollbar"}
          style={{
            maxWidth: "90%",
            overflow: "scroll",
            scrollBehavior: "smooth",
          }}
        >
          <div>
            <ProgressBar
              className={"margin-30"}
              percent={100}
              width={`${(rowData.pathway.length - 1) * 10}%`}
              height={2}
              filledBackground="#6F9CEB"
              unfilledBackground=""
            >
              {rowData.pathway.map((data, index) => {
                const delivered = data.Orders.every((o) => o.delivered_at);

                return (
                  <Step transition="scale" key={index}>
                    {({ accomplished }) => (
                      <div
                        style={{
                          filter: `grayscale(${accomplished ? 0 : 40}%)`,
                        }}
                      >
                        <div
                          style={{
                            marginTop: "-14px",
                            position: "absolute",
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                          {index + 1}
                        </div>

                        <div
                          onClick={() =>
                            user?.permissions?.routesMap
                              ? redirectView(data, rowData)
                              : null
                          }
                          style={{
                            background:
                              rowData.tableData.id % 2 === 0
                                ? " #1F1F1F "
                                : "#525252",
                          }}
                          className={
                            delivered && !data.goods_back
                              ? "ball"
                              : delivered && data.goods_back
                              ? "red-ball"
                              : data.skipped_at
                              ? "ball-warning"
                              : "ball-open"
                          }
                        ></div>
                        <div
                          style={{
                            position: "absolute",
                            marginTop: "5px",
                            width: "100px",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {data.alias || data.name}
                        </div>
                      </div>
                    )}
                  </Step>
                );
              })}
            </ProgressBar>
          </div>
        </div>
      </>
    </div>
  );
};

export default TableExpansionPanel;
