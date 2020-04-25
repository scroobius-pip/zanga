import getToken from '../functions/getToken'
import { GraphQLClient } from 'graphql-request'
import { getSdk, User } from '../generated/graphql'
import logout from '../functions/logout'
import React from 'react'



export default (Page) => {

    return class UserComponent extends React.Component {
        static async getInitialProps(ctx) {
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

                })() : null,
                ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {})
            }
        }

        render() {
            return <Page {...this.props} />
        }
    }



}