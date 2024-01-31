import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconButtonProps } from "./IconButton.types";

const IconButton = ({
  name,
  size,
  callback,
  color = "#000",
  disabled = false,
  disaledColor = "#aaa",
}: IconButtonProps) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={callback}>
      <Icon name={name} size={size} color={disabled ? disaledColor : color} />
    </TouchableOpacity>
  );
};

export default IconButton;
