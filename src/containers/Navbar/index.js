import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';

import * as actions from "../../store/actions";

import classes from "./Navbar.module.scss";
import { useState } from "react";

const Navbar = (props) => {
    const { onAuthInitiateLogout, userType } = props;

    const [sideBar, setSideBar] = useState(false);

    const onLogoutClick = () => {
        onAuthInitiateLogout();
    }

    const sideBarToggle = () => {
        setSideBar(prevState => !prevState);
    }

    return (
        <div className={sideBar ? classes.navbar + " " + classes.open : classes.navbar}>
            <span onClick={sideBarToggle} className={classes.hamburger}>
                <MenuOutlinedIcon className={classes.icon} />
            </span>
            <div className={classes.links}>
                <NavLink onClick={sideBarToggle} to={userType === "Manager" || userType === "HR" ? "/manager-dashboard" : "/dashboard"} className={({ isActive }) => isActive ? classes.active : ''} ><DashboardIcon className={classes.icon} /> Dashboard</NavLink>
                {userType === "Manager" || userType === "HR" ? <NavLink onClick={sideBarToggle} to="/users" className={({ isActive }) => isActive ? classes.active : ''} ><SupervisedUserCircleOutlinedIcon className={classes.icon} /> All Users</NavLink> : null}
                <NavLink onClick={sideBarToggle} to="/rejected" className={({ isActive }) => isActive ? classes.active : ''}><AccountBalanceIcon className={classes.icon} /> Account</NavLink>
                <NavLink onClick={sideBarToggle} to="/accepted" className={({ isActive }) => isActive ? classes.active : ''}><CloudDownloadIcon className={classes.icon} /> Withdraw</NavLink>
                <NavLink onClick={sideBarToggle} to="/total" className={({ isActive }) => isActive ? classes.active : ''}><CloudUploadIcon className={classes.icon} /> Deposit</NavLink>
                <NavLink onClick={sideBarToggle} to="/colleague" className={({ isActive }) => isActive ? classes.active : ''}><FlipCameraAndroidIcon className={classes.icon} /> Transfer</NavLink>
            </div>
            <div className={classes.links}>
                {/* <hr /> */}
                <NavLink to="/" onClick={onLogoutClick} ><ExitToAppOutlinedIcon className={classes.icon} /> Log out</NavLink>
                {/* <hr /> */}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        userType: state.auth.userType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthInitiateLogout: () => dispatch(actions.authInitiateLogout)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);