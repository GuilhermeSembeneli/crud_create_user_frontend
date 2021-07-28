import React from 'react'

import { toast } from 'react-toastify';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Button, Typography } from '@material-ui/core'

import { deletedUser, getAllUsers } from '../../request/Users';
import { IRedux, IUser } from '../../interface/Users';
import { useSelector } from 'react-redux';
import { getToken } from '../../services/Auth';
import ModalLayout from './Modal';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#3f51b5',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 700,
    },
    root: {
        marginTop: theme.spacing(15),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function Users() {
    const classes = useStyles();
    const state = useSelector((state: IRedux) => state.data);
    const token = getToken();
    const verify = token && state;
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [dataModal, setDataModal] = React.useState({});
    const [reload, setReload] = React.useState(false);
    
    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await getAllUsers();
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    React.useEffect(() => {
        reload && fetchData();
    }, [reload])

    const handleDeleted = async (id: string) => {
        try {
            setLoading(true);
            if (verify && state.user_id === id) return toast.error('Impossível deletar o proprio usuário.');
            const res = await deletedUser(id);
            if (res.status === 200) {
                await fetchData();
                toast.info(res.data.message);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    const handleEdit = (row: any) => {
        if (verify && state.user_id === row.user_id) return toast.error('Impossível editar o mesmo usuário.');
        setOpen(true);
        setDataModal(row);
    };

    return (
        <>
            <ModalLayout handleClose={() => setOpen(false)} open={open} data={dataModal} setReload={() => setReload(true)} setOpen={() => setOpen(false)}/>
            <Container maxWidth="lg" fixed classes={{ root: classes.root }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>id</StyledTableCell>
                                <StyledTableCell align="center">Nome</StyledTableCell>
                                <StyledTableCell align="center">Data de criação</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <StyledTableRow>
                                    <StyledTableCell align="center" width="100%" colSpan={5}>
                                        <CircularProgress />
                                    </StyledTableCell>

                                </StyledTableRow>
                            ) : (
                                !users.length ? (
                                    <StyledTableRow>
                                        <StyledTableCell align="center" width="100%" colSpan={5}>
                                            <Typography variant="h4">Nenhum usuário foi encontrado...</Typography>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ) : users.map((row) => (
                                    <StyledTableRow key={row.username}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.username}</StyledTableCell>
                                        <StyledTableCell align="center">{new Intl.DateTimeFormat('pt-BR').format(new Date(row.created_at))}</StyledTableCell>
                                        <StyledTableCell align="right" style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                                            <Button variant="contained" color="secondary" style={{ width: '100px' }} onClick={() => handleDeleted(row.user_id)}>
                                                Excluir
                                            </Button>
                                            <Button variant="contained" color="primary" style={{ width: '100px' }} onClick={() => handleEdit(row)}>
                                                Editar
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}
