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
  /** 
 * The `Long` scalar type
   *  represents non-fractional signed whole numeric values.
   * Long can represent values between -(2^63) and 2^63 - 1.
 */
  Long: any,
  Date: any,
  Time: any,
};







export type Contact = {
   __typename?: 'Contact',
  number: Scalars['String'],
  name: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  /** The document's ID. */
  _id: Scalars['ID'],
  to: User,
  id: Scalars['ID'],
  property: Property,
  notes?: Maybe<Scalars['String']>,
  /** The document's timestamp. */
  _ts: Scalars['Long'],
};

/** 'Contact' input values */
export type ContactInput = {
  id: Scalars['ID'],
  name: Scalars['String'],
  number: Scalars['String'],
  property?: Maybe<ContactPropertyRelation>,
  email?: Maybe<Scalars['String']>,
  notes?: Maybe<Scalars['String']>,
  to?: Maybe<ContactToRelation>,
};

/** The pagination object for elements of type 'Contact'. */
export type ContactPage = {
   __typename?: 'ContactPage',
  /** The elements of type 'Contact' in this page. */
  data: Array<Maybe<Contact>>,
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>,
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>,
};

/** Allow manipulating the relationship between the types 'Contact' and 'Property' using the field 'Contact.property'. */
export type ContactPropertyRelation = {
  /** Create a document of type 'Property' and associate it with the current document. */
  create?: Maybe<PropertyInput>,
  /** Connect a document of type 'Property' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>,
};

/** Allow manipulating the relationship between the types 'Contact' and 'User' using the field 'Contact.to'. */
export type ContactToRelation = {
  /** Create a document of type 'User' and associate it with the current document. */
  create?: Maybe<UserInput>,
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>,
};

export enum CostType {
  Rent = 'Rent',
  Sale = 'Sale'
}



export type Mutation = {
   __typename?: 'Mutation',
  /** Update an existing document in the collection of 'User' */
  updateUser?: Maybe<User>,
  /** Create a new document in the collection of 'User' */
  createUser: User,
  /** Create a new document in the collection of 'Contact' */
  createContact: Contact,
  /** Update an existing document in the collection of 'Property' */
  updateProperty?: Maybe<Property>,
  /** Delete an existing document in the collection of 'Property' */
  deleteProperty?: Maybe<Property>,
  /** Update an existing document in the collection of 'Contact' */
  updateContact?: Maybe<Contact>,
  /** Create a new document in the collection of 'Property' */
  createProperty: Property,
  /** Delete an existing document in the collection of 'Contact' */
  deleteContact?: Maybe<Contact>,
  /** Delete an existing document in the collection of 'User' */
  deleteUser?: Maybe<User>,
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'],
  data: UserInput
};


export type MutationCreateUserArgs = {
  data: UserInput
};


export type MutationCreateContactArgs = {
  data: ContactInput
};


export type MutationUpdatePropertyArgs = {
  id: Scalars['ID'],
  data: PropertyInput
};


export type MutationDeletePropertyArgs = {
  id: Scalars['ID']
};


export type MutationUpdateContactArgs = {
  id: Scalars['ID'],
  data: ContactInput
};


export type MutationCreatePropertyArgs = {
  data: PropertyInput
};


export type MutationDeleteContactArgs = {
  id: Scalars['ID']
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']
};

export type Property = {
   __typename?: 'Property',
  city: Scalars['String'],
  state: Scalars['String'],
  description: Scalars['String'],
  costType: CostType,
  /** The document's ID. */
  _id: Scalars['ID'],
  costValue: Scalars['Int'],
  id: Scalars['ID'],
  owner: User,
  title: Scalars['String'],
  images: Array<Scalars['String']>,
  /** The document's timestamp. */
  _ts: Scalars['Long'],
};

/** 'Property' input values */
export type PropertyInput = {
  id: Scalars['ID'],
  title: Scalars['String'],
  city: Scalars['String'],
  state: Scalars['String'],
  costValue: Scalars['Int'],
  costType: CostType,
  owner?: Maybe<PropertyOwnerRelation>,
  images: Array<Scalars['String']>,
  description: Scalars['String'],
};

/** Allow manipulating the relationship between the types 'Property' and 'User' using the field 'Property.owner'. */
export type PropertyOwnerRelation = {
  /** Create a document of type 'User' and associate it with the current document. */
  create?: Maybe<UserInput>,
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>,
};

/** The pagination object for elements of type 'Property'. */
export type PropertyPage = {
   __typename?: 'PropertyPage',
  /** The elements of type 'Property' in this page. */
  data: Array<Maybe<Property>>,
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>,
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  /** Find a document from the collection of 'Contact' by its id. */
  findContactByID?: Maybe<Contact>,
  /** Find a document from the collection of 'User' by its id. */
  findUserByID?: Maybe<User>,
  /** Find a document from the collection of 'Property' by its id. */
  findPropertyByID?: Maybe<Property>,
  findPropertiesByCostType: PropertyPage,
};


export type QueryFindContactByIdArgs = {
  id: Scalars['ID']
};


export type QueryFindUserByIdArgs = {
  id: Scalars['ID']
};


export type QueryFindPropertyByIdArgs = {
  id: Scalars['ID']
};


export type QueryFindPropertiesByCostTypeArgs = {
  _size?: Maybe<Scalars['Int']>,
  _cursor?: Maybe<Scalars['String']>,
  costType: CostType
};


export type User = {
   __typename?: 'User',
  name: Scalars['String'],
  email: Scalars['String'],
  /** The document's ID. */
  _id: Scalars['ID'],
  tin?: Maybe<Scalars['String']>,
  contacts: ContactPage,
  id: Scalars['ID'],
  properties: PropertyPage,
  cac?: Maybe<Scalars['String']>,
  type: UserType,
  phone: Scalars['String'],
  password: Scalars['String'],
  /** The document's timestamp. */
  _ts: Scalars['Long'],
};


export type UserContactsArgs = {
  _size?: Maybe<Scalars['Int']>,
  _cursor?: Maybe<Scalars['String']>
};


export type UserPropertiesArgs = {
  _size?: Maybe<Scalars['Int']>,
  _cursor?: Maybe<Scalars['String']>
};

/** Allow manipulating the relationship between the types 'User' and 'Contact'. */
export type UserContactsRelation = {
  /** Create one or more documents of type 'Contact' and associate them with the current document. */
  create?: Maybe<Array<Maybe<ContactInput>>>,
  /** Connect one or more documents of type 'Contact' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>,
  /** Disconnect the given documents of type 'Contact' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

/** 'User' input values */
export type UserInput = {
  id: Scalars['ID'],
  email: Scalars['String'],
  phone: Scalars['String'],
  name: Scalars['String'],
  password: Scalars['String'],
  properties?: Maybe<UserPropertiesRelation>,
  type: UserType,
  cac?: Maybe<Scalars['String']>,
  tin?: Maybe<Scalars['String']>,
  contacts?: Maybe<UserContactsRelation>,
};

/** Allow manipulating the relationship between the types 'User' and 'Property'. */
export type UserPropertiesRelation = {
  /** Create one or more documents of type 'Property' and associate them with the current document. */
  create?: Maybe<Array<Maybe<PropertyInput>>>,
  /** Connect one or more documents of type 'Property' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>,
  /** Disconnect the given documents of type 'Property' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export enum UserType {
  Agency = 'Agency',
  Individual = 'Individual'
}

export type PropertiesQueryVariables = {
  costType: CostType
};


export type PropertiesQuery = (
  { __typename?: 'Query' }
  & { findPropertiesByCostType: (
    { __typename?: 'PropertyPage' }
    & { data: Array<Maybe<(
      { __typename?: 'Property' }
      & Pick<Property, 'city' | 'state' | 'description' | 'costType' | 'costValue' | 'id' | 'images' | 'title'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'name' | 'id'>
      ) }
    )>> }
  ) }
);


export const PropertiesDocument = gql`
    query properties($costType: CostType!) {
  findPropertiesByCostType(costType: $costType, _size: 100) {
    data {
      city
      state
      description
      costType
      costValue
      id
      owner {
        name
        id
      }
      images
      title
    }
  }
}
    `;
export function getSdk(client: GraphQLClient) {
  return {
    properties(variables: PropertiesQueryVariables): Promise<PropertiesQuery> {
      return client.request<PropertiesQuery>(print(PropertiesDocument), variables);
    }
  };
}