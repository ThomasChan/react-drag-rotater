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
    _this.onRotate = _this.onRotate.bind(_this);
    _this.onRotateStop = _this.onRotateStop.bind(_this);
    return _this;
  }

  _createClass(Rotater, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _originRef$getBoundin = this.originRef.getBoundingClientRect(),
          width = _originRef$getBoundin.width,
          height = _originRef$getBoundin.height,
          left = _originRef$getBoundin.left,
          top = _originRef$getBoundin.top;

      this.origin_x = left + width / 2 + 10;
      this.origin_y = top + height / 2 + 10;
      this.lastRad = 0;
    }
  }, {
    key: 'onRotateStart',
    value: function onRotateStart(e) {
      this.start_x = e.pageX;
      this.start_y = e.pageY;
      e.preventDefault();
      e.stopPropagation();
      this.dragging = true;
      window.addEventListener('mousemove', this.onRotate, false);
      window.addEventListener('mouseup', this.onRotateStop, false);
    }
  }, {
    key: 'onRotate',
    value: function onRotate(e) {
      var _props = this.props,
          onRotateStart = _props.onRotateStart,
          onRotate = _props.onRotate;

      e.preventDefault();
      e.stopPropagation();
      if (this.dragging) {
        var moving_x = e.pageX;
        var moving_y = e.pageY;
        if (moving_x !== this.start_x && moving_y !== this.start_y) {
          typeof onRotateStart === 'function' && onRotateStart();
          var moving_rad = Math.atan2(moving_y - this.origin_y, moving_x - this.origin_x);
          moving_rad -= Math.atan2(this.start_y - this.origin_y, this.start_x - this.origin_x);
          moving_rad += this.lastRad;
          var deg = moving_rad * (360 / (2 * Math.PI));
          this.setState({
            rad: moving_rad,
            deg: deg
          });
          typeof onRotate === 'function' && onRotate({
            rad: moving_rad,
            deg: deg
          });
        }
      }
    }
  }, {
    key: 'onRotateStop',
    value: function onRotateStop(e) {
      this.dragging = false;
      this.lastRad = this.state.rad;
      window.removeEventListener('mousemove', this.onRotate, false);
      window.removeEventListener('mouseup', this.onRotateStop, false);
      typeof this.props.onRotateStop === 'function' && this.props.onRotateStop(this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var origin = this.props.origin;

      return _react2.default.createElement(
        'div',
        { className: 'react__drag__rotate__rotater-wrap', ref: function ref(r) {
            return _this2.rotater = r;
          } },
        _react2.default.createElement('div', { className: 'react__drag__rotate__rotater react__drag__rotate__rotater--top-right',
          onMouseDown: function onMouseDown(e) {
            return _this2.onRotateStart(e);
          } }),
        _react2.default.createElement('div', { className: 'react__drag__rotate__rotater--center react__drag__rotate__rotater--center-' + origin,
          ref: function ref(r) {
            return _this2.originRef = r;
          } })
      );
    }
  }]);

  return Rotater;
}(_react.PureComponent);

Rotater.propTypes = {
  initialDeg: _react.PropTypes.number,
  origin: _react.PropTypes.oneOf(['top-left', 'top-center', 'top-right', 'right-top', 'right-center', 'right-bottom', 'center-center', 'bottom-left', 'bottom-center', 'bottom-right', 'left-top', 'left-center', 'left-bottom']),
  onRotateStart: _react.PropTypes.func,
  onRotate: _react.PropTypes.func,
  onRotateStop: _react.PropTypes.func
};
Rotater.defaultProps = {
  initialDeg: 0,
  origin: 'center-center',
  onRotateStart: function onRotateStart() {},
  onRotate: function onRotate() {},
  onRotateStop: function onRotateStop() {}
};
exports.default = Rotater;
module.exports = exports['default'];