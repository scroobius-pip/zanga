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
  city: Scalars['String'],
  state: Scalars['String'],
  costValue: Scalars['Int'],
  costType: CostType,
  ownerId: Scalars['String'],
  ownerName: Scalars['String'],
  images: Array<Scalars['String']>,
  description: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  properties: Array<Property>,
  property?: Maybe<Property>,
};


export type QueryPropertiesArgs = {
  type?: Maybe<CostType>
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
  email?: Maybe<Scalars['String']>,
  phone: Scalars['String'],
  name: Scalars['String'],
  type: UserType,
  properties: Array<Property>,
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

export type PropertiesQueryVariables = {
  type?: Maybe<CostType>
};


export type PropertiesQuery = (
  { __typename?: 'Query' }
  & { properties: Array<(
    { __typename?: 'Property' }
    & Pick<Property, 'id' | 'title' | 'city' | 'state' | 'costValue' | 'costType' | 'images' | 'ownerName'>
  )> }
);

export type PropertyQueryVariables = {
  id: Scalars['ID']
};


export type PropertyQuery = (
  { __typename?: 'Query' }
  & { property: Maybe<(
    { __typename?: 'Property' }
    & Pick<Property, 'id' | 'title' | 'city' | 'state' | 'costValue' | 'costType' | 'images' | 'description' | 'ownerName'>
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
      & Pick<Property, 'id' | 'title' | 'city' | 'state' | 'costValue' | 'costType' | 'images' | 'ownerName'>
    )> }
  )> }
);


export const ContactAgentDocument = gql`
    mutation contactAgent($input: ContactAgentInput!) {
  contactAgent(input: $input)
}
    `;
export const PropertiesDocument = gql`
    query properties($type: CostType) {
  properties(type: $type) {
    id
    title
    city
    state
    costValue
    costType
    images
    ownerName
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
    ownerName
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
      ownerName
    }
  }
}
    `;
export function getSdk(client: GraphQLClient) {
  return {
    contactAgent(variables: ContactAgentMutationVariables): Promise<ContactAgentMutation> {
      return client.request<ContactAgentMutation>(print(ContactAgentDocument), variables);
    },
    properties(variables?: PropertiesQueryVariables): Promise<PropertiesQuery> {
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