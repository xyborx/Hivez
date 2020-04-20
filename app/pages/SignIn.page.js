import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setEmail, setPassword} from '../redux/actions/index.actions';
import SignIn from '../components/SignIn/SignIn.component';

class SignInPage extends Component {
	render() {
		const {email, setEmail, password, setPassword} = this.props;
		return (
			<SignIn email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
		);
	}
}

SignInPage.propTypes = {
	email: PropTypes.string,
	setEmail: PropTypes.func,
	password: PropTypes.string,
	setPassword: PropTypes.func
}

const mapStateToProps = (state) => ({
	email: state.email,
	password: state.password
});

const mapDispatchToProps = (dispatch) => ({
	setEmail: (email) => dispatch(setEmail(email)),
	setPassword: (password) => dispatch(setPassword(password))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);