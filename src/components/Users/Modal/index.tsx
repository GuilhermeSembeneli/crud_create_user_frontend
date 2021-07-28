import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography, TextField, FormControl, Button } from '@material-ui/core';
import { updateUser } from '../../../request/Users';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { IRedux } from '../../../interface/Users';
import { getToken } from '../../../services/Auth';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius: '4px',
        padding: theme.spacing(2, 4, 3),
    },
    margin: {
        marginBottom: theme.spacing(2),
        textTransform: 'uppercase'
    },
    marginInputs: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
        },
    }
}));

interface IModal {
    handleClose: () => void
    setOpen: () => void
    setReload: () => void
    open: boolean
    data: IUserService
}

interface IUserService {
    username?: string
    user_id?: string
    password?: string
}


export default function ModalLayout({ handleClose, open, data, setOpen, setReload }: IModal) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [form, setForm] = React.useState({
        password: '',
        username: '',
        newPassword: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'username') {
            setForm(prev => ({
                ...prev,
                [e.target.id]: e.target.value
            }))
        }

        if (e.target.id === 'password') {
            setForm(prev => ({
                ...prev,
                [e.target.id]: e.target.value
            }))
        }

        if (e.target.id === 'newPassword') {
            setForm(prev => ({
                ...prev,
                [e.target.id]: e.target.value
            }))
        }
    }

    const handleSubmit = async () => {
        try {
            const res = await updateUser({...form, user_id: data.user_id});

            if (res.status === 200) {
                setOpen()
                setReload();
                toast.info(res.data.message);
            }

            if (res.status === 400) toast.error(res.data.error);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <Typography variant="h3" align="center" className={classes.margin}>Editar usuário</Typography>
                <FormControl fullWidth variant="outlined" className={classes.marginInputs}>
                    <TextField id="username" value={form.username} onChange={handleChange} label="Novo Nome" variant="outlined" />
                    <TextField id="password" value={form.password} onChange={handleChange} type="password" label="Senha Atual" variant="outlined" />
                    <TextField id="newPassword" value={form.newPassword} onChange={handleChange} type="password" label="Nova Senha" variant="outlined" />

                    <Button variant="contained" color="primary" style={{ width: '200px', margin: "0 auto" }} onClick={handleSubmit}>
                        Atualizar
                    </Button>
                </FormControl>
            </div>
        </Modal>
    )
}
