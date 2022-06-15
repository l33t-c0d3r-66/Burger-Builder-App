import React, {Component} from 'react';

import {connect} from 'react-redux';

import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import cssClasses from './Authentication.css';
import * as actions from '../../store/actions/index';
import {updateObject, checkValidity} from '../../shared/utility';


class Authentication extends Component {
    state = {
        controls: 
        {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Enter your email",
                }, 
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: "Enter your password",
                }, 
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount () {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
        
    }



    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls});


    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthenticationModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    }

    render () {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }
        let form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                value={formElement.config.value} 
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}/>
        ));
        if(this.props.loading) {
            form = <Spinner />
        }
        let errorMsg = null;
        if(this.props.error) {
            errorMsg = <p>{this.props.error.message}</p>
        }
        let redirect = null;
        if(this.props.isAuthenticated) {
            redirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <div className={cssClasses.Authentication}>
                {redirect}
                <h1>{this.state.isSignUp?'SIGN UP': 'SIGN IN'}</h1>
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">{this.state.isSignUp?'SIGN UP': 'SIGN IN'}</Button>
                </form>
                <Button clicked={this.switchAuthenticationModeHandler} btnType="Danger">SWITCH TO {this.state.isSignUp?'SIGN IN': 'SIGN UP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.authenticate(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthenticationRedirectPath('/'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);