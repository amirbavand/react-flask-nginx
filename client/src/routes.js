import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch  } from 'react-router-dom';
import Anotherpage from './anotherpage';
import Fib from './Fib'
import ReactUploadImage from './uploadImage'
import registerPage from './registerPage'
import profile from './profile'



const Routes = () => (
    <Router>
        <Switch>

            <Route exact path="/" component={Fib} />
            <Route exact path="/login" component={Fib} />

            <Route  path="/register" component={registerPage} />
            <Route exact path="/home" component={Anotherpage} />
            <Route path="/:user_name/:tweet_id" component={profile} />
            <Route path="/upload" component={ReactUploadImage} />

        </Switch>


    </Router>
);

export default Routes;
