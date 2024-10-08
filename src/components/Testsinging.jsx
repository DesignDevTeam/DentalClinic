'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'; // Correct import for App Router

export default function Component() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  const handleSubmit =async (e) => {
    e.preventDefault()
    console.log('Email:', email, 'Password:', password)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const {data} = await response.json()
       
        console.log("Login successful:", data);
        if (data.user) {
          router.push("/admin"); // Admin Dashboard
        } else {
          console.error("Access Denied");
        }
      } else {
        console.error('Login failed:', response.statusText)
        // Handle login failure (e.g., show error message)
      }
    } catch (error) {
      console.error('Error during login:', error)
      // Handle network errors or other exceptions
    }
  

  }

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
    </div>
  )
}