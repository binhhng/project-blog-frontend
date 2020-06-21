import gql from 'graphql-tag'

const GET_POSTS = gql`
  query{
    getPosts{
      _id
      creator{
        username
      }
      description
      thumbnails
      idLikes
      createdAt
    }
  }
`

const TOGGLE_LIKE_POST = gql`
  mutation toggleLikePost ($idPost: String){
    toggleLikePost(idPost: $idPost)
  }
`

const CREATE_NEW_POST = gql`
  mutation createNewPost($input: PostInput){
    createNewPost(input: $input){
      _id
    }
  }
`

const DELETE_POST = gql`
  mutation deletePost($idPost: String){
    deletePost(idPost: $idPost)
  }
`

const EDIT_POST = gql`
  mutation updatePost($idPost: String) {
    updatePost(idPost: $idPost)
  }
`

export {
  GET_POSTS,
  TOGGLE_LIKE_POST,
  CREATE_NEW_POST,
  DELETE_POST
}