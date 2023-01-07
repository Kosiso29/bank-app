import classes from "./Topbar.module.scss"

const Topbar = (props) => {
    const { userId } = props;
    return (
        <div className={classes.topbar}>
            <p className={classes.user}>{userId}</p>
        </div>
    )
}

export default Topbar;