import { toaster, Pane, Text } from 'evergreen-ui'

import Link from 'next/link'
import ShareButtons from '../components/ShareButtons'


const ToastContent = ({ url, title }) => {
    return <Pane>
        <ShareButtons
            url={url}
            title={title}
        />
        <Text>Check your points in the <Link href='/dashboard'>dashboard</Link></Text>
    </Pane>
}

export default (url: string, title: string) => {
    toaster.success(`Commission link: ${url}`, {
        duration: 10,
        id: url,
        hasCloseButton: true,
        description: <ToastContent url={url} title={title} />
    })
}