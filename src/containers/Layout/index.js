/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { connect } from "react-redux";
import { Alert, Toast } from "react-bootstrap";

import * as actions from "../../store/actions";
import Navbar from "../Navbar";
import Topbar from "../Topbar";

import classes from "./Layout.module.scss"

const Layout = (props) => {
    const { children, isSignin, userId, alertState, onAuthCheckState, onAlertUpdate } = props;

    useEffect(() => {
        if (!userId) {
            onAuthCheckState();
        }
    }, []);
    
    return (
        <div className={classes.layout}>
            <Toast onClose={() => onAlertUpdate({ ...alertState, show: false })} show={alertState.show} delay={3000} autohide className={classes.toast}>
                    <Alert variant={alertState.variant} dismissible className={classes.alert} onClose={() => onAlertUpdate({ ...alertState, show: false })}>{alertState.message}</Alert>
            </Toast>
            {!isSignin ? <><Topbar userId={userId} />
            <Navbar /></> : null}
            <div className={!isSignin ? classes.children : ""}>
                {children}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        alertState: state.alert.alertState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState()),
        onAlertUpdate: (alertState) => dispatch(actions.alertUpdate(alertState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);