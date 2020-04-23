import Masonry from 'react-masonry-css'
import { ScreenClassRender } from 'react-grid-system'

interface Props<T> {
    item: (props: T) => JSX.Element
    data: T[]
}

function ResponsiveList<T>(props: Props<T>) {
    return <ScreenClassRender
        render={screenClass => ['md', 'lg', 'xl'].includes(screenClass) ?
            <ResponsiveGrid {...props} />
            : <ResponsiveGrid {...props} />}
    />
}


const ResponsiveGrid = (props) => {
    return <div></div>
}