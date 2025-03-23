'use client';

import PageLayout from '@/components/layouts/PageLayout'
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ButtonAdd from '@/components/ButtonAdd';
import { useRouter } from 'next/navigation';

const employees = [
  { id: '1', nickname: 'John', firstname: 'John', lastname: 'Doe', position: 'Manager', salary: 50000, phone: '123-456-7890' },
  { id: '2', nickname: 'Jane', firstname: 'Jane', lastname: 'Smith', position: 'Developer', salary: 40000, phone: '987-654-3210' },
  { id: '3', nickname: 'Mike', firstname: 'Mike', lastname: 'Johnson', position: 'Designer', salary: 45000, phone: '555-555-5555' }
]

export default function Employee() {
  const router = useRouter();

  const handleClickAdd = () => {
    router.push('employee/create');
  }

  const handleClickView = (id: string) => {
    router.push(`employee/${id}`);
  }

  return (
    <PageLayout
      title="พนักงาน"
      buttons={[
        <ButtonAdd label="เพิ่มพนักงาน" onClick={handleClickAdd} />
      ]}
    >
      < TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ชื่อเล่น</TableCell>
              <TableCell>ชื่อจริง</TableCell>
              <TableCell>นามสกุล</TableCell>
              <TableCell>ตำแหน่ง</TableCell>
              <TableCell>เงินเดือน</TableCell>
              <TableCell>เบอร์โทร</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.nickname}</TableCell>
                <TableCell>{employee.firstname}</TableCell>
                <TableCell>{employee.lastname}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="view" onClick={() => handleClickView(employee.id)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
    </PageLayout >
  )
}
