import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {genderEnum, FormFields, FormControlProps, CheckDotProps} from '../BMR.types';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

const {width} = Dimensions.get('screen');

const FormControl = ({control, formField, placeHolder, inputTitle, unit}: FormControlProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Controller
      rules={{required: false}}
      control={control}
      name={formField}
      render={({ field: {onChange, onBlur, value}}) => (
        <SafeAreaView>
          <SafeAreaView style={{...styles.inputContainer, backgroundColor: '#000', position: 'absolute', top: 31, zIndex: -1}} />
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
        </SafeAreaView>
      )}
    />
  );
};

const Form = ({navigation}: any) => {
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

  const GenderForm = () => {
    const CheckDot = ({newGender}: CheckDotProps) => {
      return (
        <>
          <TouchableOpacity
            onPress={() => setGender(newGender)}
            style={{...styles.checkDot, borderWidth: gender === newGender ? 4.5 : 1.5}}
          />
          <Text style={styles.genderText}>{newGender}</Text>
        </>
      );
    };

    return (
      <SafeAreaView>
        <SafeAreaView style={{...styles.inputContainer, backgroundColor: '#000', position: 'absolute', top: 31, zIndex: -1}} />
        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Gender</Text>
          <SafeAreaView style={styles.checkDotsContainer}>
            <CheckDot newGender={genderEnum.male} />
            <CheckDot newGender={genderEnum.female} />
          </SafeAreaView>
        </SafeAreaView>
      </SafeAreaView>
    );
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Basal metabolic rate', value: '1.0'},
    {label: 'Little to no exercise', value: '1.30'},
    {label: 'Light exercises 1-3 days/week', value: '1.40'},
    {label: 'Moderade exercises 3-5 days/week', value: '1.53'},
    {label: 'Hard exercises 6-7 days/week', value: '1.71'},
    {label: 'Daily intense exercises or physical job', value: '2.1'},
  ]);

  const onSubmit = (data: FormFields) => {
    if (
      data.age === '' ||
      data.height === '' ||
      data.weight === '' ||
      gender === undefined ||
      value === null
    ) {
      console.log('Fields empty');
      return;
    }
    const genderCoef: number[] = gender === genderEnum.male ?
      [88.362, 13.397,  4.799, 5.677] : //male
      [447.593, 9.247, 3.098, 4.330]; //female
    const bmr = (Math.round(genderCoef[0] + (74 * genderCoef[1]) + (180 * genderCoef[2]) - (22 * genderCoef[3])));
    navigation.push('Result', {bmr: bmr, weight: Number(data.weight), activity: Number(value)});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <GenderForm />

      <FormControl unit='' inputTitle="Age" control={control} formField='age' placeHolder='0' />
      <FormControl unit='cm' inputTitle="Height" control={control} formField='height' placeHolder='0' />
      <FormControl unit='kg' inputTitle="Weight" control={control} formField='weight' placeHolder='0' />

      <SafeAreaView style={styles.activityPickerContainer}>
        <DropDownPicker
          disabled
          style={{paddingVertical: '6.5%', alignSelf: 'center', position: 'absolute', backgroundColor: '#000', top: 5, zIndex: -1}}
          // itemStyle={{fontWeight: '400', fontSize: 10}}
          open={false}
          value={value}
          items={items}
          setOpen={() => {}}
          setValue={setValue}
        />
        <DropDownPicker
          placeholder="Select weekly physical activity"
          style={{paddingVertical: '6.5%', alignSelf: 'center'}}
          textStyle={{fontWeight: '500', fontSize: 15, marginLeft: '4%'}}
          placeholderStyle={{fontWeight: '500', fontSize: 15, marginLeft: '4%'}}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </SafeAreaView>

      {/* Submit button */}
      <SafeAreaView style={styles.submitButtonContainer}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{...styles.submitButton, backgroundColor: '#000', top: 3, position: 'absolute', zIndex: -1}}
        >
          <Text style={{...styles.submitButtonText, color: '#fff'}}>{'Submit  >>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>{'Submit  >>'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  activityPickerContainer: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: 15,
  },
  submitButtonContainer: {
    flexDirection: 'row',
    width: '80%',
    marginTop: '4%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  submitButton: {
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    right: 0,
  },
  submitButtonText: {
    fontWeight: '500',
    fontSize: 15,
  },
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
    borderColor: 'rgb(0, 0, 0)',
    alignSelf: 'center',
    width: width * 0.038,
    height: width * 0.038,
    borderRadius: 100,
    marginLeft: '12%',
  },
  mainContainer: {
    // backgroundColor: '#ff3',
    display: 'flex',
    gap: 15,
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
    borderRadius: 10,
    alignSelf: 'center',
    paddingVertical: 20,
    borderWidth: 1,
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
    paddingVertical: 5,
    paddingLeft: 10,
    alignSelf: 'flex-end',
    width: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomWidth: 2,
  },
});

export default Form;
