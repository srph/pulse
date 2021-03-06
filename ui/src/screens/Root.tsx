import * as React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import RouterSwitch from '~/components/RouterSwitch'
import RouterRoute from '~/components/RouterRoute'
import history from '~/lib/history'
import { Provider as UnstatedProvider } from 'unstated'
import { PrivateRoute, GuestRoute } from '~/components/RouterPermission'
import Main from './main'
import MainLogin from './main.login'
import MainRegister from './main.register'
import MainLogout from './main.logout'
import MainDashboard from './main.dashboard'
import MainDashboardHome from './main.dashboard.home'
import MainDashboardTracker from './main.dashboard.tracker'
import MainDashboardTrackerHome from './main.dashboard.tracker.home'
import MainDashboardTrackerStats from './main.dashboard.tracker.stats'
import MainDashboardTrackerSettings from './main.dashboard.tracker.settings'
import MainDashboardMe from './main.dashboard.me'
import UiRoot from '~/components/UiRoot'
import UiModal from '~/components/UiModal'
import ErrorHandler from '~/components/ErrorHandler'
import Helmet from 'react-helmet'
import config from '~/config'
import Toast from '~/components/Toast'

class Root extends React.Component {
  componentDidMount() {
    UiModal.init()
  }
  
  render() {
    return (
      <React.Fragment>
        <Helmet titleTemplate={`%s | ${config.app.title}`} />

        <UnstatedProvider>
          <Router history={history}>
            <ErrorHandler>
              <UiRoot>
                <Main>
                  <RouterSwitch>
                    <GuestRoute exact component={MainLogin} path="/login" />
                    <GuestRoute exact component={MainRegister} path="/register" />
                    <PrivateRoute exact component={MainLogout} path="/logout" />

                    <PrivateRoute component={MainDashboard} path="/">
                      <RouterSwitch>
                        <RouterRoute exact path="/" component={MainDashboardHome} />
                        <RouterRoute path="/tracker/:trackerId" component={MainDashboardTracker}>
                          <RouterSwitch>
                            <RouterRoute exact path="/tracker/:trackerId" component={MainDashboardTrackerHome} />
                            <RouterRoute exact path="/tracker/:trackerId/stats" component={MainDashboardTrackerStats} />
                            <RouterRoute exact path="/tracker/:trackerId/settings" component={MainDashboardTrackerSettings} />
                          </RouterSwitch>
                        </RouterRoute>
                        <RouterRoute exact path="/me" component={MainDashboardMe} />
                      </RouterSwitch>
                    </PrivateRoute>
                  </RouterSwitch>
                </Main>
              </UiRoot>
            </ErrorHandler>
          </Router>
        </UnstatedProvider>

        <Toast />
      </React.Fragment>
    )
  }
}

export default Root