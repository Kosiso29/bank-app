/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import { Table, Spinner } from "react-bootstrap";

import classes from "./Datatable.module.scss";

const $ = require('jquery');
$.DataTable = require('datatables.net');

const Datatable = (props) => {
    const { show, dataList, columnList, scrollY, createAddEventListener } = props;

    const tableRef = useRef();

    const jQueryElement = $(tableRef.current);
    jQueryElement.DataTable(
        {
            data: dataList,
            columns: columnList,
            destroy: true,
            scrollX: "100%",
            scrollY: scrollY,
            autoWidth: false
        }
    );

    if (createAddEventListener) {
        createAddEventListener();
    }

    if (show) {
        return (
            <div className={classes.datatable}>
                <Table striped bordered hover responsive className={classes.table} ref={tableRef}></Table>
            </div>
        )
    }

    return (
        <div className={classes.spinner}>
            <Spinner animation="border" />
        </div>
    );
}

export default Datatable;