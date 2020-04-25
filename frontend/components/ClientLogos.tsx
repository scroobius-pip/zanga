import { Card, Pane } from 'evergreen-ui'
import Slider from 'react-styled-carousel-am';

interface Props {
    url: string
}

const logos = [
    "https://i.imgur.com/qIAL02n.jpg",
    "https://tiganoproperties.com/wp-content/uploads/2020/01/tigano-properties-logo-png.png"
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
            <img src={url} style={{
                maxHeight: 200,
                maxWidth: 350
            }} width={'100%'} />
        </Card >
    </div>
}

