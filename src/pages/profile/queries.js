import gql from 'graphql-tag'

const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput){
    updateUser(input: $input){
      _id
    }
  }
`

const GET_PERSONAL_PROFILE = gql`
  query($username: String){
    getPersonalProfile(username: $username){
      creator{
        _id
        username
        fullName
        dayOfBirth
        avatar
        isOnline
      }
      posts{
        _id
        description
        thumbnails
        idLikes
        createdAt
      }
    }
  }
`

const TOGGLE_LIKE_POST = gql`
  mutation toggleLikePost ($idPost: String){
    toggleLikePost(idPost: $idPost)
  }
`

export {
  UPDATE_USER,
  GET_PERSONAL_PROFILE,
  TOGGLE_LIKE_POST
}