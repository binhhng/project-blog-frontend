import gql from 'graphql-tag'

const LOGIN = gql`
  mutation login($input: LoginRequest){
    login(input: $input){
      token
    }
  }
`

export {
  LOGIN
}