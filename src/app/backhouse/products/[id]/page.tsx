'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { useRouter } from 'next/navigation';
import React from 'react'
import Formproduct, { defaultProductValues, FormProductValues } from '../components/Formproduct';
import { useForm, FormProvider } from 'react-hook-form';
import ButtonAdd from '@/components/ButtonAdd';

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

    const handleOnBack = () => {
        router.push('/backhouse/products');
    }

    const handleEdit = () => {
        router.push(`/backhouse/products/${ID}/edit`);
    }

    return (
        <PageLayout title="รายละเอียดสินค้า" onBack={handleOnBack}
            buttons={[
                <ButtonAdd label="แก้ไข" onClick={handleEdit} />
            ]}>
            <FormProvider {...methods}>
                <Formproduct title='รายละเอียดสินค้า' mode='view'></Formproduct>
            </FormProvider>
        </PageLayout>
    )
}
