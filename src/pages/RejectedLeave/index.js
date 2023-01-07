/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "../../axios";

import classes from "./RejectedLeave.module.scss";

const RejectedLeave = (props) => {
    const { email } = props;

    const [state, setState] = useState({
        data: []
    })
    useEffect(() => {
        axios.get("/GetUserRejectedRequest", {
            params: {
                userId: email,
                pageNumber: 1,
                pageSize: 10
            }
        })
            .then(response => {
            return response.data;
        })
        .then(output => {
            setState({ data: output.data.tList })
        })
        .catch(error => {
            alert(error);
        })
    }, [])

    return (
        <div>
            <Table striped bordered hover responsive className={classes.rejected}>
                <thead>
                    <tr>
                        <th>Leave Type</th>
                        <th>Date Created</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Rejected by</th>
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
                            <td>{row.rejectedBy}</td>
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

export default connect(mapStateToProps)(RejectedLeave);