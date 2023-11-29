import React from "react";
import { Box } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import RequireAuth from "components/hoc/require-auth";
import {
  Login,
  ToursList,
  TourDetail,
  AddTour,
  EditTour,
  CustomersList,
  CustomerDetail,
  CurrentTours,
  RecentTours,
  ArchiveTours,
  AddCustomer,
  EditCustomer,
  AddOrder,
  OrderList,
  EditOrder,
  PastDeliveries,
  RoutesMap,
  RoutesMapDebug,
  TourExport,
} from "views";
import { PATHS } from "../../util/appConstants";
import Redirect from "./Redirect";

const AppRouter = () => {
  return (
    <Box minHeight="100vh" maxWidth="100%">
      <Box minHeight="100vh">
        <Switch>
          <Route exact path={PATHS.login} component={Login} />
          {/**tours */}
          <Route
            exact
            path={PATHS.tours.root}
            component={RequireAuth(ToursList)}
          />
          <Route
            exact
            path={PATHS.tours.add}
            component={RequireAuth(AddTour)}
          />
          <Route
            exact
            path={PATHS.tours.edit}
            component={RequireAuth(EditTour)}
          />
          <Route
            exact
            path={PATHS.tours.detail}
            component={RequireAuth(TourDetail)}
          />
          <Route
            exact
            path={PATHS.tours.current}
            component={RequireAuth(CurrentTours)}
          />
          <Route
            exact
            path={PATHS.tours.recent}
            component={RequireAuth(RecentTours)}
          />
          <Route
            exact
            path={PATHS.tours.archive}
            component={RequireAuth(ArchiveTours)}
          />
          <Route
            exact
            path={PATHS.tours.export}
            component={RequireAuth(TourExport)}
          />
          {/**customers */}
          <Route
            exact
            path={PATHS.customers.root}
            component={RequireAuth(CustomersList)}
          />
          <Route
            exact
            path={PATHS.customers.detail}
            component={RequireAuth(CustomerDetail)}
          />
          <Route
            exact
            path={PATHS.customers.add}
            component={RequireAuth(AddCustomer)}
          />
          <Route
            exact
            path={PATHS.customers.edit}
            component={RequireAuth(EditCustomer)}
          />
          <Route
            exact
            path={PATHS.orders.root}
            component={RequireAuth(OrderList)}
          />
          <Route
            exact
            path={PATHS.orders.add}
            component={RequireAuth(AddOrder)}
          />
          <Route
            exact
            path={PATHS.orders.edit}
            component={RequireAuth(EditOrder)}
          />
          <Route
            exact
            path={PATHS.pastdeliveries}
            component={RequireAuth(PastDeliveries)}
          />
          <Route
            exact
            path={`${PATHS.tours.map}/:routeId?/:customerId?`}
            component={RequireAuth(RoutesMap)}
          />
          <Route
            exact
            path={"/routes/map/debug/:routeId?"}
            component={RequireAuth(RoutesMapDebug)}
          />
          <Redirect component={RequireAuth(Redirect)} />
        </Switch>
      </Box>
    </Box>
  );
};

export default AppRouter;
