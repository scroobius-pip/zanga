"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = `type Query {
  me: User
  properties(type: CostType): [Property!]!
}

type Mutation {
  register(input: RegisterInput!): RegisterResult!
  login(input: LoginInput!): LoginResult!
  createProperty(input: CreatePropertyInput!): Property!
  deleteProperty(id: ID!): Boolean!
}

type Property {
  id: ID!
  title: String!
  location: Location!
  cost: Cost!
  owner: User!
  images: [String!]!
  description: String!
}

enum CostType {
  Rent
  Sale
}

type Location {
  city: String!
  state: String!
}

input LocationInput {
  city: String!
  state: String!
}

type Cost {
  value: Int!
  costType: CostType!
}

type User {
  id: ID!
  email: String
  phone: String!
  name: String!
  type: UserType!
  properties: [Property!]!
}

input RegisterInput {
  email: String!
  password: String!
  name: String!
  phone: String!
  type: UserType!
}

enum UserType {
  Agency
  Individual
}

type RegisterResult {
  token: String
  message: String!
}

type LoginResult {
  token: String
  message: String!
}

input LoginInput {
  email: String!
  password: String!
}

input CreatePropertyInput {
  title: String!
  location: LocationInput!
  costValue: Int!
  costType: CostType!
  images: [String!]!
  description: String!
}
`;
exports.default = data;
//# sourceMappingURL=schemaString.js.map