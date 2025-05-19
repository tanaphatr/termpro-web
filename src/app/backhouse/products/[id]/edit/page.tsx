'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Formproduct, { defaultProductValues, FormProductValues } from '../../components/Formproduct';
import { useForm, FormProvider } from 'react-hook-form';
import ButtonAdd from '@/components/ButtonAdd';
import ButtonDelete from '@/components/ButtonDelete';
import axios from 'axios';
import { useSnackbar } from 'notistack';

type ProductDetailPageProps = {
    params: {
        id: string;
    };
};

export default function ProductDetail(props: ProductDetailPageProps) {
    const { id: ID } = props.params
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const methods = useForm<FormProductValues>({
        defaultValues: defaultProductValues,
    });

    useEffect(() => {
        const fetchProducts = async () => {
            axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
            try {
                const response = await axios.get(`/Products`);
                const product = response.data.find((product: any) => product.product_id.toString() === ID);
                if (product) {
                    methods.reset(product);
                    console.log('Product:', product);
                } else {
                    console.error('Product not found');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [ID, methods]);

    const handleOnBack = () => {
        router.push(`/backhouse/products/${ID}`);
    }

    const handleSubmit = () => {
        methods.handleSubmit(async (data) => {
            try {
                const response = await axios.put(`/Products/${ID}`, data);
                console.log('Product updated:', response.data);
                enqueueSnackbar('Edit product successfully!', { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
                router.push(`/backhouse/products/${ID}`);
            } catch (error) {
                console.error('Error updating product:', error);
                enqueueSnackbar('Error updating product', { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
            }
        })();
    }

    const handleDelete = () => {
        methods.handleSubmit(async (data) => {
            try {
                await axios.delete(`/Products/${ID}`);
                enqueueSnackbar('Delete product successfully!', { variant: 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
                router.push(`/backhouse/products`);
            } catch (error) {
                console.error('Error updating product:', error);
                enqueueSnackbar('Error Edit Product', { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
            }
        })();
    }
    return (
        <PageLayout title="Products Detail" onBack={handleOnBack}
            buttons={[
                <ButtonAdd label="Confirm" onClick={handleSubmit} />,
                <ButtonDelete label="Delete" onClick={handleDelete} />
            ]}>
            <FormProvider {...methods}>
                <Formproduct title='Products Detail' mode='edit'></Formproduct>
            </FormProvider>
        </PageLayout>
    )
}
