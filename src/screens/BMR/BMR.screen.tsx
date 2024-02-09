import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Form from './components/Form.component';
import { SafeAreaView } from "react-native";
import Header from "./components/Header.component";
import { BMRStackParamList } from "../../navigation/BMRParent/BMRParent.types";

const BMRScreen = ({navigation}: NativeStackScreenProps<BMRStackParamList, 'BMR'>) => {
  return (
    <SafeAreaView style={{
      display: 'flex',
    }}>
      <Header />
      <Form navigation={navigation} />
    </SafeAreaView>
  );
};

export default BMRScreen;
