import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form, Spinner, } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import axios from "../../axios";

import classes from "./Signin.module.scss";

const Signin = (props) => {
    const { onAlertUpdate } = props;
    const { Title, Body } = Card;
    const { Group, Control } = Form;

    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(true);
  
    const [state, setState] = useState({
        email: '',
        loggedIn: false,
        error: false,
        message: "",
        alertColor: ""
    })

    const handleClick = async () => {
        setSubmitted(false);
        const getData = async () => {
            await new Promise((resolve, reject) => {
                axios('/customer')
                    .then(response => { 
                        setSubmitted(true);
                        console.log(response.data);
                        onAlertUpdate({
                            show: true,
                            variant: "success",
                            message: 'Login successful'
                        })
                        navigate('/dashboard');
                        resolve(response);
                    })
                    .catch(error => {
                        setSubmitted(true);
                        const errorMessage = error.response;
                        onAlertUpdate({
                            show: true,
                            variant: "danger",
                            message: errorMessage
                        })
                        console.log('error', error.response)
                    })
            })
        }
        
        getData();
    }

    const handleChange = (e, input) => {
        if (input === "email") {
            setState({
                ...state,
                email: e.target.value
            })
        }

        if (input === "password") {
            setState({
                ...state,
                password: e.target.value
            })
        }
    }

    return (
        <div className={classes.signin}>
            <Card className={classes.card}>
                <Body>
                    <Title className={classes.title}>Sign In</Title>
                    <Group className={classes.group}>
                        <Control className={classes.control} disabled type="email" placeholder="Your Email" onChange={(e) => { handleChange(e, "email") }} />
                        <Button
                            className={classes.button}
                            variant="success"
                            onClick={handleClick}
                        >
                            Login
                            {submitted ? null : <Spinner animation="border" className={classes.spinner} />}
                        </Button>
                    </Group>
                </Body>
            </Card>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        email: state.auth.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthVerifyEmail: (email, userId, userType) => dispatch(actions.authVerifyEmail(email, userId, userType)),
        onAlertUpdate: (alertState) => dispatch(actions.alertUpdate(alertState)),
        onUpdateUserDashboard: (userData) => dispatch(actions.updateUserDashboard(userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);