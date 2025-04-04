'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Formemployee, { defaultEmployeeValues, FormEmployeeValues } from '../../components/Formemployee';
import { useForm, FormProvider } from 'react-hook-form';
import ButtonAdd from '@/components/ButtonAdd';
import axios from 'axios';
import ButtonDelete from '@/components/ButtonDelete';

type EmployeeDetailPageProps = {
    params: {
        id: string;
    };
};

export default function EmployeeDetail(props: EmployeeDetailPageProps) {
    const { id: ID } = props.params
    const router = useRouter();

    const methods = useForm<FormEmployeeValues>({
        defaultValues: defaultEmployeeValues,
    });

    useEffect(() => {
        const fetchProducts = async () => {
            axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
            try {
                const response = await axios.get(`/Employees`);
                const employee = response.data.find((employee: any) => employee.employee_id.toString() === ID);
                if (employee) {
                    methods.reset(employee);
                    console.log('Employees:', employee);
                } else {
                    console.error('Employees not found');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [ID, methods]);

    const handleOnBack = () => {
        router.push(`/backhouse/employee/${ID}`);
    }

    const handleSubmit = () => {
        methods.handleSubmit(async (data) => {
            try {
                const response = await axios.put(`/Employees/${ID}`, data);
                console.log('Employees updated:', response.data);
                router.push(`/backhouse/employee/${ID}`);
            } catch (error) {
                console.error('Error updating Employees:', error);
            }
        })();
    }

    const handleDelete = () => {
        methods.handleSubmit(async () => {
            try {
                await axios.delete(`/Employees/${ID}`);
                router.push(`/backhouse/employee`);
            } catch (error) {
                console.error('Error updating Employees:', error);
            }
        })();
    }
    return (
        <PageLayout title="Edit Employee Details" onBack={handleOnBack}
            buttons={[
                <ButtonAdd label="Confirm" onClick={handleSubmit} />,
                <ButtonDelete label="Delete" onClick={handleDelete} />
            ]}>
            <FormProvider {...methods}>
                <Formemployee title='Employee Details' mode='edit'></Formemployee>
            </FormProvider>
        </PageLayout>
    )
}
