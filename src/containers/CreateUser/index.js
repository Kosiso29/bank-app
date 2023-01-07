/* eslint-disable react-hooks/exhaustive-deps */
import axios from "../../axios";
import { useEffect, useState } from "react";
import { Card, Form, Button, Spinner, CloseButton } from "react-bootstrap";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import classes from "./CreateUser.module.scss";

const CreateUser = (props) => {
    const { closeModal, onAlertUpdate, editData } = props;
    const { Title, Body } = Card;
    const { Group, Control, Label, Select } = Form;

    const [loaded, setLoaded] = useState(false);
    const [submitted, setSubmitted] = useState(true);
    const [jobRoles, setJobRoles] = useState([]);
    const [userTypes, setUserTypes] = useState([]);

    const [jobRole, setJobRole] = useState('');
    const [userType, setUserType] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const getData = async () => {
            await new Promise((resolve, reject) => {
                axios.get("/GetRoles")
                    .then(response => {
                        const roles = response.data.data;
                        setJobRoles(roles)
                        setJobRole(editData ? editData.jobRole : roles[0]);
                        resolve(response);
                    })
                    .catch(error => {
                        const errorMessage = error.response.data.error.message;
                        onAlertUpdate({
                            show: true,
                            variant: "danger",
                            message: errorMessage
                        })
                        reject(errorMessage);
                    })
            })

            await new Promise((resolve, reject) => {
                axios.get("/GetUserType")
                    .then(response => {
                        const userTypes = response.data.data;
                        setUserTypes(userTypes)
                        setUserType(editData ? editData.userType : userTypes[0]);
                        setLoaded(true);
                        resolve(response);
                    })
                    .catch(error => {
                        const errorMessage = error.response.data.error.message;
                        onAlertUpdate({
                            show: true,
                            variant: "danger",
                            message: errorMessage
                        })
                        reject(errorMessage);
                    })
            })
        }

        getData();

        if (editData) {
            setFirstName(editData.firstName);
            setLastName(editData.lastName);
            setEmail(editData.email);
        }
    }, [])

    const handleClick = () => {
        setSubmitted(false);

        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            jobRole: jobRole,
            phoneNumber: phoneNumber,
            userType: userType
        }

        axios.post("/CreateUser", data)
            .then(() => {
                setSubmitted(true);
                onAlertUpdate({
                    show: true,
                    variant: "success",
                    message: "User Created"
                })
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

    if (!loaded) {
        return <Spinner animation="border" variant="light" />
    }

    return (
        <div className={classes.user}>
            <Card className={classes.card}>
                <Body>
                    <Title className={classes.title}>{editData ? "Edit" : "Create"} User</Title>
                    <CloseButton className={classes.close} onClick={handleClose} />
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label htmlFor="FirstName" className={classes.label}>First Name</Label>
                            <Control id="FirstName" className={classes.control} type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                        </Group>
                        <Group className={classes.group}>
                            <Label htmlFor="LastName" className={classes.label}>Last Name</Label>
                            <Control id="LastName" className={classes.control} type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        </Group>
                    </Group>
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label htmlFor="Email" className={classes.label}>Email</Label>
                            <Control id="Email" className={classes.control} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Group>
                        <Group className={classes.group}>
                            <Label htmlFor="PhoneNumber" className={classes.label}>Phone Number</Label>
                            <Control id="PhoneNumber" className={classes.control} type="tel" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                        </Group>
                    </Group>
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label htmlFor="JobRole" className={classes.label}>Job Role</Label>
                            <Select id="JobRole" className={classes.control} type="text" onChange={(e) => setJobRole(e.target.value)} value={jobRole}>
                                {jobRoles.map((role, index) => (
                                    <option key={index} >{role}</option>
                                ))}
                            </Select>
                        </Group>
                        <Group className={classes.group}>
                            <Label htmlFor="UserType" className={classes.label}>User Type</Label>
                            <Select id="UserType" className={classes.control} type="text" onChange={(e) => setUserType(e.target.value)} value={userType}>
                                {userTypes.map((userType, index) => (
                                    <option key={index}>{userType}</option>
                                ))}
                            </Select>
                        </Group>
                    </Group>
                    <Button
                        className={classes.button}
                        variant="success"
                        onClick={handleClick}
                    >
                        {editData ? "Edit" : "Create"} User
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);