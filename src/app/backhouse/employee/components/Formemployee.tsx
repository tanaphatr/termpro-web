'use client';

import { Box, Card, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export type FormEmployeeValues = {
    employee_id: string;
    nickname: string;
    first_name: string;
    last_name: string;
    age: string;
    position: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    address: string;
    salary: string;
    province: string;
    district: string;
};

export const defaultEmployeeValues: FormEmployeeValues = {
    employee_id: '',
    nickname: '',
    first_name: '',
    last_name: '',
    age: '',
    position: '',
    email: '',
    password: '',
    role: '',
    phone: '',
    address: '',
    salary: '',
    province: '',
    district: ''
};

type FormEmployeeProps = {
    onEdit?: () => void;
    onCancel?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    title: string;
    editMode?: boolean;
    mode?: 'create' | 'edit' | 'view';
    loadingValue?: boolean;
};

export default function Formemployee({ editMode, mode, ...props }: FormEmployeeProps) {
    const { register, formState: { errors } } = useFormContext<FormEmployeeValues>();

    return (
        <Card sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Typography variant="h6">{props.title}</Typography>
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Nickname"
                        {...register("nickname", { required: "Nickname is required" })}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.nickname}
                        helperText={errors.nickname ? errors.nickname.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Firstname"
                        {...register("first_name", { required: "Firstname is required" })}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.first_name}
                        helperText={errors.first_name ? errors.first_name.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Lastname"
                        {...register("last_name", { required: "Lastname is required" })}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.last_name}
                        helperText={errors.last_name ? errors.last_name.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Age"
                        {...register("age", { required: "Age is required" })}
                        type="number"
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.age}
                        helperText={errors.age ? errors.age.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Email"
                        {...register("email", { 
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Enter a valid email address"
                            }
                        })}
                        type="email"
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Password"
                        {...register("password", { required: "Password is required" })}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Phone"
                        {...register("phone", { 
                            required: "Phone is required", 
                            pattern: {
                                value: /^\d{10}$/,
                                message: "Phone number must be 10 digits"
                            }
                        })}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.phone}
                        helperText={errors.phone ? errors.phone.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Address"
                        {...register("address", { required: "Address is required" })}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.address}
                        helperText={errors.address ? errors.address.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Province"
                        {...register("province", { required: "Province is required" })}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.province}
                        helperText={errors.province ? errors.province.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="District"
                        {...register("district", { required: "District is required" })}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.district}
                        helperText={errors.district ? errors.district.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Position"
                        {...register("position", { required: "Position is required" })}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.position}
                        helperText={errors.position ? errors.position.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Salary"
                        {...register("salary", { required: "Salary is required" })}
                        type="number"
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.salary}
                        helperText={errors.salary ? errors.salary.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        select
                        label="Role"
                        {...register("role", { required: "Role is required" })}
                        fullWidth
                        margin="normal"
                        disabled={mode === 'view'}
                        error={!!errors.role}
                        helperText={errors.role ? errors.role.message : ""}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option value="admin">admin</option>
                        <option value="employee">employee</option>
                    </TextField>
                </Grid>
            </Grid>
        </Card>
    );
}
