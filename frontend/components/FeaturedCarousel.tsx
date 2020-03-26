import FeaturedPropertyCard from './FeaturedPropertyCard'
import Slider from 'react-styled-carousel-am'
import { Pane } from 'evergreen-ui'

const responsive = [
    { breakPoint: 425, cardsToShow: 1 },
    { breakPoint: 1280, cardsToShow: 4 }, // this will be applied if screen size is greater than 1280px. cardsToShow will become 4.
    { breakPoint: 760, cardsToShow: 3 },
]

export default () => {
    return <Slider autoSlide={5000} responsive={responsive} showArrows>
        {
            ['', '', '', '', ''].map(() => {
                return <Pane padding={10}>

                    <FeaturedPropertyCard />
                </Pane>
            })
        }



    </Slider>


}