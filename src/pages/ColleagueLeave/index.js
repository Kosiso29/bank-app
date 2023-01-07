import { useState } from "react";
import { Table, Form, Button, Card, Spinner } from "react-bootstrap";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import axios from "../../axios";

import classes from "./ColleagueLeave.module.scss";

const ColleagueLeave = (props) => {
    const { onAlertUpdate } = props;
    const { Control, Group, Label } = Form;

    const [state, setState] = useState({
        email: "",
        submitted: true,
        data: []
    })

    const handleClick = () => {
        setState({...state, submitted: false})
        axios.get("/GetColleaguesApprovedLeave", {
            params: {
                userId: state.email,
                pageNumber: 1,
                pageSize: 10
            }
        })
        .then(response => {
            return response.data;
        })
        .then(output => {
            setState({ ...state, data: output.data.tList, submitted: true })
        })
        .catch(error => {
            const errorMessage = error.response.data.error.message;
            setState({ ...state, submitted: true })
            onAlertUpdate({
                show: true,
                variant: "danger",
                message: errorMessage
            })
        })
    }

    return (
        <div className={classes.colleague}>
            <Card className={classes.card}>
                <Group>
                    <Label htmlFor="ColleagueLeave" className={classes.label}>Colleague's Email</Label>
                    <Group className={classes.group}>
                        <Control id="ColleagueLeave" className={classes.control} placeholder="Colleague's email" value={state.email} onChange={(e) => setState({...state, email: e.target.value}) } />
                        <Button variant="success" onClick={handleClick}>
                            Get Colleague Leave
                            {state.submitted ? null : <Spinner animation="border" className={classes.spinner} />}
                        </Button>
                    </Group>
                </Group>
            </Card>
            <Table striped bordered hover responsive className={classes.table}>
                <thead>
                    <tr>
                        <th>Leave Type</th>
                        <th>Date Created</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Approved by</th>
                        <th>Comment</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {state.data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.leaveType}</td>
                            <td>{row.dateCreated}</td>
                            <td>{row.startDate}</td>
                            <td>{row.endDate}</td>
                            <td>{row.approvedBy}</td>
                            <td>{row.comment}</td>
                            <td>{row.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ColleagueLeave);