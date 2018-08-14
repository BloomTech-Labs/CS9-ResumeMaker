// register, login, nav bar, landing page component

import { Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Templates from "./Templates";

class LandingPage extends Component {  
    render() {
        return (
          <div className="App">
            <h1 className="Header">Resume Maker</h1>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/Templates" component={Templates} />
          </div>
        );
      }
    }
    
    export default LandingPage;