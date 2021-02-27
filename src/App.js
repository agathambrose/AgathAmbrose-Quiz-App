import React, { Suspense } from 'react'
import './App.css';
import { Router, Route, Switch} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom' 
import history from './components/utils/history'
import Spinner from 'react-bootstrap/Spinner'
import Quiz from './components/quiz/Quiz'
import { Admin } from './components/quiz/Admin'




const Home = React.lazy(() => import ('./components/home/Home'));
const Login = React.lazy (() => import ('./components/login/Login'));
const Register = React.lazy(() => import ('./components/register/Register'));
const QuizLandnPg = React.lazy(() => import ('./components/quiz/QuizLandnPg'));
const AdminLandnPage = React.lazy(() => import ('./components/quiz/AdminLandnPage'));



const App = () => {

  const { authSuccessful, role} = useSelector((state) => state.user);

  return (
      <Router history = {history}>
        <Switch>
            <Route exact path ='/'>
              <Suspense fallback={<Spinner animation="grow" variant="secondary" className='d-flex justify-content-center mx-auto' />}>
                  <Home/>
              </Suspense>
            </Route>

            <Route exact path = '/login'>
              <Suspense fallback={<Spinner animation="grow" variant="secondary" className='d-flex justify-content-center mx-auto' />}>
              {authSuccessful && role === "User" ? 
              <Redirect to = '/quiz-landing-page'/> : 
                authSuccessful && role === "Admin" ?
                
              <Redirect to="/admin-landing-page" /> :
                (<Login/>)}
              </Suspense>
            </Route>

            <Route exact path = '/register'>
              <Suspense fallback={<Spinner animation="grow" variant="secondary" className='d-flex justify-content-center mx-auto' />}>
              {authSuccessful ? <Redirect to = '/'/> : <Register/>}
              </Suspense>
            </Route>

            <Route exact path = '/quiz-landing-page'>
              <Suspense fallback={<Spinner animation="grow" variant="secondary" className='d-flex justify-content-center mx-auto' />}>
                <QuizLandnPg/>
              </Suspense>
            </Route>

            <Route exact path = '/quiz'>
              <Suspense fallback={<Spinner animation="grow" variant="secondary" className='d-flex justify-content-center mx-auto' />}>
                <Quiz/>
              </Suspense>
            </Route>

            <Route exact path = '/admin'>
              <Suspense fallback = {<Spinner animation="grow" variant="secondary" className='d-flex justify-content-center mx-auto' />}>
                <Admin/>
              </Suspense>
            </Route>

            <Route exact path = '/admin-landing-page'>
            <Suspense fallback={<Spinner animation="grow" variant="secondary" className='d-flex justify-content-center mx-auto' />}>
              <AdminLandnPage/>
            </Suspense>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;