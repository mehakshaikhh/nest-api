import { Table, Model, Column, } from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column({primaryKey:true, autoIncrement: true,})
    id: number;

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column({unique:true})
    email: string;
    
    @Column
    password: string;
}