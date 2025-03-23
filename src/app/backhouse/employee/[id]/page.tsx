'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import ButtonAdd from '@/components/ButtonAdd';
import Formemployee, { FormEmployeeValues, defaultEmployeeValues } from '../components/Formemployee';

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
                <Formemployee title='รายละเอียดพนักงาน'></Formemployee>
            </FormProvider>
        </PageLayout>
    )
}
