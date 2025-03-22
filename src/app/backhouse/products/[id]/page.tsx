'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import React from 'react'
import Formproduct, { defaultProductValues, FormProductValues } from '../components/Formproduct';
import { useForm, FormProvider } from 'react-hook-form';

export default function ProductDetail() {
    const router = useRouter();
    
    const methods = useForm<FormProductValues>({
        defaultValues: defaultProductValues,
    });

    const handleOnBack = () => {
        router.push('/backhouse/products');
    }

    return (
        <PageLayout title="รายละเอียดสินค้า" onBack={handleOnBack}>
            <FormProvider {...methods}>
                <Formproduct />
            </FormProvider>
        </PageLayout>
    )
}
