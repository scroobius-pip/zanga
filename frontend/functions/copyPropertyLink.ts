import { toaster } from 'evergreen-ui'
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default (link: string) => {
    toaster.success(`Commission link: ${link}`, {
        duration: 1000000,
        id: link
    })
}