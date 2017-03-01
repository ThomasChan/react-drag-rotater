'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultStyle = {
  position: 'relative'
};

var Rotater = function (_PureComponent) {
  _inherits(Rotater, _PureComponent);

  function Rotater(props) {
    _classCallCheck(this, Rotater);

    var _this = _possibleConstructorReturn(this, (Rotater.__proto__ || Object.getPrototypeOf(Rotater)).call(this, props));

    _this.state = {
      rad: 0,
      deg: props.initialDeg
    };
    return _this;
  }

  _createClass(Rotater, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _originRef$getBoundin = this.originRef.getBoundingClientRect(),
          left = _originRef$getBoundin.left,
          top = _originRef$getBoundin.top;

      this.origin_x = left + 10;
      this.origin_y = top + 10;
      this.lastRad = 0;
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(e) {
      var _this2 = this;

      this.start_x = e.pageX;
      this.start_y = e.pageY;
      e.preventDefault();
      e.stopPropagation();
      this.dragging = true;
      this.mouseMoveEvent = window.addEventListener('mousemove', function (e) {
        return _this2.onDrag(e);
      });
      this.mouseUpEvent = window.addEventListener('mouseup', function (e) {
        return _this2.onDragStop(e);
      });
    }
  }, {
    key: 'onDrag',
    value: function onDrag(e) {
      var _props = this.props,
          onDragStart = _props.onDragStart,
          onDrag = _props.onDrag;

      e.preventDefault();
      e.stopPropagation();
      if (this.dragging) {
        var moving_x = e.pageX;
        var moving_y = e.pageY;
        if (moving_x !== this.start_x && moving_y !== this.start_y) {
          typeof onDragStart === 'function' && onDragStart();
          var moving_rad = Math.atan2(moving_y - this.origin_y, moving_x - this.origin_x);
          moving_rad -= Math.atan2(this.start_y - this.origin_y, this.start_x - this.origin_x);
          moving_rad += this.lastRad;
          var deg = moving_rad * (360 / (2 * Math.PI));
          this.setState({
            rad: moving_rad,
            deg: deg
          });
          typeof onDrag === 'function' && onDrag({
            rad: moving_rad,
            deg: deg
          });
        }
      }
    }
  }, {
    key: 'onDragStop',
    value: function onDragStop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.dragging = false;
      this.lastRad = this.state.rad;
      typeof this.props.onDragStop === 'function' && this.props.onDragStop(this.state);
      window.removeEventListener('mousemove', this.mouseMoveEvent, true);
      window.removeEventListener('mouseup', this.mouseUpEvent, true);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          origin = _props2.origin,
          className = _props2.className,
          style = _props2.style,
          children = _props2.children;

      return _react2.default.createElement(
        'div',
        { className: className,
          style: _deepmerge2.default.all([defaultStyle, style || {}, {
            transformOrigin: origin.split('-').join(' '),
            transform: 'rotate(' + this.state.deg + 'deg)'
          }]),
          ref: function ref(r) {
            return _this3.rotater = r;
          } },
        _react2.default.createElement(
          'div',
          { className: 'react__drag__rotate__rotater react__drag__rotate__rotater--top-right',
            onMouseDown: function onMouseDown(e) {
              return _this3.onDragStart(e);
            } },
          'top-right'
        ),
        _react2.default.createElement('div', { className: 'react__drag__rotate__rotater--center react__drag__rotate__rotater--center-' + origin,
          ref: function ref(r) {
            return _this3.originRef = r;
          } }),
        children
      );
    }
  }]);

  return Rotater;
}(_react.PureComponent);

Rotater.propTypes = {
  initialDeg: _react.PropTypes.number,
  origin: _react.PropTypes.oneOf(['top-left', 'top-center', 'top-right', 'right-top', 'right-center', 'right-bottom', 'center-center', 'bottom-left', 'bottom-center', 'bottom-right', 'left-top', 'left-center', 'left-bottom']),
  onDragStart: _react.PropTypes.func,
  onDrag: _react.PropTypes.func,
  onDragStop: _react.PropTypes.func
};
Rotater.defaultProps = {
  initialDeg: 0,
  origin: 'center-center',
  onDragStart: function onDragStart() {},
  onDrag: function onDrag() {},
  onDragStop: function onDragStop() {}
};
exports.default = Rotater;
module.exports = exports['default'];