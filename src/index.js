import React, { PureComponent, PropTypes } from 'react';
import deepmerge from 'deepmerge';
import './index.less';

const defaultStyle = {
  position: 'relative',
};

export default class Rotater extends PureComponent {

  static propTypes = {
    initialDeg: PropTypes.number,
    origin: PropTypes.oneOf([
      'top-left', 'top-center', 'top-right',
      'right-top', 'right-center', 'right-bottom',
      'center-center',
      'bottom-left', 'bottom-center', 'bottom-right',
      'left-top', 'left-center', 'left-bottom',
    ]),
    onRotateStart: PropTypes.func,
    onRotate: PropTypes.func,
    onRotateStop: PropTypes.func,
  };

  static defaultProps = {
    initialDeg: 0,
    origin: 'center-center',
    onRotateStart: () => {},
    onRotate: () => {},
    onRotateStop: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      rad: 0,
      deg: props.initialDeg,
    };
    this.onRotate = this.onRotate.bind(this);
    this.onRotateStop = this.onRotateStop.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      const { width, height, left, top } = this.originRef.getBoundingClientRect();
      this.origin_x = left + (width / 2);
      this.origin_y = top + (height / 2);
      this.lastRad = 0;
    });
  }

  onRotateStart(e) {
    this.start_x = e.pageX;
    this.start_y = e.pageY;
    e.preventDefault();
    e.stopPropagation();
    this.dragging = true;
    window.addEventListener('mousemove', this.onRotate, false);
    window.addEventListener('mouseup', this.onRotateStop, false);
  }

  onRotate(e) {
    const {
      onRotateStart,
      onRotate,
    } = this.props;
    e.preventDefault();
    e.stopPropagation();
    if (this.dragging) {
      const moving_x = e.pageX;
      const moving_y = e.pageY;
      if (moving_x !== this.start_x &&
        moving_y !== this.start_y) {
        typeof onRotateStart === 'function' && onRotateStart()
        let moving_rad = Math.atan2(moving_y - this.origin_y, moving_x - this.origin_x);
        moving_rad -= Math.atan2(this.start_y - this.origin_y, this.start_x - this.origin_x);
        moving_rad += this.lastRad;
        const deg = moving_rad * (360 / (2 * Math.PI));
        this.setState({
          rad: moving_rad,
          deg,
        });
        typeof onRotate === 'function' && onRotate({
          rad: moving_rad,
          deg,
        });
      }
    }
  }

  onRotateStop(e) {
    this.dragging = false;
    this.lastRad = this.state.rad;
    window.removeEventListener('mousemove', this.onRotate, false);
    window.removeEventListener('mouseup', this.onRotateStop, false);
    typeof this.props.onRotateStop === 'function' && this.props.onRotateStop(this.state);
  }

  render() {
    const { origin } = this.props;
    return <div className="react__drag__rotate__rotater-wrap" ref={r => this.rotater = r}>
      <div className="react__drag__rotate__rotater react__drag__rotate__rotater--top-right"
        onMouseDown={e => this.onRotateStart(e)} />
      <div className={`react__drag__rotate__rotater--center react__drag__rotate__rotater--center-${origin}`}
        ref={r => this.originRef = r} />
    </div>
  }

}
