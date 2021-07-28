import { ICreateUser, IResponseUser } from "../interface/Users";
import { api } from "../services/api";

export async function createUser ({username, password}: ICreateUser): Promise<IResponseUser | any> {
    try {
        const res = await api.post('/users', {username, password});

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

export async function getUser ({username, password}: ICreateUser): Promise<IResponseUser | any> {
    try {
        const res = await api.post('/users/login', {username, password});

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

export async function getAllUsers(): Promise<IResponseUser | any> {
    try {
        const res = await api.get('/users');

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

export async function deletedUser(id: string): Promise<IResponseUser | any> {
    try {
        const res = await api.delete(`/users/${id}`);

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

export async function updateUser({user_id, username, password, newPassword}: ICreateUser): Promise<IResponseUser | any> {
    try {
        const res = await api.put('/users', {user_id, username, password, newPassword});
        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}