import * as React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
// import RouterSwitch from '@app/components/RouterSwitch'
import RouterRoute from '/components/RouterRoute'
import history from '/lib/history'
import { Provider as UnstatedProvider } from 'unstated'
import UiRoot from '/components/UiRoot'
import { ThemeProvider } from 'emotion-theming'
import styles from '/styles'
import { PrivateRoute, GuestRoute } from '/components/RouterPermission'
import Main from './main'
// import MainError404 from './main.error-404'
import MainLogin from './main.login'
import MainRegister from './main.register'
import MainLogout from './main.logout'
import MainDashboard from './main.dashboard'
import MainDashboardHome from './main.dashboard.home'
import MainDashboardTracker from './main.dashboard.tracker'
// import UiModal from '@app/components/UiModal'
// import Toast from '@app/components/Toast'

class Root extends React.Component {
  componentDidMount() {
    // UiModal.init()
  }
  
  render() {
    return (
      <ThemeProvider theme={styles}>
        <UnstatedProvider>
          <Router history={history}>
            <UiRoot>
              <Main>
                <Switch>
                  <GuestRoute exact component={MainLogin} path="/login" />
                  <GuestRoute exact component={MainRegister} path="/register" />
                  <PrivateRoute exact component={MainLogout} path="/logout" />

                  <PrivateRoute component={MainDashboard} path="/">
                    <Switch>
                      <RouterRoute exact path="/" component={MainDashboardHome}/>
                      <RouterRoute exact path="/tracker/:trackerId" component={MainDashboardTracker} />
                    </Switch>
                  </PrivateRoute>
                  {/* <Route component={MainError404} /> */}
                </Switch>
              </Main>
            </UiRoot>
          </Router>
        </UnstatedProvider>
      </ThemeProvider>
      )
  }
}

export default Root