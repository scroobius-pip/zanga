import { Pane, Avatar, Card, Button, Popover, Text, Position, Menu, toaster } from 'evergreen-ui'
import Router from 'next/router'
import Link from 'next/link'
import logout from '../functions/logout'

interface Props {
    userName?: string
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

export default ({ userName }: Props) => {
    return <Card marginBottom={25} padding={15} background='white' elevation={3} width={'100%'} display='flex' justifyContent='space-between'>
        <Link href='/'>
            <img style={{ cursor: 'grab' }} src='/zanga-logo.svg' height={40} />
        </Link>

        {userName ? <AvatarPopover userName={userName} /> : <Button height={40} onClick={() => Router.push('/register')} appearance="minimal">Register</Button>}

    </Card>
}
