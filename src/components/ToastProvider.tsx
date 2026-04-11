'use client'

import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'

export default function ToastProvider() {
  return (
    <>
      <ToastContainer
        toastStyle={{
          color: '#fff',
        }}
      />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: '',
          duration: 3000,
          removeDelay: 1000,
          style: {
            background: '#427fc1',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'white',
            },
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#fff',
            },
          },
        }}
      />
    </>
  )
}

// Made with Bob
