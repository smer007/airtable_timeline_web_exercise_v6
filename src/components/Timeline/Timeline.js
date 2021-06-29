import './../../index.css';

import React, { Fragment, useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Item from './../Item';

import { duration, DurationType } from "./../../utils";
import timelineItems from "./../../timelineItems.js";

const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DEFAULT_SCREEN_SIZE = 1680;
const Timeline = () => {
  const [screenRatio, setScreenRatio] = useState(window.innerWidth/DEFAULT_SCREEN_SIZE);
  const data = normalizeData();
  const header = renderHeader(data.totalDuration);
  const projects = renderProjects(data, screenRatio);

  const handleResize = () => {
    window.addEventListener('resize', screenRatio)
    setScreenRatio(window.innerWidth/DEFAULT_SCREEN_SIZE);
  };

  return (
    <Container onChange={handleResize} fluid>
      {header}
      {projects}
    </Container>
  );
};

const renderProjects = ({ timelineItems: items, totalDuration }, screenRatio) => Object.values(items)
.map(item => <Item
        end={item.end}
        key={item.id}
        name={item.name}
        screenRatio={screenRatio}
        start={item.start}
        totalDuration={totalDuration} />);

const renderHeader = totalDuration => {
  if (!totalDuration) {
    return null;
  };

  const headerArr = [];
  const headerWidth = Math.round(12 / totalDuration);

  while (totalDuration > 0) {
    totalDuration--;
    headerArr.push(Months[totalDuration]);
  };

  const headerRow = headerArr
  .reverse()
  .map((month, itr) => <Col className="header" key={itr} xs={headerWidth}>{month}</Col>);

  return (
    <Row>
      <Col xs={12}>
        <Row>
          {headerRow}
        </Row>
      </Col>
    </Row>
  );
};

const normalizeData = () => {
  const data = {};
  const date = Object.values(timelineItems).map(item => item.start);
  const firstDate =  date.shift();
  const lastDate =  date.pop();

  data.totalDuration = duration(firstDate, lastDate, DurationType.MONTHS);
  data.timelineItems = { ...timelineItems };

  return data;
};

export default Timeline;
