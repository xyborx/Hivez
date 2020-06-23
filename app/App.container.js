import React, {Component} from 'react';
import Router from './routes';
import {UserProvider} from './contexts/user.context';

class App extends Component {
	render() {
		return (
			<UserProvider>
				<Router />
			</UserProvider>
		);
	}
}

export default App;