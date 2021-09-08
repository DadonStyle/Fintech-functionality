import { Redirect, Route, Switch } from "react-router-dom";
import { Page404 } from "./Page404";
import { Login } from "../Components/Login";
import MyTable from "../Components/MyTable/MyTable";
import FileHandle from "../Components/FilesHandle/FileHandle";
import CurrencyConvert from "../Components/CurrencyConvert/CurrencyConvert";
import Logout from "../Components/Logout";

export const Routing = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login-auth" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/table" component={MyTable} />
        <Route exact path="/file" component={FileHandle} />
        <Route exact path="/currency" component={CurrencyConvert} />

        <Redirect exact from="/" to="/login-auth" />
        <Route component={Page404} />
      </Switch>
    </div>
  );
};
