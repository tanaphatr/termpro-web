'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import React from 'react'
import Formemployee, { defaultEmployeeValues, FormEmployeeValues } from '../../components/Formemployee';
import { useForm, FormProvider } from 'react-hook-form';
import ButtonAdd from '@/components/ButtonAdd';

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
        router.push(`/backhouse/employee/${ID}`);
    }

    const handleSubmit = () => {
        methods.handleSubmit((data) => {
            console.log(data);
        })();
    }
    return (
        <PageLayout title="แก้ไขรายละเอียดพนักงาน" onBack={handleOnBack}
            buttons={[
                <ButtonAdd label="ยืนยัน" onClick={handleSubmit} />
            ]}>
            <FormProvider {...methods}>
                <Formemployee title='รายละเอียดพนักงาน' mode='edit'></Formemployee>
            </FormProvider>
        </PageLayout>
    )
}
