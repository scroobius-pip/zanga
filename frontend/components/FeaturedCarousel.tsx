import FeaturedPropertyCard from './FeaturedPropertyCard'
import Slider from 'react-styled-carousel-am'
import { Pane } from 'evergreen-ui'
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 4
}

export default () => {
    return <div style={{ width: '100%' }}>


        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column">


            {
                ['', '', '', '', ''].map(() => {
                    return <FeaturedPropertyCard />

                })
            }


        </Masonry>
        <style jsx>
            {`

.masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -30px; /* gutter size offset */
    width: auto;
  }
  .masonry-grid_column {
    padding-left: 30px; /* gutter size */
    background-clip: padding-box;
  }


`}
        </style>
    </div>



}