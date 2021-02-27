import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css'
import { store } from './components/redux/features/store';
 import { setCurrentUser } from './components/redux/features/user/userSlice'
import setAuthKey from './components/utils/setAuthKey'


 if (localStorage.jwtToken && localStorage.role) {
  setAuthKey(localStorage.jwtToken);
  store.dispatch(setCurrentUser(localStorage.role));
}

ReactDOM.render(
  <StrictMode>
  <Provider store = {store}>
    <App />
  </Provider>
  </StrictMode>,
 
  document.getElementById('root')
);


