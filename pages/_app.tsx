import {appWithTranslation} from 'next-i18next'
import Layout from '@/components/layout';
import { CartProvider } from '@/context/cartContext';
import '@/styles/globals.css'
import { AppProps } from 'next/app';
import Head from 'next/head';

function App({Component, pageProps }: AppProps) {
    return (
        <CartProvider>
        <Layout>
        <Head>
        <title>Atelier de Bernard</title>
      </Head>
        <Component {...pageProps} />
        </Layout>
        </CartProvider>
    )
}

export default appWithTranslation(App)