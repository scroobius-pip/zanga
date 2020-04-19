import FeaturedPropertyCard from './FeaturedPropertyCard'
import Slider from 'react-styled-carousel-am'
import { Pane } from 'evergreen-ui'
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
    500: 1
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