// startup.styles.ts
import styled from 'styled-components/native';

const Styles = {
  Container: styled.View`
    flex: 1;
    justify-content: center;
    padding: 24px;
    background-color: #fff;
  `,

  Logo: styled.Image`
    width: 100px;
    height: 100px;
    align-self: center;
    margin-bottom: 20px;
  `,

  Title: styled.Text`
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  `,

  Subtitle: styled.Text`
    font-size: 14px;
    color: #666;
    text-align: center;
    margin-bottom: 24px;
  `,

  SocialButton: styled.TouchableOpacity`
    background-color: #f1f1f1;
    padding: 12px;
    border-radius: 8px;
    margin-vertical: 6px;
  `,

  SocialText: styled.Text`
    text-align: center;
    font-weight: 500;
  `,

  DividerContainer: styled.View`
    flex-direction: row;
    align-items: center;
    margin-vertical: 20px;
  `,

  Line: styled.View`
    flex: 1;
    height: 1px;
    background-color: #ccc;
  `,

  DividerText: styled.Text`
    margin-horizontal: 10px;
    color: #888;
    font-weight: 500;
  `,

  MainButton: styled.TouchableOpacity`
    background-color: dodgerblue;
    padding: 14px;
    border-radius: 8px;
    align-items: center;
    margin-top: 10px;
  `,

  MainButtonText: styled.Text`
    color: #fff;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
  `,

  SignupRow: styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  `,

  SignupText: styled.Text`
    color: #444;
    font-size: 14px;
  `,

  SignupLink: styled.TouchableOpacity`
    margin-left: 6px;
  `,

  SignupLinkText: styled.Text`
    color: dodgerblue;
    font-weight: 600;
    font-size: 14px;
  `,

  Privacy: styled.Text`
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 30px;
    line-height: 18px;
  `,
};

export default Styles;
