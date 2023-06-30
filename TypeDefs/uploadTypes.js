const {gql} = require("apollo-server-express");

module.exports = gql`
    type SingleFile {
        _id: ID
        title: String
        author: String
        description: String
        release_year: Int
        genre: String
        image: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        greetings: String
        hello: String
        getSingleUploads: [SingleFile]
    }

    type Mutation {
        singleUpload(file: Upload!, title: String!, author: String!, description: String!, release_year: Int!, genre: String!): SuccessMessage
        singleUploadEdit(id: ID!, file: Upload, title: String, author: String, description: String, release_year: Int, genre: String): SingleFile
        deleteSingleUpload(id: ID!): SuccessMessage
        multipleUpload(file: [Upload]!): SuccessMessage
    }

    type SuccessMessage {
        message: String
    }
`;