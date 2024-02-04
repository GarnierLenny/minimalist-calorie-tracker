import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller, Control } from 'react-hook-form';
import CheckBox from 'expo-checkbox';

enum genderEnum {
  male,
  female,
};

type FormFields = {
  age: string;
  height: string;
  weight: string;
};

type FormControlProps = {
  control: Control<FormFields, any>;
  formField: string;
  placeHolder: string;
  inputTitle: string;
  unit: string;
};

const FormControl = ({control, formField, placeHolder, inputTitle, unit}: FormControlProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Controller
      rules={{required: true}}
      control={control}
      name={formField}
      render={({ field: {onChange, onBlur, value}}) => (
        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.inputTitle}>{inputTitle}</Text>
          <SafeAreaView style={styles.inputUnitContainer}>
            <TextInput
              keyboardType='number-pad'
              placeholder={placeHolder}
              value={value}
              onChangeText={onChange}
              onBlur={() => {onBlur(); setIsFocused(false)}}
              onFocus={() => setIsFocused(true)}
              style={{
                ...styles.input,
                borderColor: isFocused === true ? 'rgb(0, 122, 255)' : '#000',
              }}
            />
            <Text style={styles.unit}>{unit}</Text>
          </SafeAreaView>
        </SafeAreaView>
      )}
    />
  );
};

const Form = () => {
  const {width, height} = Dimensions.get('screen');
  const [gender, setGender] = useState<genderEnum>(genderEnum.male);
  const formDefault: FormFields = {
    age: '',
    height: '',
    weight: '',
  };
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<FormFields>({defaultValues: formDefault});

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SafeAreaView style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Gender</Text>
        <SafeAreaView style={styles.checkDotsContainer}>
          <TouchableOpacity
            onPress={() => setGender(genderEnum.male)}
            style={{...styles.checkDot, borderWidth: gender === genderEnum.male ? 4.5 : 1.5}}
          />
          <Text style={styles.genderText}>male</Text>
          <TouchableOpacity
            onPress={() => setGender(genderEnum.female)}
            style={{...styles.checkDot, borderWidth: gender === genderEnum.female ? 4.5 : 1.5}}
          />
          <Text style={styles.genderText}>female</Text>
        </SafeAreaView>
      </SafeAreaView>
      <FormControl unit='' inputTitle="Age" control={control} formField='age' placeHolder='0' />
      <FormControl unit='cm' inputTitle="Height" control={control} formField='height' placeHolder='0' />
      <FormControl unit='kg' inputTitle="Weight" control={control} formField='weight' placeHolder='0' />
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  genderText: {
    marginLeft: '3%',
    fontSize: 15,
    marginBottom: '1%',
  },
  checkDotsContainer: {
    flexDirection: 'row',
    paddingHorizontal: '12%',
    alignContent: 'center',
  },
  checkDot: {
    borderWidth: 1.5,
    borderColor: 'rgb(0, 122, 255)',
    alignSelf: 'center',
    width: width * 0.038,
    height: width * 0.038,
    borderRadius: 100,
    marginLeft: '12%',
  },
  mainContainer: {
    display: 'flex',
    marginTop: '5%',
    gap: 15,
    paddingVertical: 15,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '5%',
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 20,
    elevation: 5,
    shadowRadius: 3.84,
    shadowOffset: { width: 0, height: 0 },
    borderBottomWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  inputUnitContainer: {
    flexDirection: 'row',
    width: '25%',
    position: 'absolute',
    right: '8%',
    gap: 10,
    backgroundColor: 'rgba(80, 230, 120, 0)',
  },
  unit: {
    alignSelf: 'center',
    fontSize: 17,
  },
  input: {
    fontSize: 19,
    fontWeight: '400',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    alignSelf: 'flex-end',
    paddingRight: 5,
    width: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderBottomWidth: 0.2,
    // right: 50,
  },
});

export default Form;
