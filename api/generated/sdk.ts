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
  property: Property,
  notes?: Maybe<Scalars['String']>,
  /** The document's timestamp. */
  _ts: Scalars['Long'],
};

/** 'Contact' input values */
export type ContactInput = {
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
  /** Create a new document in the collection of 'PropertyPoint' */
  createPropertyPoint: PropertyPoint,
  /** Create a new document in the collection of 'User' */
  createUser: User,
  /** Create a new document in the collection of 'Contact' */
  createContact: Contact,
  incrementPropertyPoint: PropertyPoint,
  /** Update an existing document in the collection of 'Property' */
  updateProperty?: Maybe<Property>,
  /** Delete an existing document in the collection of 'Property' */
  deleteProperty?: Maybe<Property>,
  /** 
 * Partially updates an existing document in the collection of 'Contact'. It only
   * modifies the values that are specified in the arguments. During execution, it
   * verifies that required fields are not set to 'null'.
 */
  partialUpdateContact?: Maybe<Contact>,
  /** Update an existing document in the collection of 'Contact' */
  updateContact?: Maybe<Contact>,
  /** 
 * Partially updates an existing document in the collection of 'PropertyPoint'.
   * It only modifies the values that are specified in the arguments. During
   * execution, it verifies that required fields are not set to 'null'.
 */
  partialUpdatePropertyPoint?: Maybe<PropertyPoint>,
  /** Update an existing document in the collection of 'PropertyPoint' */
  updatePropertyPoint?: Maybe<PropertyPoint>,
  /** Create a new document in the collection of 'Property' */
  createProperty: Property,
  /** Delete an existing document in the collection of 'Contact' */
  deleteContact?: Maybe<Contact>,
  /** 
 * Partially updates an existing document in the collection of 'Property'. It
   * only modifies the values that are specified in the arguments. During
   * execution, it verifies that required fields are not set to 'null'.
 */
  partialUpdateProperty?: Maybe<Property>,
  /** Delete an existing document in the collection of 'User' */
  deleteUser?: Maybe<User>,
  /** Delete an existing document in the collection of 'PropertyPoint' */
  deletePropertyPoint?: Maybe<PropertyPoint>,
  /** 
 * Partially updates an existing document in the collection of 'User'. It only
   * modifies the values that are specified in the arguments. During execution, it
   * verifies that required fields are not set to 'null'.
 */
  partialUpdateUser?: Maybe<User>,
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'],
  data: UserInput
};


export type MutationCreatePropertyPointArgs = {
  data: PropertyPointInput
};


export type MutationCreateUserArgs = {
  data: UserInput
};


export type MutationCreateContactArgs = {
  data: ContactInput
};


export type MutationIncrementPropertyPointArgs = {
  pointNo: Scalars['Int'],
  propertyPointId: Scalars['ID'],
  rate: Scalars['Float']
};


export type MutationUpdatePropertyArgs = {
  id: Scalars['ID'],
  data: PropertyInput
};


export type MutationDeletePropertyArgs = {
  id: Scalars['ID']
};


export type MutationPartialUpdateContactArgs = {
  id: Scalars['ID'],
  data: PartialUpdateContactInput
};


export type MutationUpdateContactArgs = {
  id: Scalars['ID'],
  data: ContactInput
};


export type MutationPartialUpdatePropertyPointArgs = {
  id: Scalars['ID'],
  data: PartialUpdatePropertyPointInput
};


export type MutationUpdatePropertyPointArgs = {
  id: Scalars['ID'],
  data: PropertyPointInput
};


export type MutationCreatePropertyArgs = {
  data: PropertyInput
};


export type MutationDeleteContactArgs = {
  id: Scalars['ID']
};


export type MutationPartialUpdatePropertyArgs = {
  id: Scalars['ID'],
  data: PartialUpdatePropertyInput
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']
};


export type MutationDeletePropertyPointArgs = {
  id: Scalars['ID']
};


export type MutationPartialUpdateUserArgs = {
  id: Scalars['ID'],
  data: PartialUpdateUserInput
};

/** 'Contact' input values */
export type PartialUpdateContactInput = {
  name?: Maybe<Scalars['String']>,
  number?: Maybe<Scalars['String']>,
  property?: Maybe<ContactPropertyRelation>,
  email?: Maybe<Scalars['String']>,
  notes?: Maybe<Scalars['String']>,
  to?: Maybe<ContactToRelation>,
};

/** 'Property' input values */
export type PartialUpdatePropertyInput = {
  pointCount?: Maybe<Scalars['Int']>,
  title?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  costValue?: Maybe<Scalars['Int']>,
  costType?: Maybe<CostType>,
  owner?: Maybe<PropertyOwnerRelation>,
  images?: Maybe<Array<Scalars['String']>>,
  description?: Maybe<Scalars['String']>,
};

/** 'PropertyPoint' input values */
export type PartialUpdatePropertyPointInput = {
  user?: Maybe<PropertyPointUserRelation>,
  userId?: Maybe<Scalars['ID']>,
  profit?: Maybe<Scalars['Float']>,
  impressions?: Maybe<Scalars['Int']>,
  propertyTitle?: Maybe<Scalars['String']>,
  propertyId?: Maybe<Scalars['ID']>,
};

/** 'User' input values */
export type PartialUpdateUserInput = {
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  properties?: Maybe<UserPropertiesRelation>,
  type?: Maybe<UserType>,
  cac?: Maybe<Scalars['String']>,
  tin?: Maybe<Scalars['String']>,
  contacts?: Maybe<UserContactsRelation>,
  propertyPoints?: Maybe<UserPropertyPointsRelation>,
};

export type Property = {
   __typename?: 'Property',
  city: Scalars['String'],
  state: Scalars['String'],
  pointCount: Scalars['Int'],
  description: Scalars['String'],
  costType: CostType,
  /** The document's ID. */
  _id: Scalars['ID'],
  costValue: Scalars['Int'],
  owner: User,
  title: Scalars['String'],
  images: Array<Scalars['String']>,
  /** The document's timestamp. */
  _ts: Scalars['Long'],
};

/** 'Property' input values */
export type PropertyInput = {
  pointCount: Scalars['Int'],
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

export type PropertyPoint = {
   __typename?: 'PropertyPoint',
  impressions: Scalars['Int'],
  propertyTitle: Scalars['String'],
  profit: Scalars['Float'],
  /** The document's ID. */
  _id: Scalars['ID'],
  propertyId: Scalars['ID'],
  userId: Scalars['ID'],
  user: User,
  /** The document's timestamp. */
  _ts: Scalars['Long'],
};

/** 'PropertyPoint' input values */
export type PropertyPointInput = {
  user?: Maybe<PropertyPointUserRelation>,
  userId: Scalars['ID'],
  profit: Scalars['Float'],
  impressions: Scalars['Int'],
  propertyTitle: Scalars['String'],
  propertyId: Scalars['ID'],
};

/** The pagination object for elements of type 'PropertyPoint'. */
export type PropertyPointPage = {
   __typename?: 'PropertyPointPage',
  /** The elements of type 'PropertyPoint' in this page. */
  data: Array<Maybe<PropertyPoint>>,
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>,
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>,
};

/** Allow manipulating the relationship between the types 'PropertyPoint' and 'User' using the field 'PropertyPoint.user'. */
export type PropertyPointUserRelation = {
  /** Create a document of type 'User' and associate it with the current document. */
  create?: Maybe<UserInput>,
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>,
};

export type Query = {
   __typename?: 'Query',
  /** Find a document from the collection of 'Property' by its id. */
  findPropertyByID?: Maybe<Property>,
  findPropertyPointByPropertyId?: Maybe<PropertyPoint>,
  findUserByEmail?: Maybe<User>,
  findPropertyPointByPropertyIdAndUserId?: Maybe<PropertyPoint>,
  /** Find a document from the collection of 'User' by its id. */
  findUserByID?: Maybe<User>,
  /** Find a document from the collection of 'PropertyPoint' by its id. */
  findPropertyPointByID?: Maybe<PropertyPoint>,
  /** Find a document from the collection of 'Contact' by its id. */
  findContactByID?: Maybe<Contact>,
  findPropertiesByCostType: PropertyPage,
};


export type QueryFindPropertyByIdArgs = {
  id: Scalars['ID']
};


export type QueryFindPropertyPointByPropertyIdArgs = {
  propertyId: Scalars['ID']
};


export type QueryFindUserByEmailArgs = {
  email: Scalars['String']
};


export type QueryFindPropertyPointByPropertyIdAndUserIdArgs = {
  propertyId: Scalars['ID'],
  userId: Scalars['ID']
};


export type QueryFindUserByIdArgs = {
  id: Scalars['ID']
};


export type QueryFindPropertyPointByIdArgs = {
  id: Scalars['ID']
};


export type QueryFindContactByIdArgs = {
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
  properties: PropertyPage,
  cac?: Maybe<Scalars['String']>,
  type: UserType,
  propertyPoints: PropertyPointPage,
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


export type UserPropertyPointsArgs = {
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
  email: Scalars['String'],
  phone: Scalars['String'],
  name: Scalars['String'],
  password: Scalars['String'],
  properties?: Maybe<UserPropertiesRelation>,
  type: UserType,
  cac?: Maybe<Scalars['String']>,
  tin?: Maybe<Scalars['String']>,
  contacts?: Maybe<UserContactsRelation>,
  propertyPoints?: Maybe<UserPropertyPointsRelation>,
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

/** Allow manipulating the relationship between the types 'User' and 'PropertyPoint'. */
export type UserPropertyPointsRelation = {
  /** Create one or more documents of type 'PropertyPoint' and associate them with the current document. */
  create?: Maybe<Array<Maybe<PropertyPointInput>>>,
  /** Connect one or more documents of type 'PropertyPoint' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>,
  /** Disconnect the given documents of type 'PropertyPoint' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export enum UserType {
  Agency = 'Agency',
  Individual = 'Individual'
}

export type CreateContactMutationVariables = {
  contact: ContactInput
};


export type CreateContactMutation = (
  { __typename?: 'Mutation' }
  & { createContact: (
    { __typename?: 'Contact' }
    & { id: Contact['_id'] }
  ) }
);

export type CreatePropertyMutationVariables = {
  property: PropertyInput
};


export type CreatePropertyMutation = (
  { __typename?: 'Mutation' }
  & { createProperty: (
    { __typename?: 'Property' }
    & Pick<Property, 'city' | 'state' | 'costType' | 'costValue' | 'description' | 'images' | 'title'>
    & { id: Property['_id'] }
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ) }
  ) }
);

export type CreatePropertyPointMutationVariables = {
  data: PropertyPointInput
};


export type CreatePropertyPointMutation = (
  { __typename?: 'Mutation' }
  & { createPropertyPoint: (
    { __typename?: 'PropertyPoint' }
    & { id: PropertyPoint['_id'] }
  ) }
);

export type CreateUserMutationVariables = {
  user: UserInput
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'email'>
    & { id: User['_id'] }
  ) }
);

export type DeletePropertyMutationVariables = {
  id: Scalars['ID']
};


export type DeletePropertyMutation = (
  { __typename?: 'Mutation' }
  & { deleteProperty: Maybe<(
    { __typename?: 'Property' }
    & { id: Property['_id'] }
  )> }
);

export type IncrementPropertyPointMutationVariables = {
  pointNo: Scalars['Int'],
  propertyPointId: Scalars['ID'],
  rate: Scalars['Float']
};


export type IncrementPropertyPointMutation = (
  { __typename?: 'Mutation' }
  & { incrementPropertyPoint: (
    { __typename?: 'PropertyPoint' }
    & Pick<PropertyPoint, 'impressions' | 'profit' | 'propertyTitle'>
    & { id: PropertyPoint['_id'] }
  ) }
);

export type PropertiesQueryVariables = {
  costType: CostType
};


export type PropertiesQuery = (
  { __typename?: 'Query' }
  & { findPropertiesByCostType: (
    { __typename?: 'PropertyPage' }
    & { data: Array<Maybe<(
      { __typename?: 'Property' }
      & Pick<Property, 'city' | 'state' | 'description' | 'costType' | 'costValue' | 'images' | 'title'>
      & { id: Property['_id'] }
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'name'>
        & { id: User['_id'] }
      ) }
    )>> }
  ) }
);

export type PropertyQueryVariables = {
  id: Scalars['ID']
};


export type PropertyQuery = (
  { __typename?: 'Query' }
  & { findPropertyByID: Maybe<(
    { __typename?: 'Property' }
    & Pick<Property, 'city' | 'state' | 'costType' | 'costValue' | 'title' | 'images' | 'description' | 'pointCount'>
    & { id: Property['_id'] }
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
      & { id: User['_id'] }
    ) }
  )> }
);

export type PropertyPointQueryVariables = {
  propertyId: Scalars['ID'],
  userId: Scalars['ID']
};


export type PropertyPointQuery = (
  { __typename?: 'Query' }
  & { findPropertyPointByPropertyIdAndUserId: Maybe<(
    { __typename?: 'PropertyPoint' }
    & Pick<PropertyPoint, 'profit'>
    & { id: PropertyPoint['_id'] }
  )> }
);

export type UserByEmailQueryVariables = {
  email: Scalars['String']
};


export type UserByEmailQuery = (
  { __typename?: 'Query' }
  & { findUserByEmail: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'password' | 'name' | 'type' | 'phone' | 'email'>
    & { id: User['_id'] }
    & { properties: (
      { __typename?: 'PropertyPage' }
      & { data: Array<Maybe<(
        { __typename?: 'Property' }
        & Pick<Property, 'city' | 'state' | 'description' | 'costType' | 'costValue' | 'title' | 'images'>
        & { id: Property['_id'] }
        & { owner: (
          { __typename?: 'User' }
          & Pick<User, 'name'>
          & { id: User['_id'] }
        ) }
      )>> }
    ), propertyPoints: (
      { __typename?: 'PropertyPointPage' }
      & { data: Array<Maybe<(
        { __typename?: 'PropertyPoint' }
        & Pick<PropertyPoint, 'impressions' | 'profit' | 'propertyTitle' | 'propertyId'>
        & { id: PropertyPoint['_id'] }
      )>> }
    ) }
  )> }
);

export type UserQueryVariables = {
  id: Scalars['ID']
};


export type UserQuery = (
  { __typename?: 'Query' }
  & { findUserByID: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'type' | 'phone' | 'email'>
    & { id: User['_id'] }
    & { properties: (
      { __typename?: 'PropertyPage' }
      & { data: Array<Maybe<(
        { __typename?: 'Property' }
        & Pick<Property, 'city' | 'state' | 'description' | 'costType' | 'costValue' | 'title' | 'images'>
        & { id: Property['_id'] }
        & { owner: (
          { __typename?: 'User' }
          & Pick<User, 'name'>
          & { id: User['_id'] }
        ) }
      )>> }
    ), propertyPoints: (
      { __typename?: 'PropertyPointPage' }
      & { data: Array<Maybe<(
        { __typename?: 'PropertyPoint' }
        & Pick<PropertyPoint, 'impressions' | 'profit' | 'propertyTitle' | 'propertyId'>
        & { id: PropertyPoint['_id'] }
      )>> }
    ) }
  )> }
);


export const CreateContactDocument = gql`
    mutation createContact($contact: ContactInput!) {
  createContact(data: $contact) {
    id: _id
  }
}
    `;
export const CreatePropertyDocument = gql`
    mutation createProperty($property: PropertyInput!) {
  createProperty(data: $property) {
    city
    state
    costType
    costValue
    description
    images
    title
    owner {
      name
    }
    id: _id
  }
}
    `;
export const CreatePropertyPointDocument = gql`
    mutation createPropertyPoint($data: PropertyPointInput!) {
  createPropertyPoint(data: $data) {
    id: _id
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($user: UserInput!) {
  createUser(data: $user) {
    email
    id: _id
  }
}
    `;
export const DeletePropertyDocument = gql`
    mutation deleteProperty($id: ID!) {
  deleteProperty(id: $id) {
    id: _id
  }
}
    `;
export const IncrementPropertyPointDocument = gql`
    mutation incrementPropertyPoint($pointNo: Int!, $propertyPointId: ID!, $rate: Float!) {
  incrementPropertyPoint(pointNo: $pointNo, propertyPointId: $propertyPointId, rate: $rate) {
    impressions
    profit
    propertyTitle
    id: _id
  }
}
    `;
export const PropertiesDocument = gql`
    query properties($costType: CostType!) {
  findPropertiesByCostType(costType: $costType, _size: 100) {
    data {
      city
      state
      description
      costType
      costValue
      id: _id
      owner {
        name
        id: _id
      }
      images
      title
    }
  }
}
    `;
export const PropertyDocument = gql`
    query property($id: ID!) {
  findPropertyByID(id: $id) {
    city
    id: _id
    state
    costType
    costValue
    owner {
      id: _id
      name
    }
    title
    images
    description
    pointCount
  }
}
    `;
export const PropertyPointDocument = gql`
    query propertyPoint($propertyId: ID!, $userId: ID!) {
  findPropertyPointByPropertyIdAndUserId(propertyId: $propertyId, userId: $userId) {
    id: _id
    profit
  }
}
    `;
export const UserByEmailDocument = gql`
    query userByEmail($email: String!) {
  findUserByEmail(email: $email) {
    id: _id
    password
    name
    type
    phone
    properties {
      data {
        city
        state
        description
        costType
        costValue
        id: _id
        title
        images
        owner {
          name
          id: _id
        }
      }
    }
    email
    propertyPoints {
      data {
        impressions
        profit
        propertyTitle
        propertyId
        id: _id
      }
    }
  }
}
    `;
export const UserDocument = gql`
    query user($id: ID!) {
  findUserByID(id: $id) {
    id: _id
    name
    type
    phone
    properties {
      data {
        city
        state
        description
        costType
        costValue
        id: _id
        title
        images
        owner {
          name
          id: _id
        }
      }
    }
    email
    propertyPoints {
      data {
        impressions
        profit
        propertyTitle
        propertyId
        id: _id
      }
    }
  }
}
    `;
export function getSdk(client: GraphQLClient) {
  return {
    createContact(variables: CreateContactMutationVariables): Promise<CreateContactMutation> {
      return client.request<CreateContactMutation>(print(CreateContactDocument), variables);
    },
    createProperty(variables: CreatePropertyMutationVariables): Promise<CreatePropertyMutation> {
      return client.request<CreatePropertyMutation>(print(CreatePropertyDocument), variables);
    },
    createPropertyPoint(variables: CreatePropertyPointMutationVariables): Promise<CreatePropertyPointMutation> {
      return client.request<CreatePropertyPointMutation>(print(CreatePropertyPointDocument), variables);
    },
    createUser(variables: CreateUserMutationVariables): Promise<CreateUserMutation> {
      return client.request<CreateUserMutation>(print(CreateUserDocument), variables);
    },
    deleteProperty(variables: DeletePropertyMutationVariables): Promise<DeletePropertyMutation> {
      return client.request<DeletePropertyMutation>(print(DeletePropertyDocument), variables);
    },
    incrementPropertyPoint(variables: IncrementPropertyPointMutationVariables): Promise<IncrementPropertyPointMutation> {
      return client.request<IncrementPropertyPointMutation>(print(IncrementPropertyPointDocument), variables);
    },
    properties(variables: PropertiesQueryVariables): Promise<PropertiesQuery> {
      return client.request<PropertiesQuery>(print(PropertiesDocument), variables);
    },
    property(variables: PropertyQueryVariables): Promise<PropertyQuery> {
      return client.request<PropertyQuery>(print(PropertyDocument), variables);
    },
    propertyPoint(variables: PropertyPointQueryVariables): Promise<PropertyPointQuery> {
      return client.request<PropertyPointQuery>(print(PropertyPointDocument), variables);
    },
    userByEmail(variables: UserByEmailQueryVariables): Promise<UserByEmailQuery> {
      return client.request<UserByEmailQuery>(print(UserByEmailDocument), variables);
    },
    user(variables: UserQueryVariables): Promise<UserQuery> {
      return client.request<UserQuery>(print(UserDocument), variables);
    }
  };
}