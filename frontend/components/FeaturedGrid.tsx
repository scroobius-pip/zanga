import FeaturedPropertyCard from './FeaturedPropertyCard'
import Slider from 'react-styled-carousel-am'
import { Pane, Spinner } from 'evergreen-ui'
import { useEffect, useState } from 'react'
import { useScreenClass } from 'react-grid-system';
import { Property } from './PropertyCard';

interface Properties {
    featuredProperties: Property[]
}

export default (props: Properties) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    const Card = ['lg', 'xl'].includes(useScreenClass()) ?
        FeaturedPropertyCard.Large : FeaturedPropertyCard.Small

    return <>

        {loading ? <Spinner /> : <Slider
            cardsToShow={1}
            autoSlide={4000}
            showArrows={false}

        >
            {props.featuredProperties.map((property, i) => {
                return <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Card {...property} key={i} />
                </div>

            })}
        </Slider>}

    </>



}