export interface ICreateUser {
    username: string
    password: string
    newPassword?: string
    user_id?: string
}

export interface IResponseUser {
    status: number
    data: {
        data?: IUser
        message?: string
    }
}

export interface IFindErrorUser {
    password?: string 
    username?: string
}

export interface IUser {
    token: string
    id: number
    username: string
    user_id: string
    created_at?: any
}

export interface IRedux {
    data: IUser
}