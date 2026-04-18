'use client'

import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import HeaderOne from '@/components/common/headers/header-one'
import FooterOne from '@/components/common/footers/footer-one'

export default function ShopLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderOne logoName={'logo.png'} />
      {children}
      <FooterOne logoName={'logo.png'} />
      <ToastContainer />
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
              secondary: '#fff',
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
