import { useAuth } from '@/providers/AuthProvider';
import { db } from '@/utils/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import * as Device from 'expo-device';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import isEqual from 'lodash.isequal';
import React, { useState } from 'react';
import { ActionSheetIOS, ActivityIndicator, Alert, Platform, View } from 'react-native';
import * as Yup from 'yup';
import Styles from './editProfile.styles';

const EditProfileSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short!').required('Name is required'),
  bio: Yup.string().max(500, 'Bio too long'),
  country: Yup.string().optional(),
});

export default function EditProfileScreen() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [saving, setSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [initialData, setInitialData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    country: user?.country || '',
    avatar: user?.avatar || '',
  });

  const handleImagePick = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not supported', 'Camera and gallery are unavailable on web.');
      return;
    }

    const showActionSheet = () =>
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: 'Change Profile Picture',
          options: [
            'Take Photo',
            'Choose from Gallery',
            ...(avatar ? ['Remove Photo'] : []),
            'Cancel',
          ],
          cancelButtonIndex: avatar ? 3 : 2,
          destructiveButtonIndex: avatar ? 2 : undefined,
        },
        async buttonIndex => {
          try {
            if (buttonIndex === 0) {
              const perm = await ImagePicker.requestCameraPermissionsAsync();
              if (!perm.granted) return Alert.alert('Permission required', 'Camera access denied.');

              if (Platform.OS === 'ios' && !Device.isDevice) {
                return Alert.alert('Simulator Detected', 'Camera is not available on simulator.');
              }

              const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
              });

              if (!result.canceled) setAvatar(result.assets[0].uri);
              else Alert.alert('Cancelled', 'No photo taken.');
            } else if (buttonIndex === 1) {
              const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (!perm.granted)
                return Alert.alert('Permission required', 'Gallery access denied.');

              const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
              });

              if (!result.canceled) setAvatar(result.assets[0].uri);
              else Alert.alert('Cancelled', 'No image selected.');
            } else if (avatar && buttonIndex === 2) {
              setAvatar('');
            }
          } catch (err: any) {
            console.error('ImagePicker error:', err);
            Alert.alert('Error', 'Camera or gallery not available on this device.');
          }
        },
      );

    if (Platform.OS === 'ios') return showActionSheet();

    // Android fallback
    const buttons: { text: string; onPress?: () => void; style?: 'cancel' | 'destructive' }[] = [
      {
        text: 'Take Photo',
        onPress: async () => {
          const perm = await ImagePicker.requestCameraPermissionsAsync();
          if (!perm.granted) return Alert.alert('Permission required', 'Camera access denied.');

          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          });

          if (!result.canceled) setAvatar(result.assets[0].uri);
        },
      },
      {
        text: 'Choose from Gallery',
        onPress: async () => {
          const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!perm.granted) return Alert.alert('Permission required', 'Gallery access denied.');

          const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          });

          if (!result.canceled) setAvatar(result.assets[0].uri);
        },
      },
    ];

    if (avatar) {
      buttons.push({
        text: 'Remove Photo',
        style: 'destructive',
        onPress: () => setAvatar(''),
      });
    }
    buttons.push({ text: 'Cancel', style: 'cancel' });
    Alert.alert('Change Profile Picture', '', buttons);
  };

  const handleSave = async (values: any) => {
    if (!user?.uid) return;
    try {
      setSaving(true);
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        name: values.name,
        bio: values.bio,
        country: values.country,
        avatar,
      });

      setInitialData({
        name: values.name,
        bio: values.bio,
        country: values.country,
        avatar,
      });

      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not update your profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Styles.Container behavior="padding">
      <Styles.ScrollContainer>
        {/* Avatar with Loader and Camera Button */}
        <Styles.AvatarContainer>
          <View>
            <Styles.Avatar
              key={avatar}
              source={{ uri: avatar || 'https://via.placeholder.com/150/cccccc?text=No+Image' }}
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
            />
            {imageLoading && (
              <Styles.AvatarLoader>
                <ActivityIndicator size="small" color="#007bff" />
              </Styles.AvatarLoader>
            )}
            <Styles.CameraButton onPress={handleImagePick}>
              <Ionicons name="camera-outline" size={18} color="#fff" />
            </Styles.CameraButton>
          </View>
        </Styles.AvatarContainer>

        {/* Formik Form */}
        <Formik
          initialValues={initialData}
          validationSchema={EditProfileSchema}
          enableReinitialize
          onSubmit={handleSave}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
            const hasChanges = !isEqual({ ...values, avatar }, initialData);

            return (
              <>
                <View style={{ gap: 16 }}>
                  {/* Name */}
                  <View>
                    <Styles.Label>
                      Name <Styles.Required>*</Styles.Required>
                    </Styles.Label>
                    <Styles.Input
                      placeholder="Your name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                    />
                    {touched.name && errors.name && (
                      <Styles.ErrorText>{errors.name}</Styles.ErrorText>
                    )}
                  </View>

                  {/* Bio */}
                  <View>
                    <Styles.Label>Bio</Styles.Label>
                    <Styles.BioWrapper>
                      <Styles.TextArea
                        placeholder="Write something about yourself"
                        value={values.bio}
                        onChangeText={handleChange('bio')}
                        onBlur={handleBlur('bio')}
                        multiline
                      />
                      <Styles.CharCounter>
                        <Styles.CharCount>{values.bio?.length || 0} / 500</Styles.CharCount>
                      </Styles.CharCounter>
                    </Styles.BioWrapper>
                    {touched.bio && errors.bio && <Styles.ErrorText>{errors.bio}</Styles.ErrorText>}
                  </View>

                  {/* Country */}
                  <View>
                    <Styles.Label>Country</Styles.Label>
                    <Styles.Input
                      placeholder="Your country"
                      value={values.country}
                      onChangeText={handleChange('country')}
                      onBlur={handleBlur('country')}
                    />
                  </View>
                </View>

                {/* Save Button */}
                <Styles.ContinueButton
                  disabled={!hasChanges || saving}
                  style={{ opacity: !hasChanges || saving ? 0.5 : 1 }}
                  onPress={handleSubmit as any}>
                  {saving ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Styles.ContinueText>Save Changes</Styles.ContinueText>
                  )}
                </Styles.ContinueButton>
              </>
            );
          }}
        </Formik>
      </Styles.ScrollContainer>
    </Styles.Container>
  );
}
