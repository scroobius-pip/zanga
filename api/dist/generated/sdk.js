"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
var CostType;
(function (CostType) {
    CostType["Rent"] = "Rent";
    CostType["Sale"] = "Sale";
})(CostType = exports.CostType || (exports.CostType = {}));
var UserType;
(function (UserType) {
    UserType["Agency"] = "Agency";
    UserType["Individual"] = "Individual";
})(UserType = exports.UserType || (exports.UserType = {}));
exports.CreateContactDocument = graphql_tag_1.default `
    mutation createContact($contact: ContactInput!) {
  createContact(data: $contact) {
    id: _id
  }
}
    `;
exports.CreatePropertyDocument = graphql_tag_1.default `
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
exports.CreateUserDocument = graphql_tag_1.default `
    mutation createUser($user: UserInput!) {
  createUser(data: $user) {
    email
    id: _id
  }
}
    `;
exports.DeletePropertyDocument = graphql_tag_1.default `
    mutation deleteProperty($id: ID!) {
  deleteProperty(id: $id) {
    id: _id
  }
}
    `;
exports.PropertiesDocument = graphql_tag_1.default `
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
exports.PropertyDocument = graphql_tag_1.default `
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
  }
}
    `;
exports.UserByEmailDocument = graphql_tag_1.default `
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
      }
    }
    email
  }
}
    `;
exports.UserDocument = graphql_tag_1.default `
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
      }
    }
    email
  }
}
    `;
function getSdk(client) {
    return {
        createContact(variables) {
            return client.request(graphql_1.print(exports.CreateContactDocument), variables);
        },
        createProperty(variables) {
            return client.request(graphql_1.print(exports.CreatePropertyDocument), variables);
        },
        createUser(variables) {
            return client.request(graphql_1.print(exports.CreateUserDocument), variables);
        },
        deleteProperty(variables) {
            return client.request(graphql_1.print(exports.DeletePropertyDocument), variables);
        },
        properties(variables) {
            return client.request(graphql_1.print(exports.PropertiesDocument), variables);
        },
        property(variables) {
            return client.request(graphql_1.print(exports.PropertyDocument), variables);
        },
        userByEmail(variables) {
            return client.request(graphql_1.print(exports.UserByEmailDocument), variables);
        },
        user(variables) {
            return client.request(graphql_1.print(exports.UserDocument), variables);
        }
    };
}
exports.getSdk = getSdk;
//# sourceMappingURL=sdk.js.map