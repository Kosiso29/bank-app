import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import axios from "../../axios";
import Datatable from "../../components/Datatable";
import Backdrop from "../../components/Backdrop";
import CreateLeave from "../../containers/CreateLeave";

import classes from "./Dashboard.module.scss";

const Dashboard = (props) => {
    const [openModal, setOpenModal] = useState(false)
    const [show, setShow] = useState(false);
    const [dataList, setDataList] = useState(false);
    const [columnList, setColumnList] = useState(false);

    useEffect(() => {
        axios.get("/customer", {
            params: {
                pageNumber: 1,
                pageSize: 10
            }
        })
            .then(response => {
                return response.data;
            })
            .then(output => {
                console.log(output);
                const newDataList = output.reduce((arr, table) => {
                    const childArray = [];
                    childArray.push(table.id);
                    childArray.push(table.first_name);
                    childArray.push(table.middle_name);
                    childArray.push(table.last_name);
                    childArray.push(table.phone_number);
                    childArray.push(table.email);
                    childArray.push(table.photo);
                    arr.push(childArray);
                    return arr;
                }, []);
                const newColumnList = [
                    { title: "Id" },
                    { title: "First Name" },
                    { title: "Middle Name" },
                    { title: "Last Name" },
                    { title: "Phone Number" },
                    { title: "Email" },
                    { title: "Photo" }
                ];
                setDataList(newDataList);
                setColumnList(newColumnList);
                setShow(true);
            })
            .catch(error => {
                alert(error);
            })
    }, [openModal])

    const handleClick = () => {
        setOpenModal(true)
    }

    return (
        <div className={classes.dashboard}>
            <div className={classes.add}>
                <Button variant="success" onClick={handleClick}><AddOutlinedIcon />Create Customer</Button>
            </div>
            <Datatable show={show} dataList={dataList} columnList={columnList} scrollY="60vh" />
            {openModal ?
                <Backdrop closeModal={() => setOpenModal(false)}>
                    <CreateLeave closeModal={() => setOpenModal(false)} />
                </Backdrop> : null
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userData: state.data.userData
    }
}

export default connect(mapStateToProps)(Dashboard);