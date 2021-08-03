import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Home } from './screens'
import root from './redux/reducers'
import firebaseConfig from './utils/firebaseConfig'
import './App.css'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAppAuth = firebaseApp.auth()
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
}

const store = createStore(root)

interface Props {
  user?: any
}

const Root: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <div>
            <nav className='navbar'>

              <div>
                <div style={{ float: 'left', marginLeft: '8%', color: '#F2F2FC' }}>
                  <h1 className='title'><Link to='/'>ProGress Tracker</Link></h1>
                </div>
                <ul>

                  <li>
                    <NavLink exact to='/login/'>Log In</NavLink>
                  </li>

                  <li>
                    <NavLink exact to='/input/'>Add</NavLink>
                  </li>
                  <li>
                    <NavLink to='/trainings'>Trainings</NavLink>
                  </li>
                  <li>
                    <NavLink exact to='/'>Home</NavLink>
                  </li>
                </ul>
              </div>
            </nav>
            <Route path='/' exact render={() => <Home user={props.user} />} />
            {
              /*
              <Route path='/input/' render={() => <Input {...props} />} />
              <Route path='/login/' render={() => <LogIn {...props} />} />
              <Route path='/trainings' exact render={() => <Trainings user={props.user} />} />
              <Route path='/trainings/:timestamp' render={(routeProps) => <Training {...props} {...routeProps} />} />
              */
            }
          </div>
        </Router>
      </div>
    </Provider>
  )
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Root)
