"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true
})
exports.default = void 0

var _SOdometerComponent = _interopRequireDefault(
  require("./js/SOdometerComponent")
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var _default = _SOdometerComponent.default.define(
  "s-odometer",
  _SOdometerComponent.default
)

exports.default = _default
