import * as React from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

const Page = styled(View)`
  padding: 30px 30px 0 30px;
`

const TitleForm = styled(Text)`
  margin-bottom: 16px;
  font-weight: bold;
  text-align: center;
`

function LoginScreen({
  navigation,
  route,
  data,
}: {
  navigation?: any,
  route?: any,
  data?: any,
}) {
  const [userName, setUserName] = React.useState(data?.userName);
  const [password, setPassword] = React.useState(data?.password);

  const [isUserName, setIsUserName] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);

  const handleLogin = (reqData: any) => {

  }

  const formTile = 'Login'; // Register
  const btnTitle = 'Login';
  const titleError = !userName && isUserName ? 'Required' : '';
  const contentError = !password && isPassword ? 'Required' : '';
  const disabledBtn = !userName || !password;

  return (
    <Page>
      <TitleForm h3>{formTile}</TitleForm>
      <View>
        <Input
          containerStyle={styles.inputContainerStyle}
          label="User Name"
          value={userName}
          onChangeText={(val) => {
            setUserName(val);
            if (!isUserName) {
              setIsUserName(true);
            }
          }}
          placeholder="Input user name..."
          errorMessage={titleError}
          leftIcon={{ type: 'font-awesome', name: 'user' }}
        />
        <Input
          containerStyle={styles.inputContainerStyle}
          label="Password"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (!isPassword) {
              setIsPassword(true);
            }
          }}
          placeholder="Input password..."
          errorMessage={contentError}
          secureTextEntry={true}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
        />
        <Button disabled={disabledBtn} title={btnTitle} onPress={async () => {
          handleLogin({ ...data, userName, password });
        }} />
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    paddingHorizontal: 0,
  },
});

export default LoginScreen;
