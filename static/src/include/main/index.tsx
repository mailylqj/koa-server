import * as React from 'react';
import Index from '../../pages/index';
import BasicUse from '../../pages/test';
import Meals from '../../pages/meals';
import { Route, Switch, withRouter } from 'react-router-dom';

class Main extends React.Component<IProps, IState>{
	constructor(props:any) {
		super(props);
	}
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Index}/>
				<Route path="/meals" component={Meals}/>
				<Route path="/test" component={BasicUse}/>
			</Switch>
		);
	}
}

export default withRouter(Main);
