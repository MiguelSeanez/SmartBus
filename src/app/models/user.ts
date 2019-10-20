export interface Roles{
    admin?: boolean;
}

export interface UserInterface{
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    birthdate?: string; 
    gender?: string;
    type?: string;
    balance?: number;
    //roles: Roles;
}