import React from 'react'
import { DASHBOARD_UPDATED } from './queries'
import { useSubscription } from 'react-apollo'

function Dashboard(props) {
  const { data, loading, error } = useSubscription(DASHBOARD_UPDATED)
  console.log(data)
  const { t } = props
  return (
    <p>{data ? data.dashboardUpdated.numberOfUsers : t('common.menu.dashboard')}</p>
  )
}

export default Dashboard