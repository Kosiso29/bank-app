/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import axios from "../../axios";

import Datatable from "../../components/Datatable";
import { seperateDateTime } from "../../utils/separateDateTime";

const PendingRequests = (props) => {
    const { email, userType, onAlertUpdate } = props;
    const [show, setShow] = useState(false);
    const [reloadTable, setReloadtable] = useState(false);
    const [dataList, setDataList] = useState(false);
    const [columnList, setColumnList] = useState(false);

    const handleApprove = (e) => {
        const button = e.target;
        button.children[0].classList.add("pending-request-span-hide");
        button.children[1].classList.remove("pending-request-spinner-hide");
        const data = {
            leaveRequestId: button.dataset.id,
            managerEmail: email
        };
        axios.post("/ApproveRequest", data)
            .then(() => {
                onAlertUpdate({
                    show: true,
                    variant: "success",
                    message: "Approved"
                })
                button.children[0].classList.remove("pending-request-span-hide");
                button.children[1].classList.add("pending-request-spinner-hide");
                setReloadtable(prevState => !prevState);
            })
            .catch(error => {
                const errorMessage = error.response.data.error.message;
                onAlertUpdate({
                    show: true,
                    variant: "danger",
                    message: errorMessage
                });
                button.children[0].classList.remove("pending-request-span-hide");
                button.children[1].classList.add("pending-request-spinner-hide");
                setReloadtable(prevState => !prevState);
            })
    }

    const handleReject = (e) => {
        const button = e.target;
        button.children[0].classList.add("pending-request-span-hide");
        button.children[1].classList.remove("pending-request-spinner-hide");
        const data = {
            leaveRequestId: button.dataset.id,
            managerEmail: email
        };
        axios.post("/RejectRequest", data)
            .then(() => {
                onAlertUpdate({
                    show: true,
                    variant: "success",
                    message: "Rejected"
                })
                button.children[0].classList.remove("pending-request-span-hide");
                button.children[1].classList.add("pending-request-spinner-hide");
                setReloadtable(prevState => !prevState);
            })
            .catch(error => {
                const errorMessage = error.response.data.error.message;
                onAlertUpdate({
                    show: true,
                    variant: "danger",
                    message: errorMessage
                });
                button.children[0].classList.remove("pending-request-span-hide");
                button.children[1].classList.add("pending-request-spinner-hide");
                setReloadtable(prevState => !prevState);
            })
    }

    const createButton = (text, id, variant, tableId) => {
        return `
            <button id="${id}" data-id="${tableId}" class="btn btn-${variant} pending-request-button">
                <span>${text}</span>
                <div class="spinner-border text-light pending-request-spinner pending-request-spinner-hide" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
            </button>`
    }

    const createAddEventListener = () => {
        const approveButtons = document.querySelectorAll("#ApproveButton");
        approveButtons.forEach(approveButton => {
            approveButton.addEventListener("click", handleApprove);
        })
        const rejectButtons = document.querySelectorAll("#RejectButton");
        rejectButtons.forEach(rejectButton => {
            rejectButton.addEventListener("click", handleReject);
        })
    }

    useEffect(() => {
        axios.get("/GetAllPendingRequests", {
            params: {
                pageNumber: 1,
                pageSize: 10
            }
        })
            .then(response => {
                return response.data;
            })
            .then(output => {
                const tableList = output.data.tList;
                const newDataList = tableList.reduce((arr, table) => {
                    const childArray = [];
                    childArray.push(table.leaveType);
                    childArray.push(seperateDateTime(table.dateCreated));
                    childArray.push(seperateDateTime(table.startDate));
                    childArray.push(seperateDateTime(table.endDate));
                    childArray.push(table.comment);
                    childArray.push(table.status);
                    if (userType === "Manager") {
                        childArray.push(createButton("Approve ", "ApproveButton", "success", table.id));
                        childArray.push(createButton("Reject ", "RejectButton", "danger", table.id));
                    }
                    arr.push(childArray);
                    return arr;
                }, []);
                const newColumnList = userType === "Manager" ? [
                    { title: "Leave Type" },
                    { title: "Date Created" },
                    { title: "Start Date" },
                    { title: "End Date" },
                    { title: "Comment" },
                    { title: "Status" },
                    { title: "Approve" },
                    { title: "Reject" }
                ] : [
                    { title: "Leave Type" },
                    { title: "Date Created" },
                    { title: "Start Date" },
                    { title: "End Date" },
                    { title: "Comment" },
                    { title: "Status" },
                ];
                setDataList(newDataList);
                setColumnList(newColumnList);
                setShow(true);
            })
            .catch(error => {
                alert(error);
            })
    }, [reloadTable])

    return <Datatable reloadTable={reloadTable} show={show} dataList={dataList} columnList={columnList} scrollY="50vh" createAddEventListener={userType === "Manager" ? createAddEventListener : null} />
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        userType: state.auth.userType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAlertUpdate: (alertState) => dispatch(actions.alertUpdate(alertState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingRequests);