import Head from 'next/head';
import { Navbar, Sidemenu } from '../ui'
interface Props {
    children: React.ReactElement | React.ReactElement[]
    imageFullUrl?: string
    pageDescription?: string
    title?: string
}


export const ShopLayout: React.FC<Props> = ({ children, imageFullUrl, title, pageDescription }) => {
   return (
    <>
       <Head>
          <title>{ title }</title>
          <meta name="description" content={pageDescription} />


          <meta name="og:description" content={pageDescription} />
          <meta name="og:title" content={title} />
          
          {
            imageFullUrl &&
            <meta name="og:image" content={imageFullUrl} />
          }
       </Head>
        
       <Navbar/>
       <Sidemenu/>
        
       <main style={{ padding: '0 30px', margin:'80px auto', maxWidth:'1440px' }}>
            {children}
       </main>

       {/* <Footer/> */}
    </>
   )
}