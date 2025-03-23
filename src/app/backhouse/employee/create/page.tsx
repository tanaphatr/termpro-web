'use client';

import React from 'react'
import Formemployee, { defaultEmployeeValues, FormEmployeeValues } from '../components/Formemployee';
import ButtonAdd from '@/components/ButtonAdd';
import PageLayout from '@/components/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';

export default function EmployeeCreate() {
    const router = useRouter();

    const methods = useForm<FormEmployeeValues>({
        defaultValues: defaultEmployeeValues,
    });

    const handleOnBack = () => {
        router.push('/backhouse/products');
    }

    const handleSubmit = () => {
        methods.handleSubmit((data) => {
            console.log(data);
        })();
    }

    return (
        <PageLayout title="เพิ่มสินค้า" onBack={handleOnBack}
            buttons={[
                <ButtonAdd label="ยืนยัน" onClick={handleSubmit} />
            ]}>
            <FormProvider {...methods}>
                <Formemployee title={'เพิ่มพนักงาน'} />
            </FormProvider>
        </PageLayout>
    )
}
