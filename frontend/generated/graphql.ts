import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type ContactAgentInput = {
  propertyId: Scalars['String'],
  name: Scalars['String'],
  number: Scalars['String'],
  referrerId: Scalars['String'],
  email: Scalars['String'],
  notes: Scalars['String'],
};

export type Cost = {
   __typename?: 'Cost',
  value: Scalars['Int'],
  costType: CostType,
};

export enum CostType {
  Rent = 'Rent',
  Sale = 'Sale'
}

export type CreatePropertyInput = {
  title: Scalars['String'],
  location: LocationInput,
  costValue: Scalars['Int'],
  costType: CostType,
  featured: Scalars['Boolean'],
  images: Array<Scalars['String']>,
  description: Scalars['String'],
};

export type Location = {
   __typename?: 'Location',
  city: Scalars['String'],
  state: Scalars['String'],
};

export type LocationInput = {
  city: Scalars['String'],
  state: Scalars['String'],
};

export type LoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type LoginResult = {
   __typename?: 'LoginResult',
  token?: Maybe<Scalars['String']>,
  message: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  register: RegisterResult,
  login: LoginResult,
  createProperty: Scalars['ID'],
  deleteProperty: Scalars['Boolean'],
  contactAgent: Scalars['Boolean'],
};


export type MutationRegisterArgs = {
  input: RegisterInput
};


export type MutationLoginArgs = {
  input: LoginInput
};


export type MutationCreatePropertyArgs = {
  input: CreatePropertyInput
};


export type MutationDeletePropertyArgs = {
  id: Scalars['ID']
};


export type MutationContactAgentArgs = {
  input: ContactAgentInput
};

export type Property = {
   __typename?: 'Property',
  id: Scalars['String'],
  title: Scalars['String'],
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  costValue: Scalars['Int'],
  costType: CostType,
  owner: User,
  images?: Maybe<Array<Scalars['String']>>,
  description?: Maybe<Scalars['String']>,
  featured?: Maybe<Scalars['Boolean']>,
};

export type PropertyPoint = {
   __typename?: 'PropertyPoint',
  propertyId: Scalars['String'],
  propertyTitle: Scalars['String'],
  points: Scalars['Int'],
  profit: Scalars['Float'],
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  properties: Array<Maybe<Property>>,
  property?: Maybe<Property>,
  currentRate: Scalars['Float'],
  featuredProperties: Array<Maybe<Property>>,
};


export type QueryPropertiesArgs = {
  type: CostType
};


export type QueryPropertyArgs = {
  id: Scalars['ID']
};

export type RegisterInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  name: Scalars['String'],
  phone: Scalars['String'],
  cac?: Maybe<Scalars['String']>,
  tin?: Maybe<Scalars['String']>,
  type: UserType,
};

export type RegisterResult = {
   __typename?: 'RegisterResult',
  token?: Maybe<Scalars['String']>,
  message: Scalars['String'],
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  phone: Scalars['String'],
  name: Scalars['String'],
  type: UserType,
  properties: Array<Property>,
  point?: Maybe<UserPoint>,
};

export type UserPoint = {
   __typename?: 'UserPoint',
  propertyPoints: Array<PropertyPoint>,
  totalProfit: Scalars['Float'],
  totalPoints: Scalars['Int'],
};

export enum UserType {
  Agency = 'Agency',
  Individual = 'Individual'
}

export type ContactAgentMutationVariables = {
  input: ContactAgentInput
};


export type ContactAgentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'contactAgent'>
);

export type AddPropertyMutationVariables = {
  input: CreatePropertyInput
};


export type AddPropertyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createProperty'>
);

export type DeletePropertyMutationVariables = {
  id: Scalars['ID']
};


export type DeletePropertyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProperty'>
);

export type LoginMutationVariables = {
  input: LoginInput
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResult' }
    & Pick<LoginResult, 'token' | 'message'>
  ) }
);

export type RegisterMutationVariables = {
  input: RegisterInput
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResult' }
    & Pick<RegisterResult, 'token' | 'message'>
  ) }
);

export type CurrentRateQueryVariables = {};


export type CurrentRateQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'currentRate'>
);

export type FeaturedQueryVariables = {};


export type FeaturedQuery = (
  { __typename?: 'Query' }
  & { featuredProperties: Array<Maybe<(
    { __typename?: 'Property' }
    & Pick<Property, 'id' | 'title' | 'city' | 'state' | 'costValue' | 'costType' | 'images' | 'description'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ) }
  )>> }
);

export type PropertiesQueryVariables = {
  type: CostType
};


export type PropertiesQuery = (
  { __typename?: 'Query' }
  & { properties: Array<Maybe<(
    { __typename?: 'Property' }
    & Pick<Property, 'id' | 'title' | 'city' | 'state' | 'costValue' | 'costType' | 'images' | 'description'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ) }
  )>> }
);

export type PropertyQueryVariables = {
  id: Scalars['ID']
};


export type PropertyQuery = (
  { __typename?: 'Query' }
  & { property: Maybe<(
    { __typename?: 'Property' }
    & Pick<Property, 'id' | 'title' | 'city' | 'state' | 'costValue' | 'costType' | 'images' | 'description'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ) }
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'phone' | 'name' | 'type'>
  )> }
);

export type DashboardQueryVariables = {};


export type DashboardQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'phone' | 'name' | 'type'>
    & { properties: Array<(
      { __typename?: 'Property' }
      & Pick<Property, 'id' | 'title' | 'city' | 'state' | 'costValue' | 'costType' | 'images'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'name'>
      ) }
    )>, point: Maybe<(
      { __typename?: 'UserPoint' }
      & Pick<UserPoint, 'totalProfit' | 'totalPoints'>
      & { propertyPoints: Array<(
        { __typename?: 'PropertyPoint' }
        & Pick<PropertyPoint, 'propertyId' | 'propertyTitle' | 'points' | 'profit'>
      )> }
    )> }
  )> }
);


export const ContactAgentDocument = gql`
    mutation contactAgent($input: ContactAgentInput!) {
  contactAgent(input: $input)
}
    `;
export const AddPropertyDocument = gql`
    mutation addProperty($input: CreatePropertyInput!) {
  createProperty(input: $input)
}
    `;
export const DeletePropertyDocument = gql`
    mutation deleteProperty($id: ID!) {
  deleteProperty(id: $id)
}
    `;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    token
    message
  }
}
    `;
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    token
    message
  }
}
    `;
export const CurrentRateDocument = gql`
    query currentRate {
  currentRate
}
    `;
export const FeaturedDocument = gql`
    query featured {
  featuredProperties {
    id
    title
    city
    state
    costValue
    costType
    images
    description
    owner {
      name
    }
  }
}
    `;
export const PropertiesDocument = gql`
    query properties($type: CostType!) {
  properties(type: $type) {
    id
    title
    city
    state
    costValue
    costType
    images
    description
    owner {
      name
    }
  }
}
    `;
export const PropertyDocument = gql`
    query property($id: ID!) {
  property(id: $id) {
    id
    title
    city
    state
    costValue
    costType
    images
    description
    owner {
      name
    }
  }
}
    `;
export const MeDocument = gql`
    query me {
  me {
    id
    email
    phone
    name
    type
  }
}
    `;
export const DashboardDocument = gql`
    query dashboard {
  me {
    id
    email
    phone
    name
    type
    properties {
      id
      title
      city
      state
      costValue
      costType
      images
      owner {
        name
      }
    }
    point {
      propertyPoints {
        propertyId
        propertyTitle
        points
        profit
      }
      totalProfit
      totalPoints
    }
  }
}
    `;
export function getSdk(client: GraphQLClient) {
  return {
    contactAgent(variables: ContactAgentMutationVariables): Promise<ContactAgentMutation> {
      return client.request<ContactAgentMutation>(print(ContactAgentDocument), variables);
    },
    addProperty(variables: AddPropertyMutationVariables): Promise<AddPropertyMutation> {
      return client.request<AddPropertyMutation>(print(AddPropertyDocument), variables);
    },
    deleteProperty(variables: DeletePropertyMutationVariables): Promise<DeletePropertyMutation> {
      return client.request<DeletePropertyMutation>(print(DeletePropertyDocument), variables);
    },
    login(variables: LoginMutationVariables): Promise<LoginMutation> {
      return client.request<LoginMutation>(print(LoginDocument), variables);
    },
    register(variables: RegisterMutationVariables): Promise<RegisterMutation> {
      return client.request<RegisterMutation>(print(RegisterDocument), variables);
    },
    currentRate(variables?: CurrentRateQueryVariables): Promise<CurrentRateQuery> {
      return client.request<CurrentRateQuery>(print(CurrentRateDocument), variables);
    },
    featured(variables?: FeaturedQueryVariables): Promise<FeaturedQuery> {
      return client.request<FeaturedQuery>(print(FeaturedDocument), variables);
    },
    properties(variables: PropertiesQueryVariables): Promise<PropertiesQuery> {
      return client.request<PropertiesQuery>(print(PropertiesDocument), variables);
    },
    property(variables: PropertyQueryVariables): Promise<PropertyQuery> {
      return client.request<PropertyQuery>(print(PropertyDocument), variables);
    },
    me(variables?: MeQueryVariables): Promise<MeQuery> {
      return client.request<MeQuery>(print(MeDocument), variables);
    },
    dashboard(variables?: DashboardQueryVariables): Promise<DashboardQuery> {
      return client.request<DashboardQuery>(print(DashboardDocument), variables);
    }
  };
}