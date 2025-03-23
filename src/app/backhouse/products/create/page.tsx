'use client';

import PageLayout from '@/components/layouts/PageLayout'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import Formproduct, { FormProductValues, defaultProductValues } from '../components/Formproduct';
import ButtonAdd from '@/components/ButtonAdd';

export default function CreateProduct() {
    const router = useRouter();

    const methods = useForm<FormProductValues>({
        defaultValues: defaultProductValues,
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
                <Formproduct title='เพิ่มสินค้า'></Formproduct>
            </FormProvider>
        </PageLayout>
    )
}
