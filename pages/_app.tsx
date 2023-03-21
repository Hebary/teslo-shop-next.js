import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SWRConfig } from 'swr';
import { SessionProvider } from "next-auth/react"
import { lightTheme } from '../themes';
import '@/styles/globals.css'
import { AuthProvider, CartProvider, UIProvider } from '@/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json())
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UIProvider>
              <ThemeProvider theme={ lightTheme }>
                <CssBaseline/>
                  <Component {...pageProps} />
                </ThemeProvider>
            </UIProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
