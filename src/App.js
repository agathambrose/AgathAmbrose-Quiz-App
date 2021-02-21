import React, { Suspense } from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


const Home = React.lazy(() => import ('./components/home/Home'));
const Login = React.lazy (() => import ('./components/login/Login'));
const Register = React.lazy(() => import ('./components/register/Register'));
const QuizLandnPg = React.lazy(() => import ('./components/quiz/QuizLandnPg'))

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path ='/'>
              <Suspense fallback={<div>Loading, please wait...</div>}>
                  <Home/>
              </Suspense>
            </Route>

            <Route exact path = '/login'>
              <Suspense fallback={<div>Loading, please wait...</div>}>
                <Login/>
              </Suspense>
            </Route>

            <Route exact path = '/register'>
              <Suspense fallback={<div>Loading, please wait...</div>}>
                <Register/>
              </Suspense>
            </Route>

            <Route exact path = '/QuizLandnPg'>
              <Suspense fallback={<div>Loading, please wait...</div>}>
                <QuizLandnPg/>
              </Suspense>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;