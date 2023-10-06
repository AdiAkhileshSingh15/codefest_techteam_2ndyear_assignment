import { useLocation } from "react-router-dom/cjs/react-router-dom";
import {Router,Route,Switch} from "react-router-dom";

const user = () => {
    const location=useLocation();
    const token=location.state.token;
    const location_Home={pathname:"/Home",state:{token:token}};
    const location_Create={pathname:"/Create",state:{token:token}};
    const location_Edit={pathname:"/Edit",state:{token:token}};

    return ( 
        <div className="User">
            <Navbar token={token}/>
            <Switch>
                <Route path={location_Home}></Route>
            </Switch>
            <Switch>
                <Route path={location_Create}></Route>
            </Switch>
            <Switch>
                <Route path={location_Edit}></Route>
            </Switch>
        </div>
     );
}
 
export default user;