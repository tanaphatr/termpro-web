'use client'

import ButtonAdd from '@/components/ButtonAdd'
import PageLayout from '@/components/layouts/PageLayout'
import { Typography } from '@mui/material'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormReport, { defaultReportValues, FormReportValues } from './components/Formsale-report'

export default function SaleReport() {
  const methods = useForm<FormReportValues>({
    defaultValues: defaultReportValues,
  });

  const handleSubmit = () => {
    methods.handleSubmit((data) => {
      console.log(data);
    })();
  }

  return (
    <PageLayout title="รายงานการขาย"
      buttons={[
        <ButtonAdd label="ยืนยัน" onClick={handleSubmit} />
      ]}>
      <FormProvider {...methods}>
        <FormReport title="รายงานการขาย" />
      </FormProvider>
    </PageLayout>
  )
}
