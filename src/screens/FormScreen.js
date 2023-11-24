import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {InputComponent} from '../components';
import {GenderSelect} from '../components';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import ImagePicker from 'react-native-image-crop-picker';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .matches(/^[a-zA-Z\s]+$/, 'First name must contain only letters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Last name must contain only letters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'),
  mobile: yup.number().required('Mobile Number is required'),
  gender: yup.string().required('Gender is required'),
});

export default function UserProfileEdit() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      gender: '',
    },
  });

  const [image, setImage] = useState(
    '/Users/vigneshkumaran/testScreen/image1.png',
  );

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  return (
    <View style={{flex: 1}}>
      <Text style={styles.titleStyle}>Sample Form using React Hook Form</Text>
      <View style={styles.centerItem}>
        <Image
          style={{height: 150, width: 150, borderRadius: 75}}
          source={{uri: image}}
        />
      </View>
      <TouchableOpacity
        style={styles.centerItem}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.textStyle}>Update Profile Picture</Text>
      </TouchableOpacity>
      <InputComponent
        control={control}
        placeholder={'Enter First name'}
        name="firstName"
        error={errors?.firstName}
      />
      <InputComponent
        control={control}
        placeholder={'Enter Last name'}
        name="lastName"
        error={errors?.lastName}
      />
      <InputComponent
        control={control}
        placeholder={'Enter Email'}
        name="email"
        error={errors?.email}
      />
      <InputComponent
        control={control}
        placeholder={'Enter Mobile Number'}
        name="mobile"
        error={errors?.mobile}
      />
      <Controller
        name={'gender'}
        control={control}
        render={({field: {onChange, value}}) => {
          return (
            <GenderSelect
              control={control}
              value={value}
              onValueSelected={onChange}
            />
          );
        }}
      />

      <Button
        title={'Submit'}
        onPress={handleSubmit(formData => {
          console.log(formData);
          Alert.alert(`Form Submitted Successfully`);
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    borderWidth: 2,
    padding: 5,
  },
  titleStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
});
