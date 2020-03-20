import Layout from '../components/Layout'
import { Pane, Card, Paragraph } from 'evergreen-ui'
import ContentNav from '../components/ContentNav'

const Page = () => {

    return <Layout fullWidth>
        <Pane width={'100%'} maxWidth={1200} margin='auto' marginTop={-50} position='relative'>
            <img src='/earn.jpg' width='100%' style={{ position: 'absolute', zIndex: - 10 }} />
            <Pane position='relative' top={50} maxWidth={1000} margin='auto' >
                <Card maxWidth={600} float='left' position='absolute'>
                    <ContentNav />

                </Card>
            </Pane>
        </Pane>
    </Layout>
}

export default Page