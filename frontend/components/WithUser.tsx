import getToken from '../functions/getToken'
import { GraphQLClient } from 'graphql-request'
import { getSdk, User } from '../generated/graphql'
import logout from '../functions/logout'

interface InitialProps {
    user?: Pick<User, 'id' | 'name'>
}

export default (Page) => {

    Page.getInitialProps = async ({ query, ...ctx }): Promise<InitialProps> => {
        const token = getToken(ctx)
        const client = new GraphQLClient('https://zanga-api.now.sh/graphql', {
            headers: token.length ? {
                authorization: 'Bearer ' + token
            } : null
        })
        const sdk = getSdk(client)

        return {
            user: !!token.length ? await (async () => {
                try {

                    return (await sdk.me()).me
                } catch (err) {
                    logout()
                    return null
                }

            })() : null
        }
    }

    return Page

}