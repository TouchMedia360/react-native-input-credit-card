import React, { Component } from "react";
import PropTypes from "deprecated-react-native-prop-types";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
  Image,
} from "react-native";

const s = StyleSheet.create({
  baseInputStyle: {
    color: "#000",
  },
  mainContainer: {
    width: "100%",
  },
  inputImgContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  tickCircle: {
    width: 15,
    height: 15,
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#b7b7b7",
  },
});

export default class CCInput extends Component {
  static propTypes = {
    field: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,

    status: PropTypes.oneOf(["valid", "invalid", "incomplete"]),

    containerStyle: ViewPropTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBecomeEmpty: PropTypes.func,
    onBecomeValid: PropTypes.func,
    additionalInputProps: PropTypes.shape(TextInput.propTypes),
  };

  static defaultProps = {
    label: "",
    value: "",
    status: "incomplete",
    containerStyle: {},
    inputStyle: {},
    labelStyle: {},
    onFocus: () => {},
    onChange: () => {},
    onBecomeEmpty: () => {},
    onBecomeValid: () => {},
    additionalInputProps: {},
  };

  componentDidUpdate(prevProps) {
    const { status, value, onBecomeEmpty, onBecomeValid, field } = prevProps;
    const { status: newStatus, value: newValue } = this.props;

    if (value !== "" && newValue === "") onBecomeEmpty(field);
    if (status !== "valid" && newStatus === "valid") onBecomeValid(field);
  }

  focus = () => this.refs.input.focus();

  _onFocus = () => this.props.onFocus(this.props.field);
  _onChange = (value) => this.props.onChange(this.props.field, value);

  render() {
    const {
      label,
      value,
      placeholder,
      status,
      keyboardType,
      containerStyle,
      inputStyle,
      labelStyle,
      validColor,
      invalidColor,
      placeholderColor,
      additionalInputProps,
    } = this.props;

    return (
      <TouchableOpacity onPress={this.focus} activeOpacity={0.99}>
        <View style={[containerStyle, s.mainContainer]}>
          {/* {!!label && <Text style={[labelStyle]}>{label}</Text>} */}
          <View
            style={[
              s.inputImgContainer,
              s.inputContainerStyle,
            ]}
          >
            <TextInput
              ref="input"
              {...additionalInputProps}
              keyboardType={keyboardType}
              autoCapitalise="words"
              autoCorrect={false}
              style={[
                s.baseInputStyle,
                inputStyle,
                validColor && status === "valid"
                  ? { color: validColor }
                  : invalidColor && status === "invalid"
                  ? { color: invalidColor }
                  : {},
              ]}
              underlineColorAndroid={"transparent"}
              placeholderTextColor={placeholderColor}
              placeholder={placeholder}
              value={value}
              onFocus={this._onFocus}
              onChangeText={this._onChange}
            />
            {status === "valid" ? (
              <Image
                style={[s.tickCircle]}
                source={require("./icons/activeCircle.png")}
              />
            ) : (
              <Image
                style={[s.tickCircle]}
                source={require("./icons/inActiveTick.png")}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
