import * as React from "react";
import { KeyboardAvoidingView } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export const KeyboardShift = ({ children }) => {
  const height = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height + 64}
      behavior="padding"
      style={{ flex: 1 }}
      enabled
    >
      {children}
    </KeyboardAvoidingView>
  );
};
