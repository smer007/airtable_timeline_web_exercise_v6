import "./Item.css";

import React, { Fragment, useRef, useState } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Row from 'react-bootstrap/Row';

import { duration } from "./../../utils";

const GRID_WIDTH = 12;
const MAX_MONTH = 31;
const Item = props => {

  const [projectTooltipShow, setProjectTooltipShow] = useState(false);
  const target = useRef(null);
  const { end, name, screenRatio, start, totalDuration } = props;
  const width = screenRatio * (duration(start, end, 'day') + 1) * 5 * Math.round(GRID_WIDTH / totalDuration);
  const push = (Number(start.substring(5, 7)) - 1) * Math.round(GRID_WIDTH / totalDuration);
  const offset = { offset: push };
  const left = screenRatio * (start.substring(8, 10)) * 100 / MAX_MONTH / GRID_WIDTH * Math.round(GRID_WIDTH / totalDuration) - 2 + '%';

  const toggleOnHover = () => {
    setProjectTooltipShow(true);
  };

  const toggleOffHover = () => {
    setProjectTooltipShow(false);
  };

  return (
    <Row style={{ borderTop: '1px dashed gray', paddingTop: '5px' }}>
      <Col xs={offset}>
        <span
          className="clsProject"
          ref={target}
          style={{ left, width }}
          onMouseEnter={toggleOnHover}
          onMouseLeave={toggleOffHover} />
        <Overlay target={target.current} show={projectTooltipShow} placement="right">
        {(props) => (
          <Tooltip id="projectItems" {...props}>
            {start} to {end}
          </Tooltip>
        )}
      </Overlay>
      </Col>
      <Col className="clsProjectName"><span>{name}</span></Col>
    </Row>
  );
};

export default Item;
