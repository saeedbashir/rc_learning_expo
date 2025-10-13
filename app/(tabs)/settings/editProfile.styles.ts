import styled from 'styled-components/native';

const styles = {
  Container: styled.KeyboardAvoidingView`
    flex: 1;
  `,

  ScrollContainer: styled.ScrollView.attrs({
    contentContainerStyle: {
      padding: 20,
      paddingBottom: 50,
    },
  })``,

  AvatarContainer: styled.View`
    align-items: center;
    margin-bottom: 40px;
  `,

  CameraButton: styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #007bff;
    width: 34px;
    height: 34px;
    border-radius: 17px;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-color: #fff;
  `,

  AvatarLoader: styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
  `,

  Label: styled.Text`
    font-size: 16px;
    color: #333;
    margin-bottom: 6px;
  `,

  Required: styled.Text`
    color: red;
  `,

  Input: styled.TextInput`
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 12px;
    font-size: 15px;
    color: #333;
  `,

  TextArea: styled.TextInput`
    border-width: 0;
    border-radius: 0;
    background-color: transparent;
    text-align-vertical: top;
    font-size: 15px;
    color: #333;
  `,

  ContinueButton: styled.TouchableOpacity`
    background-color: #007bff;
    border-radius: 10px;
    padding: 14px;
    align-items: center;
    margin-top: 40px;
  `,

  ContinueText: styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  `,

  ErrorText: styled.Text`
    color: red;
    font-size: 13px;
    margin-top: 4px;
  `,

  Avatar: styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 60px;
    border-width: 2px;
    border-color: #ddd;
  `,

  BioWrapper: styled.View`
    border-width: 1px;
    border-color: #ddd;
    border-radius: 10px;
    padding: 8px 10px 22px 10px;
    position: relative;
  `,

  CharCounter: styled.View`
    position: absolute;
    right: 12px;
    bottom: 6px;
    padding: 2px 6px;
    background-color: #fafafa;
  `,

  CharCount: styled.Text`
    font-size: 12px;
    color: #999;
  `,
};

export default styles;
