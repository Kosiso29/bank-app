import { useEffect, useState } from "react";
import axios from "../../axios";

import Datatable from "../../components/Datatable";

const TotalLeave = () => {
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
                setShow(false);
            })
            .catch(error => {
                alert(error);
            })
    }, [])

    return <Datatable show={show} dataList={dataList} columnList={columnList} scrollY="60vh" />
}

export default TotalLeave;