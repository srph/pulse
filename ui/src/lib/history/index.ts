import createBrowserHistory from 'history/createBrowserHistory'
import qhistory from 'qhistory'
import { stringify, parse } from 'querystring'

export default qhistory(createBrowserHistory(), stringify, parse)
