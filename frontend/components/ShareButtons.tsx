// @ts-nocheck

import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'


const IconProps = {
    round: true,
    size: 35
}

interface Props {
    url: string
    title: string
}

export default ({ url, title }: Props) => {

    const ButtonProps = {
        url,
        style: {
            marginRight: 10
        },
        title
    }

    return <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 10 }}>
        <FacebookShareButton quote='' hashtag='#Coronavirus' {...ButtonProps} >
            <FacebookIcon {...IconProps} />
        </FacebookShareButton>
        <TwitterShareButton {...ButtonProps} hashtags={['myzanga', 'property', 'realestate']} >
            <TwitterIcon {...IconProps} />
        </TwitterShareButton>
        <WhatsappShareButton separator=' ' {...ButtonProps}>
            <WhatsappIcon   {...IconProps} />
        </WhatsappShareButton>
    </div>
}