import React, { Component } from 'react';
import { Provider } from "react-redux";
import LogSearch from './components/LogSearch';
import store from './store/store';

export default class App extends Component {

	constructor(props) {
		super(props);

		this.store = store
	}

	render() {
		return (
			<Provider store={this.store}>
				<LogSearch/>
			</Provider>
		);
	}
}