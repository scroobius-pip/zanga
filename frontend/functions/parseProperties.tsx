import { Property } from '../components/PropertyCard';
import { CostType, PropertiesQuery } from '../generated/graphql';
export const parseProperties = (properties: PropertiesQuery['properties']): Property[] => {
    return properties.map((p): Property => {
        const price = Intl.NumberFormat().format(p.costValue);
        return {
            title: p.title,
            id: p.id,
            images: p.images,
            location: `${p.state},${p.city}`,
            price: p.costType === CostType.Rent ? `₦${price}/yr` : `₦${price}`,
            description: p.description
        };
    });
};
