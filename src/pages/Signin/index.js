import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form, Spinner, } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import axios from "../../axios";

import classes from "./Signin.module.scss";

const Signin = (props) => {
    const { onAlertUpdate, onAuthVerifyEmail } = props;
    const { Title, Body } = Card;
    const { Group, Control } = Form;

    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(true);
  
    const [state, setState] = useState({
        username: '',
        password: '',
        loggedIn: false,
        error: false,
        message: "",
        alertColor: ""
    })

    const handleClick = async () => {
        setSubmitted(false);

        const data = {
            username: state.username,
            password: state.password
        };

        const getData = async () => {
            await new Promise((resolve, reject) => {
                axios.post('/api-token-auth/', data)
                    .then(response => { 
                        setSubmitted(true);
                        console.log(response.data);
                        onAuthVerifyEmail(state.username, response.data.token);
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
                        // const errorMessage = error.response;
                        onAlertUpdate({
                            show: true,
                            variant: "danger",
                            message: "Login failed"
                        })
                    })
            })
        }
        
        getData();
    }

    const handleChange = (e, input) => {
        if (input === "username") {
            setState({
                ...state,
                username: e.target.value
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
                        <Control className={classes.control} type="text" placeholder="Username" onChange={(e) => { handleChange(e, "username") }} />
                        <Control className={classes.control} type="password" placeholder="Password" onChange={(e) => { handleChange(e, "password") }} />
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
        username: state.auth.username,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthVerifyEmail: (username, token) => dispatch(actions.authVerifyEmail(username, token)),
        onAlertUpdate: (alertState) => dispatch(actions.alertUpdate(alertState)),
        onUpdateUserDashboard: (userData) => dispatch(actions.updateUserDashboard(userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);