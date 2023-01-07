/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "../../axios";

import Backdrop from "../../components/Backdrop";
import CreateUser from "../../containers/CreateUser";
import Datatable from "../../components/Datatable";

const $ = require('jquery');
$.DataTable = require('datatables.net');

const AllUsers = () => {
    const [show, setShow] = useState(false);
    const [dataList, setDataList] = useState(false);
    const [columnList, setColumnList] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState({
        firstName: "",
        lastName: ""
    });

    const handleEdit = (e) => {
        const tableRow = e.target.parentNode.parentNode.children
        const createData = {
            firstName: tableRow[0].textContent,
            lastName: tableRow[1].textContent,
            email: tableRow[2].textContent,
            jobRole: tableRow[3].textContent,
            userType: tableRow[4].textContent,
        }
        setEditData(createData);
        setOpenModal(true);
    }

    const createAddEventListener = () => {
        const editButtons = document.querySelectorAll("#ButtonEdit");
        editButtons.forEach(editButton => {
            editButton.addEventListener("click", handleEdit);
        })
    }

    useEffect(() => {
        axios.get("/GetAllUsers", {
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
                    childArray.push(table.firstName);
                    childArray.push(table.lastName);
                    childArray.push(table.employeeId);
                    childArray.push(table.jobRole);
                    childArray.push(table.userType);
                    childArray.push(`<button id="ButtonEdit" class="btn btn-primary">Edit</button>`);
                    childArray.push(table.sickLeave);
                    childArray.push(table.remainingSickLeave);
                    childArray.push(table.totalSickLeaveTaken);
                    childArray.push(table.annualLeave);
                    childArray.push(table.remainingAnnualLeave);
                    childArray.push(table.totalAnnualLeaveTaken);
                    arr.push(childArray);
                    return arr;
                }, [])
                const newColumnList = [
                    { title: "First Name" },
                    { title: "Last Name" },
                    { title: "Email" },
                    { title: "Job Role" },
                    { title: "User Type" },
                    { title: "Actions" },
                    { title: "S+" },
                    { title: "S-" },
                    { title: "S=" },
                    { title: "A+" },
                    { title: "A-" },
                    { title: "A=" }
                ];
                setDataList(newDataList);
                setColumnList(newColumnList);
                setShow(true);
            })
            .catch(error => {
                alert(error);
            })
    }, [])

    return (
        <div>
            <Datatable show={show} dataList={dataList} columnList={columnList} scrollY="60vh" createAddEventListener={createAddEventListener} />
            {openModal ?
                <Backdrop closeModal={() => setOpenModal(false)}>
                    <CreateUser closeModal={() => setOpenModal(false)} editData={editData} />
                </Backdrop> : null
            }
        </div>
    );
}

export default AllUsers;