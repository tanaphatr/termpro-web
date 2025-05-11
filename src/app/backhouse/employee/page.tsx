'use client';

import PageLayout from '@/components/layouts/PageLayout'
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ButtonAdd from '@/components/ButtonAdd';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// const employees = [
//   { id: '1', nickname: 'John', firstname: 'John', lastname: 'Doe', position: 'Manager', salary: 50000, phone: '123-456-7890' },
//   { id: '2', nickname: 'Jane', firstname: 'Jane', lastname: 'Smith', position: 'Developer', salary: 40000, phone: '987-654-3210' },
//   { id: '3', nickname: 'Mike', firstname: 'Mike', lastname: 'Johnson', position: 'Designer', salary: 45000, phone: '555-555-5555' }
// ]
interface employees {
  employee_id: string;
  first_name: string;
  last_name: string;
  position: string;
  nickname: string;
  phone: string;
  salary: string;
}

export default function Employee() {
  const router = useRouter();

  const [employees, setEmployees] = useState<employees[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
      try {
        const response = await axios.get('/Employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching Employees:', error);
      }
    };
    fetchEmployees();
  }, []);


  const handleClickAdd = () => {
    router.push('employee/create');
  }

  const handleClickView = (id: string) => {
    router.push(`employee/${id}`);
  }

  return (
    <PageLayout
      title="Employee"
      buttons={[
        <ButtonAdd label="Add Employee" onClick={handleClickAdd} />
      ]}
    >
      < TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nickname</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.employee_id}>
                <TableCell>{employee.nickname}</TableCell>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="view" onClick={() => handleClickView(employee.employee_id)}>
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
