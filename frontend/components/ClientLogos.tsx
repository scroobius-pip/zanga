import { Card, Pane } from 'evergreen-ui'
import Slider from 'react-styled-carousel-am';

interface Props {
    url: string
}

const logos = [
    "https://images.nigeriapropertycentre.com/properties/profiles/8_l.jpg",
    "https://www.landlordhero.com.ng/theme/base-propertyplus/images/landlordhrologo.jpg",
    "https://images.nigeriapropertycentre.com/properties/profiles/8918-1543509110_l.jpg"
]

export default () => {
    return <Pane
        flexDirection='row'
        display='flex'
        whiteSpace='nowrap'
        overflowY='auto'
    >
        {logos.map((url) => <Logo url={url} />)}
    </Pane>
}

const Logo = ({ url }: { url: string }) => {
    return <div style={{ padding: 10, minWidth: 200, maxWidth: 350, maxHeight: 200 }}>
        <Card justifyContent='center' display='flex' alignItems='center' height='100%' width='100%' background='white' elevation={1} padding={20} >
            <img src={url} width={'100%'} />
        </Card >
    </div>
}

