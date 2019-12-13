import { Prisma } from '../../generated/prisma-client'

export interface Context {
    userId: string
    prisma: Prisma
}