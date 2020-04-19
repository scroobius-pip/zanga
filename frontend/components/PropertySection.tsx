import { User } from '../generated/graphql';
import TabsContainer, { TabContainerProps } from './TabsContainer';
import PropertiesContainer from './PropertiesContainer';
import { Property } from './PropertyCard';
import { Pane } from 'evergreen-ui';
import { useState } from 'react';

interface Props {
    view: 'list' | 'grid'
    rentProperties: Property[]
    saleProperties: Property[]
    devProperties: Property[]
    user?: Pick<User, 'id' | 'name'>
    disablePropertyCardButton?: boolean
}


export default ({ saleProperties, rentProperties, user, devProperties, view, disablePropertyCardButton = false }: Props) => {
    // const [view, setView] = useState<'list' | 'grid'>(view)

    const tabs: TabContainerProps['tabs'] = [{
        body: <PropertiesContainer disableCardButton={disablePropertyCardButton} view={view} refId={user?.id} properties={saleProperties} />,
        title: 'Sale'
    }, {

        body: <PropertiesContainer disableCardButton={disablePropertyCardButton} view={view} refId={user?.id} properties={rentProperties} />,
        title: 'Rent'
    },
    {

        body: <PropertiesContainer disableCardButton={disablePropertyCardButton} view={view} refId={user?.id} properties={devProperties} />,
        title: 'Development Projects'
    },


    ]

    return <Pane maxWidth={1200} margin='auto' marginTop={25} background='tint1' padding={'2vw'}>
        <TabsContainer tabs={tabs} />
    </Pane>
}