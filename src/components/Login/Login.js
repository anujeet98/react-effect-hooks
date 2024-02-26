import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

function emailReducerFun(state, action){
  if(action.type === 'EMAIL_INPUT')
    return {emailValue: action.val, emailIsValid: action.val.includes('@')};
  else if(action.type === 'EMAIL_BLUR')
    return {emailValue: state.emailValue, emailIsValid: state.emailValue.includes('@')};

  return {emailValue: '', emailIsValid: false};
}

function passwordReducerFun(state, action){
  if(action.type === 'PASSWORD_INPUT')
    return {passwordValue: action.val, passwordIsValid: action.val.length>6};
  else if(action.type === 'PASSWORD_BLUR')
    return {passwordValue: state.passwordValue, passwordIsValid: state.passwordValue.length>6};

  return {passwordValue: '', passwordIsValid: false};
}

function collegeReducerFun(state, action){
  if(action.type === 'COLLEGE_INPUT')
    return {collegeValue: action.val, collegeIsValid: action.val.length>1};
  else if(action.type === 'COLLEGE_BLUR')
    return {collegeValue: state.collegeValue, collegeIsValid: state.collegeValue.length>1};

  return {collegeValue: '', collegeIsValid: false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  // const [enteredCollege, setEnteredCollege] = useState('');
  // const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducerFun, {
    emailValue: '',
    emailIsValid: null
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducerFun, {
    passwordValue: '',
    passwordValid: null
  });
  const [collegeState, dispatchCollege] = useReducer(collegeReducerFun, {
    collegeValue: '',
    collegeValid: null
  });

  // useEffect(()=>{
  //   const validationTimer = setTimeout(()=>{
  //     setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length>0);
  //   },1000)

  //   return () => {
  //     clearTimeout(validationTimer);
  //   }
  // }, [enteredEmail, enteredPassword, enteredCollege] );

  
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'EMAIL_INPUT', val: event.target.value});
    setFormIsValid(emailState.emailIsValid && passwordState.passwordIsValid && collegeState.collegeIsValid);
    // setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'PASSWORD_INPUT', val: event.target.value});
    setFormIsValid(emailState.emailIsValid && passwordState.passwordIsValid && collegeState.collegeIsValid);
    // setEnteredPassword(event.target.value);
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({type:'COLLEGE_INPUT', val: event.target.value});
    setFormIsValid(emailState.emailIsValid && passwordState.passwordIsValid && collegeState.collegeIsValid);
    // setEnteredCollege(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'EMAIL_BLUR'});
    // setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'});
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollegeHandler = () => {
    dispatchCollege({type: 'COLLEGE_BLUR'});
    // setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.emailValue, passwordState.passwordValue, collegeState.collegeIsValid);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.passwordValue}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
        className={`${classes.control} ${
          collegeState.collegeIsValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor="college">College</label>
        <input
          type="text"
          id="college"
          value={collegeState.collegeValue}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
      </div>
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
