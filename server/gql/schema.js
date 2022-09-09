const { gql } = require('apollo-server');

const typeDefs= gql`
    type User{
        id:ID
        name:String
        username: String
        email:String
        siteWeb:String
        description:String
        password:String
        avatar:String
        createAt:String
    }
    type Token{
        token: String
    }
    type UpdateAvatar{
        status: Boolean
        urlAvatar:String
    }
    type Publish{
        status: Boolean
        urlFile: String
    }
    type Publication{
        id: ID
        idUser: ID
        file: String
        typeFile:String
        createAt:String
    }
    
    input UserInput{
        # el uso de "!" significa que es obligatorio
        name:String!
        username: String!
        email: String!
        password:String!
    }
    input LoginInput{
       email:String!
       password: String! 
    }
    input UserUpdateInput{
        name:String
        email:String
        currentPassword:String
        newPassword:String
        siteWeb:String
        description:String
    }

    type Query{
        # User
        getUser(id: ID, username : String): User
        search(search: String) : [User]
        #Follow
        isFollow(username:String!) : Boolean
        getFollowers(username:String!) : [User]
        getFolloweds(username:String!) :[User]
        #Publication
        getPublications(username:String!) : [Publication]
    }

    type Mutation{
        #User
        register(input: UserInput): User
        login(input: LoginInput) : Token
        updateAvatar(file:Upload) : UpdateAvatar
        deleteAvatar: Boolean
        updateUser(input: UserUpdateInput) : Boolean
        
        #Follow
        follow(username:String!) : Boolean
        unFollow(username:String!) : Boolean

        ##Publication
        publish(file: Upload) : Publish
    }

`;

module.exports= typeDefs;