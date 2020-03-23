import { Pane, Avatar, Card, Button, Popover, Text, Position, Menu, toaster } from 'evergreen-ui'
import Router from 'next/router'
import Link from 'next/link'
import logout from '../functions/logout'
import { colors } from '../styles'

interface Props {
    userName?: string
    fullWidth?: boolean
}

const AvatarPopover = ({ userName = '' }) => {
    return <Popover
        position={Position.BOTTOM_RIGHT}

        content={
            <Menu>
                <Menu.Group>
                    <Menu.Item
                        icon='dashboard'
                        onSelect={() => Router.push('/dashboard')}
                    >
                        Dashboard
              </Menu.Item>
                    <Menu.Item
                        icon='log-out' intent="danger"
                        onSelect={() => {
                            logout()
                            Router.push('/login')
                        }}
                    >
                        Logout
              </Menu.Item>

                </Menu.Group>
            </Menu>
        }
    >
        <Avatar name={userName} size={40} />
    </Popover>
}
export { AvatarPopover }

export default ({ userName, fullWidth = true }: Props) => {
    const width = !fullWidth ? '100%' : 800

    return <Card marginBottom={25} elevation={ 3} padding={15} background={'white'} width={'100%'}>
        <Pane maxWidth={width} margin='auto' display='flex' justifyContent='space-between'>

            <Link href='/'>
                <img style={{ cursor: 'grab' }} src='/zanga-logo.svg' height={40} />
            </Link>

            {userName ? <AvatarPopover userName={userName} /> :
                <div>
                    <Button onClick={() => Router.push('/login')} appearance='primary' height={40}>Login</Button>
                    <Button onClick={() => Router.push('/register')} height={40} appearance="minimal">Register</Button>
                </div>
            }
        </Pane>

    </Card>
}
