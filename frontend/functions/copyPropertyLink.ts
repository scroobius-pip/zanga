import { toaster } from 'evergreen-ui'

export default (link: string) => {
    toaster.success(`Commission link: ${link}`, {
        duration: 5,
        id: link,
        hasCloseButton: true,
        description: 'You will be contacted once its sold.'
    })
}