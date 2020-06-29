import React, { useEffect, useRef, useCallback } from 'react'
import { DASHBOARD_UPDATED, DASHBOARD_DATA } from './queries'
import { useSubscription, useQuery } from 'react-apollo'
import { Row, Col } from 'antd'
import { select, scaleLinear, max, scaleBand, axisLeft, axisBottom } from "d3";
import * as moment from 'moment';
import { ROLE_DASHBOARD } from '@constants'

const canvasHeight = 400;
const canvasWidth = 600;
const margin = {
  top: 40,
  bottom: 20,
  left: 50,
  right: 40,
};

const Dashboard = (props) => {
  const { t, currentUser, history } = props

  if (!ROLE_DASHBOARD.includes(currentUser.role)) {
    history.push('/')
  }

  const { data } = useSubscription(DASHBOARD_UPDATED)
  const { data: dashboardQuery } = useQuery(DASHBOARD_DATA, {
    fetchPolicy: 'network-only'
  })
  const svgRef = useRef()

  const { numberOfUsers = 0, numberOfPosts = 0, topUser = {}, postsInWeek = [] } = data ? data.dashboardUpdated : dashboardQuery ? dashboardQuery.dashboardData ? dashboardQuery.dashboardData : {} : {}

  const drawChart = useCallback((svgCanvas, data) => {
    const xScale = scaleLinear()
      .domain([0, max(data, (d) => d.value)])
      .range([0, canvasWidth - margin.left - margin.right]);

    const yScale = scaleBand()
      .domain(data.map((d) => d.day))
      .range([0, canvasHeight - margin.top - margin.bottom])
      .padding(0.1);

    const g = svgCanvas
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    g.append("g").call(axisLeft(yScale));
    g.append("g")
      .call(
        axisBottom(xScale).tickSize(
          -(canvasHeight - margin.top - margin.bottom)
        )
      )
      .attr(
        "transform",
        `translate(0, ${canvasHeight - margin.top - margin.bottom})`
      );

    g.selectAll("rect")
      .append("rect")
      .data(data)
      .join("rect")
      .attr("fill", "steelblue")
      .attr("y", (d) => yScale(d.day))
      .attr("height", yScale.bandwidth());

    g.selectAll("rect")
      .transition()
      .duration(500)
      .attr("width", (d, i) => xScale(d.value));

    g.append("text").attr("y", -10).style("color", "#fff").text("Biểu đồ các bài viết trong 7 ngày gần nhất");
  })

  useEffect(() => {
    const svgCanvas = select(svgRef.current)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .attr("margin", 20)
      .style("border", "1px solid black")

    if (postsInWeek) {
      const data = postsInWeek.map((item, index) => {
        let day
        if (index === 0) {
          day = moment().startOf('days').format("MMM Do")
        } else {
          day = moment().subtract(index, 'days').startOf('days').format("MMM Do")
        }
        return {
          day,
          value: item
        }
      })
      drawChart(svgCanvas, data)
    }

    return () => {
      svgCanvas.remove()
    }
  }, [postsInWeek])

  return (
    <div>
      <Row>
        <Col span={12}>{`Hệ thống có: ${numberOfPosts} bài viết`}</Col>
        <Col span={12}>{`Hệ thống có: ${numberOfUsers} người dùng`}</Col>
      </Row>
      <Row
        style={{
          marginTop: '10px',
        }}
      >
        <Col
          span={12}
          className='chart'
        >
          <div ref={svgRef}>
          </div>
        </Col>
        <Col
          span={12}
        >
          {`Top User : ${topUser?.fullName}(${topUser?.username})`}
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard