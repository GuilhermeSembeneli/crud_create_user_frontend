import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'

import { Typography, makeStyles, Button } from '@material-ui/core'
import { IRedux } from '../../interface/Users';
import { useSelector } from 'react-redux';

import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getToken, signOut } from '../../services/Auth';


const useStyles = makeStyles(theme => ({
    header: {
        padding: theme.spacing(2),
        flexGrow: 1
    },
    headerFlex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: theme.spacing(0, 5),
    },
    a: {
        textDecoration: 'none'
    },
    typography: {
        padding: theme.spacing(2),
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '.5rem'
    },
}))

export default function Header() {
    const classes = useStyles();
    const state = useSelector((state: IRedux) => state.data);
    const gettoken = getToken();
    const valid = state && gettoken;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<'bottom'>();
    const history = useHistory();
    const { pathname } = useLocation();

    const handleClick = (newPlacement: 'bottom') => (event: any) => {
        if (!state) return;
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const exitPlataform = () => {
        signOut();
        setOpen(false);

        history.push('/login');
    };

    return (
        <AppBar color="inherit" position="fixed" >
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition style={{ zIndex: 99999, marginTop: '.5rem', }}>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper >
                            <Typography className={classes.typography} onClick={exitPlataform}> <ExitToAppIcon /> Sair da plataforma.</Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <div className={classes.header}>
                <div className={classes.headerFlex}>
                    <Link to="/" className={classes.a}>
                        <Typography variant="h2" > Advantages </Typography>
                    </Link>
                    {!valid ? (
                        <Link to={pathname === '/login' ? '/' : '/login'}>
                            <Button variant="contained" color="primary"> {pathname === '/login' ? 'Cadastrar' : 'Login'} </Button>
                        </Link>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleClick('bottom')}> {valid && state.username}  </Button>
                    )}
                </div>
            </div>
        </AppBar>
    )
}
