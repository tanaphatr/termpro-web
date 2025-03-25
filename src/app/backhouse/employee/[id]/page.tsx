'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import ButtonAdd from '@/components/ButtonAdd';
import Formemployee, { FormEmployeeValues, defaultEmployeeValues } from '../components/Formemployee';
import axios from 'axios';

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
        router.push(`/backhouse/employee`);
    }

    const handleEdit = () => {
        router.push(`/backhouse/employee/${ID}/edit`);
    }

    return (
        <PageLayout title="รายละเอียดพนักงาน" onBack={handleOnBack}
            buttons={[
                <ButtonAdd label="แก้ไข" onClick={handleEdit} />
            ]}>
            <FormProvider {...methods}>
                <Formemployee title='รายละเอียดพนักงาน' mode='view'></Formemployee>
            </FormProvider>
        </PageLayout>
    )
}
