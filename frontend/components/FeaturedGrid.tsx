import FeaturedPropertyCard from './FeaturedPropertyCard'
import Slider from 'react-styled-carousel-am'
import { Pane } from 'evergreen-ui'
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
    default: 1,
    1100: 2,
    700: 1,
    500: 1,
    1200: 3,
    1800: 3,
    2000: 3,
    5000: 3
}

export default () => {
    return <>


        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">


            {
                ['', '', '', '', '',].map((_, i) => {
                    return <FeaturedPropertyCard key={i} />

                })
            }


        </Masonry>

    </>



}