'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Formproduct, { defaultProductValues, FormProductValues } from '../../components/Formproduct';
import { useForm, FormProvider } from 'react-hook-form';
import ButtonAdd from '@/components/ButtonAdd';
import ButtonDelete from '@/components/ButtonDelete';
import axios from 'axios';

type ProductDetailPageProps = {
    params: {
        id: string;
    };
};

export default function ProductDetail(props: ProductDetailPageProps) {
    const { id: ID } = props.params
    const router = useRouter();

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
                router.push(`/backhouse/products/${ID}`);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        })();
    }

    const handleDelete = () => {
        methods.handleSubmit(async (data) => {
            try {
                await axios.delete(`/Products/${ID}`);
                router.push(`/backhouse/products`);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        })();
    }
    return (
        <PageLayout title="รายละเอียดสินค้า" onBack={handleOnBack}
            buttons={[
                <ButtonAdd label="ยืนยัน" onClick={handleSubmit} />,
                <ButtonDelete label="ลบ" onClick={handleDelete} />
            ]}>
            <FormProvider {...methods}>
                <Formproduct title='รายละเอียดสินค้า' mode='edit'></Formproduct>
            </FormProvider>
        </PageLayout>
    )
}
