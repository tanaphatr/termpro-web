'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Backhouse() {
  const [role, setrole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    setrole(user.role);
    if (role === 'admin' || role === 'employee') {
      router.push('/backhouse/dashboard');
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>ไป Login</h1>
    </div>
  )
}
