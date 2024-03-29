import { Slide } from "react-slideshow-image"
import styles from './ProductSlideshow.module.css'
import 'react-slideshow-image/dist/styles.css'

interface Props {
    images: string[]
}

export const ProductSlideshow: React.FC<Props> = ({ images }) => {
   return (
        <Slide
            easing="ease"
            duration={5000}
            indicators
            autoplay
        >
        {
            images.map(image => {
                return (
                    <div className={styles['each-slide']} key={ image }>
                        <div style={{ 
                                backgroundImage:`url( ${image} )`,
                                backgroundSize:'cover'
                            }}>

                        </div>
                    </div>
                ) 
            })
        }    
        </Slide>
    )
}
