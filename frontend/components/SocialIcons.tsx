import { SocialMediaIconsReact } from 'social-media-icons-react';


const platforms = [
    {
        platform: 'twitter',
        url: 'https://twitter.com'
    },
    {
        platform: 'facebook',
        url: 'https://facebook.com'
    },
    {
        platform: 'instagram',
        url: 'https://facebook.com'
    }

]

export default () => {
    return <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
        {
            platforms.map(p => <span style={{ marginRight: 10 }}>
                <SocialMediaIconsReact icon={p.platform} iconSize={5} size={35} url={p.url} roundness={50} />
            </span>)
        }

    </div>
}