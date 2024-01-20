import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButtonProps } from '../screens/Home/Home.types';

const IconButton = ({name, size, callback, color = "#000"}: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={callback}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  )
};

export default IconButton;
