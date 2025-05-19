'use client';

import PageLayout from '@/components/layouts/PageLayout'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import Formproduct, { FormProductValues, defaultProductValues } from '../components/Formproduct';
import ButtonAdd from '@/components/ButtonAdd';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export default function CreateProduct() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const methods = useForm<FormProductValues>({
        defaultValues: defaultProductValues,
    });

    const handleOnBack = () => {
        router.push('/backhouse/products');
    }

    const handleSubmit = () => {
        methods.handleSubmit(async (data) => {
            axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
            try {
                const response = await axios.post(`/Products`, data);
                console.log('Product updated:', response.data);
                enqueueSnackbar('Product created successfully!', { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
                router.push(`/backhouse/products`);
            } catch (error) {
                console.error('Error updating product:', error);
                enqueueSnackbar('Error creating product', { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
            }
        })();
    }

    return (
        <PageLayout title="Products Create" onBack={handleOnBack}
            buttons={[
                <ButtonAdd label="Confirm" onClick={handleSubmit} />
            ]}>
            <FormProvider {...methods}>
                <Formproduct title='Products Create' mode='create'></Formproduct>
            </FormProvider>
        </PageLayout>
    )
}
