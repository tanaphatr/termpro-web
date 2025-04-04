'use client';

import React from 'react'
import Formemployee, { defaultEmployeeValues, FormEmployeeValues } from '../components/Formemployee';
import ButtonAdd from '@/components/ButtonAdd';
import PageLayout from '@/components/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';

export default function EmployeeCreate() {
    const router = useRouter();

    const methods = useForm<FormEmployeeValues>({
        defaultValues: defaultEmployeeValues,
    });

    const handleOnBack = () => {
        router.push('/backhouse/employee');
    }

    const handleSubmit = () => {
        methods.handleSubmit(async (data) => {
            axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
            try {
                const response = await axios.post(`/Employees`, data);
                console.log('employee updated:', response.data);
                router.push(`/backhouse/employee`);
            } catch (error) {
                console.error('Error updating employee:', error);
            }
        })();
    }

    return (
        <PageLayout title="Add Employee" onBack={handleOnBack}
            buttons={[
            <ButtonAdd label="Confirm" onClick={handleSubmit} />
            ]}>
            <FormProvider {...methods}>
            <Formemployee title={'Add Employee'} mode='create'/>
            </FormProvider>
        </PageLayout>
    )
}
