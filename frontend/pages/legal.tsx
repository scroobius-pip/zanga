import WithUser from '../components/WithUser'
import Layout from '../components/Layout'
import { Pane, Heading, Card } from 'evergreen-ui'
import ReactMarkdown from 'react-markdown/with-html'
import privacyPolicy from '../content/privacy-policy'
import terms from '../content/terms'

import { colors } from '../styles'

const Page = ({ user }) => {
    return <Layout userName={user?.name}>
        <Card elevation={2} id='privacy' background={'white'} padding={50}>
            <ReactMarkdown
                className='content'
                source={privacyPolicy}

            />

        </Card>
        <Card elevation={2} marginTop={40} id='terms' background={'white'} padding={50}>
            <ReactMarkdown
                className='content'
                source={terms}
            />
        </Card>
    </Layout>
}



export default WithUser(Page)