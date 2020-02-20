import { QueryResolvers } from '../../../generated/graphqlgen';
import meResolver from './me';
import propertiesResolver from './properties';
import propertyResolver from './property';

const Query: QueryResolvers.Type = {
    me: meResolver,
    properties: propertiesResolver,
    property: propertyResolver

}

export default Query