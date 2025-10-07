import styled from 'styled-components/native';

const Styles = {
  Container: styled.ScrollView.attrs({
    contentContainerStyle: { padding: 24, flexGrow: 1, justifyContent: 'top' },
  })`
    background-color: #fff;
  `,

  Title: styled.Text`
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 8px;
  `,

  Subtitle: styled.Text`
    text-align: center;
    color: #666;
    margin-bottom: 24px;
  `,

  Label: styled.Text`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
  `,

  Required: styled.Text`
    color: red;
  `,

  Input: styled.TextInput`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 8px;
  `,

  ErrorText: styled.Text`
    color: red;
    font-size: 12px;
    margin-bottom: 8px;
  `,

  ContinueButton: styled.TouchableOpacity<{ disabled?: boolean }>`
    background-color: ${(props: { disabled?: boolean }) =>
      props.disabled ? '#aaa' : 'dodgerblue'};
    padding: 14px;
    border-radius: 8px;
    margin-top: 10px;
    opacity: ${(props: { disabled?: boolean }) => (props.disabled ? 0.6 : 1)};
  `,

  ContinueText: styled.Text`
    color: #fff;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
  `,
};

export default Styles;
