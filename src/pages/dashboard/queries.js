import gql from 'graphql-tag'

const DASHBOARD_UPDATED = gql`
  subscription {
    dashboardUpdated{
      numberOfUsers
      postsInWeek
      numberOfPosts
      topUser{
        username
        fullName
        avatar
      }
    }
  }
`

const DASHBOARD_DATA = gql`
  query{
    dashboardData{
      numberOfUsers
      postsInWeek
      numberOfPosts
      topUser{
        username
        fullName
        avatar
      }
    }
  }
`

export {
  DASHBOARD_UPDATED,
  DASHBOARD_DATA
}