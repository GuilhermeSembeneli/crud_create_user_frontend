import React from 'react'
import { Container, makeStyles, Typography, TextField, FormControl, Grid, Paper, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser, getUser } from '../../request/Users';
import { IFindErrorUser } from '../../interface/Users';
import { useDispatch } from 'react-redux';
import { signIn } from '../../services/Auth';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(15),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translateY(30%)'
    },
    margin: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        marginBottom: theme.spacing(1)
    },
    centering: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translateY(50%)'
    }
}));

const paperStyle = { padding: 40, width: '350px', margin: '20px auto' }
export default function CreateUser() {
    const classes = useStyles();
    const { pathname } = useLocation();
    const history = useHistory();
    const [form, setForm] = React.useState({
        username: '',
        password: ''
    })
    const [errorPassword, setErrorPassword] = React.useState(false);
    const [errorUsername, setErrorUsername] = React.useState(false);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const res = pathname === '/' ? await createUser(form) : await getUser(form);
            if (res?.status === 201) {
                signIn(res.data.data[0].token)
                dispatch({ type: 'LOGIN', user: res.data.data[0] })
                toast.info(res.data.message);
                history.push('/users')
            }

            if (res?.status === 200) {
                console.log(res)
                signIn(res.data.user.token)
                dispatch({ type: 'LOGIN', user: res.data.user })
                toast.info('Autenticação feita com sucesso!');
                history.push('/users')
            }

            if ([406, 404].includes(res?.status)) {
                toast.error(res.data.message ? res.data.message : res.data.error);
            }

            if (res?.status === 400) {
                if (res.data.find((item: IFindErrorUser) => item.password)) {
                    setErrorPassword(true);
                    toast.error(res.data.password);
                } else {
                    setErrorUsername(true);
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.data.error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'username') {
            setErrorUsername(false);
            setForm(prev => ({
                ...prev,
                [e.target.id]: e.target.value
            }))
        }

        if (e.target.id === 'password') {
            setErrorPassword(false);
            setForm(prev => ({
                ...prev,
                [e.target.id]: e.target.value
            }))
        }
    }

    return (
        <Container maxWidth="md" fixed classes={{ root: classes.root }}>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Typography variant="h4" classes={{ root: classes.margin }} align="center">{pathname === '/' ? 'Cadastro' : 'Login'}</Typography>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <TextField id="username" label="Usuário" variant="outlined" value={form.username} error={errorUsername} onChange={handleChange} />
                        <TextField type="password" id="password" label="Senha" variant="outlined" value={form.password} error={errorPassword} onChange={handleChange} />

                        <div className={classes.centering}>
                            <Button variant="contained" color="primary" style={{ width: '150px' }} onClick={handleLogin}>
                                {pathname === '/' ? 'Cadastrar' : 'Logar'}
                            </Button>
                        </div>
                    </FormControl>
                </Paper>
            </Grid>
        </Container>
    )
}
