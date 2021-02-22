import React, { Suspense } from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'


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
              <Suspense fallback={<Spinner animation="grow" variant="secondary" className='d-flex justify-content-center mx-auto' />}>
                  <Home/>
              </Suspense>
            </Route>

            <Route exact path = '/login'>
              <Suspense fallback={<Spinner animation="grow" variant="secondary" className='d-flex justify-content-center mx-auto' />}>
                <Login/>
              </Suspense>
            </Route>

            <Route exact path = '/register'>
              <Suspense fallback={<Spinner animation="grow" variant="secondary" className='d-flex justify-content-center mx-auto' />}>
                <Register/>
              </Suspense>
            </Route>

            <Route exact path = '/QuizLandnPg'>
              <Suspense fallback={<Spinner animation="grow" variant="secondary" className='d-flex justify-content-center mx-auto' />}>
                <QuizLandnPg/>
              </Suspense>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;