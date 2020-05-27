import gql from 'graphql-tag'

const DASHBOARD_UPDATED = gql`
  subscription {
    dashboardUpdated{
      numberOfUsers
    }
  }
`

export {
  DASHBOARD_UPDATED
}