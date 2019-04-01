import { Location, LocationState } from 'history';
import { RouteComponentProps as ReactRouterComponentProps, match as ReactRouterMatch } from 'react-router-dom'

export interface RouteComponentProps<Q = { [key: string]: string }, P extends { [K in keyof P]?: string } = {}> extends ReactRouterComponentProps {
  location: Location<LocationState> & {
    query: Q
  };
  match: ReactRouterMatch<P>;
}