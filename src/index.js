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
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragStop: PropTypes.func,
  }

  static defaultProps = {
    initialDeg: 0,
    origin: 'center-center',
    onDragStart: () => {},
    onDrag: () => {},
    onDragStop: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      rad: 0,
      deg: props.initialDeg,
    };
  }

  componentDidMount() {
    const { left, top } = this.originRef.getBoundingClientRect();
    this.origin_x = left + 10;
    this.origin_y = top + 10;
    this.lastRad = 0;
  }

  onDragStart(e) {
    this.start_x = e.pageX;
    this.start_y = e.pageY;
    e.preventDefault();
    e.stopPropagation();
    this.dragging = true;
    this.mouseMoveEvent = window.addEventListener('mousemove', e => this.onDrag(e));
    this.mouseUpEvent = window.addEventListener('mouseup', e => this.onDragStop(e));
  }

  onDrag(e) {
    const {
      onDragStart,
      onDrag,
    } = this.props;
    e.preventDefault();
    e.stopPropagation();
    if (this.dragging) {
      const moving_x = e.pageX;
      const moving_y = e.pageY;
      if (moving_x !== this.start_x &&
        moving_y !== this.start_y) {
        typeof onDragStart === 'function' && onDragStart()
        let moving_rad = Math.atan2(moving_y - this.origin_y, moving_x - this.origin_x);
        moving_rad -= Math.atan2(this.start_y - this.origin_y, this.start_x - this.origin_x);
        moving_rad += this.lastRad;
        const deg = moving_rad * (360 / (2 * Math.PI));
        this.setState({
          rad: moving_rad,
          deg,
        });
        typeof onDrag === 'function' && onDrag({
          rad: moving_rad,
          deg,
        });
      }
    }
  }

  onDragStop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dragging = false;
    this.lastRad = this.state.rad;
    typeof this.props.onDragStop === 'function' && this.props.onDragStop(this.state);
    window.removeEventListener('mousemove', this.mouseMoveEvent, true);
    window.removeEventListener('mouseup', this.mouseUpEvent, true);
  }

  render() {
    const {
      origin,
      className,
      style,
      children,
    } = this.props;
    return <div className={className}
      style={deepmerge.all([defaultStyle, style || {}, {
        transformOrigin: origin.split('-').join(' '),
        transform: `rotate(${this.state.deg}deg)`,
      }])}
      ref={r => this.rotater = r}>
      <div className="react__drag__rotate__rotater react__drag__rotate__rotater--top-right"
        onMouseDown={e => this.onDragStart(e)}>top-right</div>
      <div className={`react__drag__rotate__rotater--center react__drag__rotate__rotater--center-${origin}`}
        ref={r => this.originRef = r} />
      {children}
    </div>
  }

}
