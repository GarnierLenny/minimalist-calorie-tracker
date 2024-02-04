import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { BMRForm, gender } from './BMT.types';
import Header from './components/Header.component';
import Form from './components/Form.component';

const BMRScreen = () => {
  const [form, setForm] = useState<BMRForm>({
    age: 22,
    weight: 65,
    height: 160,
    gender: gender.male,
  });

  return (
    <SafeAreaView style={{
      display: 'flex',
    }}>
      <Header />
      <Form />
    </SafeAreaView>
  );
};

export default BMRScreen;
