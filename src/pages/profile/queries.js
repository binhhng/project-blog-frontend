import gql from 'graphql-tag'

const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput){
    updateUser(input: $input){
      _id
    }
  }
`

export {
  UPDATE_USER
}