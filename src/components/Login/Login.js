import React, { useEffect, useState, useContext, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../contexts/auth-context';
import Input from '../UI/Input/Input';

function emailReducerFun(state, action){
  if(action.type === 'EMAIL_INPUT')
    return {value: action.val, isValid: action.val.includes('@')};
  else if(action.type === 'EMAIL_BLUR')
    return {value: state.value, isValid: state.value.includes('@')};

  return {value: '', isValid: false};
}

function passwordReducerFun(state, action){
  if(action.type === 'PASSWORD_INPUT')
    return {value: action.val, isValid: action.val.length>6};
  else if(action.type === 'PASSWORD_BLUR')
    return {value: state.value, isValid: state.value.length>6};

  return {value: '', isValid: false};
}

function collegeReducerFun(state, action){
  if(action.type === 'COLLEGE_INPUT')
    return {value: action.val, isValid: action.val.length>1};
  else if(action.type === 'COLLEGE_BLUR')
    return {value: state.value, isValid: state.value.length>1};

  return {value: '', isValid: false};
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
    
  const authCtx = useContext(AuthContext);


  const [emailState, dispatchEmail] = useReducer(emailReducerFun, {
    value: '',
    isValid: null
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducerFun, {
    value: '',
    isValid: null
  });
  const [collegeState, dispatchCollege] = useReducer(collegeReducerFun, {
    value: '',
    isValid: null
  });

  const {isValid: emailValid} = emailState;
  const {isValid: passwordValid} = passwordState;
  const {isValid: collegeValid} = collegeState;
  useEffect(()=>{
    const validationTimer = setTimeout(()=>{
      setFormIsValid(emailValid && passwordValid && collegeValid);
    },1000);
    
    return () => {
      clearTimeout(validationTimer);
    }
  }, [emailValid, passwordValid, collegeValid] );

  
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'EMAIL_INPUT', val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'PASSWORD_INPUT', val: event.target.value});
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({type:'COLLEGE_INPUT', val: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'EMAIL_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'});
  };

  const validateCollegeHandler = () => {
    dispatchCollege({type: 'COLLEGE_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input id="email" label="E-Mail" type="email" isValid={emailState.isValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} ></Input>
        <Input id="password" label="Password" type="password" isValid={passwordState.isValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} ></Input>
        <Input id="college" label="College" type="college" isValid={collegeState.isValid} value={collegeState.value} onChange={collegeChangeHandler} onBlur={validateCollegeHandler} ></Input>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>

      </form>
    </Card>
  );
};

export default Login;
