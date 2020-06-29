import gql from 'graphql-tag'

const CREATE_NEW_USER = gql`
  mutation createUser($input: CreateUserInput){
    createUser(input: $input){
      _id
    }
  }
`

export {
  CREATE_NEW_USER
}