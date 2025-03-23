import { Box, Card, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export type FormEmployeeValues = {
    id: string;
    nickname: string;
    firstname: string;
    lastname: string;
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
    id: "",
    nickname: '',
    firstname: '',
    lastname: '',
    age: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    salary: '',
    province: '',
    district: '',
    password: '',
    role: ''
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
                        {...register("nickname")}
                        fullWidth
                        margin="normal"
                        error={!!errors.nickname}
                        helperText={errors.nickname ? errors.nickname.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Firstname"
                        {...register("firstname")}
                        fullWidth
                        margin="normal"
                        error={!!errors.firstname}
                        helperText={errors.firstname ? errors.firstname.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Lastname"
                        {...register("lastname")}
                        fullWidth
                        margin="normal"
                        error={!!errors.lastname}
                        helperText={errors.lastname ? errors.lastname.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Age"
                        {...register("age")}
                        type="number"
                        fullWidth
                        margin="normal"
                        error={!!errors.age}
                        helperText={errors.age ? errors.age.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Email"
                        {...register("email")}
                        type="email"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Password"
                        {...register("password")}
                        type="password"
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Phone"
                        {...register("phone")}
                        fullWidth
                        margin="normal"
                        error={!!errors.phone}
                        helperText={errors.phone ? errors.phone.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Address"
                        {...register("address")}
                        fullWidth
                        margin="normal"
                        error={!!errors.address}
                        helperText={errors.address ? errors.address.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Province"
                        {...register("province")}
                        fullWidth
                        margin="normal"
                        error={!!errors.province}
                        helperText={errors.province ? errors.province.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="District"
                        {...register("district")}
                        fullWidth
                        margin="normal"
                        error={!!errors.district}
                        helperText={errors.district ? errors.district.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Position"
                        {...register("position")}
                        fullWidth
                        margin="normal"
                        error={!!errors.position}
                        helperText={errors.position ? errors.position.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Salary"
                        {...register("salary")}
                        type="number"
                        fullWidth
                        margin="normal"
                        error={!!errors.salary}
                        helperText={errors.salary ? errors.salary.message : ""}
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label="Role"
                        {...register("role")}
                        fullWidth
                        margin="normal"
                        error={!!errors.role}
                        helperText={errors.role ? errors.role.message : ""}
                    />
                </Grid>
            </Grid>
        </Card>
    );
}
