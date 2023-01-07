/* eslint-disable react-hooks/exhaustive-deps */
import axios from "../../axios";
import { useState } from "react";
import { Card, Form, Button, Spinner, CloseButton } from "react-bootstrap";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import classes from "./CreateLeave.module.scss";

const CreateLeave = (props) => {
    const { closeModal, onAlertUpdate } = props;
    const { Title, Body } = Card;
    const { Group, Control, Label } = Form;

    // const [loaded, setLoaded] = useState(false);
    const [submitted, setSubmitted] = useState(true);
    
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleClick = () => {
        setSubmitted(false);

        const data = {
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            phone_number: phoneNumber,
            email,
            address,
            photo: null
        }

        axios.post("/customer/", data)
            .then(() => {
                setSubmitted(true);
                onAlertUpdate({
                    show: true,
                    variant: "success",
                    message: "Customer Created"
                });
                closeModal();
            })
            .catch(error => {
                setSubmitted(true);
                const errorMessage = error.response.data.error.message;
                onAlertUpdate({
                    show: true,
                    variant: "danger",
                    message: errorMessage
                })
            })
    }

    const handleClose = () => {
        closeModal();
    }

    // if (!loaded) {
    //     return <Spinner animation="border" variant="light" />
    // }

    return (
        <div className={classes.leave}>
            <Card className={classes.card}>
                <Body>
                    <Title className={classes.title}>Create Customer</Title>
                    <CloseButton className={classes.close} onClick={handleClose} />
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label htmlFor="FirstName" className={classes.label}>First Name</Label>
                            <Control id="FirstName" className={classes.control} type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                        </Group>
                        <Group className={classes.group}>
                            <Label htmlFor="MiddleName" className={classes.label}>Middle Name</Label>
                            <Control id="MiddleName" className={classes.control} type="text" placeholder="Middle Name" onChange={(e) => setMiddleName(e.target.value)} value={middleName}/>
                        </Group>
                    </Group>
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label htmlFor="LastName" className={classes.label}>Last Name</Label>
                            <Control id="LastName" className={classes.control} type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                        </Group>
                        <Group className={classes.group}>
                            <Label htmlFor="PhoneNumber" className={classes.label}>Phone Number</Label>
                            <Control id="PhoneNumber" className={classes.control} type="text" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}/>
                        </Group>
                    </Group>
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label htmlFor="Email" className={classes.label}>Email</Label>
                            <Control id="Email" className={classes.control} type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        </Group>
                        <Group className={classes.group}>
                            <Label htmlFor="Address" className={classes.label}>Address</Label>
                            <Control id="Address" className={classes.control} type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} value={address}/>
                        </Group>
                    </Group>
                    <Button
                        className={classes.button}
                        variant="success"
                        onClick={handleClick}
                    >
                        Create Customer
                        {submitted ? null : <Spinner animation="border" className={classes.spinner} />}
                    </Button>
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
        onAlertUpdate: (alertState) => dispatch(actions.alertUpdate(alertState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeave);