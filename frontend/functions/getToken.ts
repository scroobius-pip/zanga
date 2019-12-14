import cookies from 'next-cookies'
import { NextPageContext } from 'next'

export default (ctx: any): string => {
    const { token = '' } = cookies(ctx)
    return token
}