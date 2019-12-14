import { toaster } from 'evergreen-ui'

export default (link: string) => {
    toaster.success(`Commission link: ${link}`, {
        duration: 1000000,
        id: link
    })
}