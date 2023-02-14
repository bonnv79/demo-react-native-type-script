import * as React from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { setToken } from '../app/actions/user';

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
  handleSetToken,
  // token,
}: {
  navigation?: any,
  route?: any,
  data?: any,
  handleSetToken: Function,
  // token?: any,
}) {
  const [userName, setUserName] = React.useState(data?.userName);
  const [password, setPassword] = React.useState(data?.password);

  const [isUserName, setIsUserName] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);

  const handleLogin = (reqData: any) => {
    if (reqData?.userName?.toLowerCase() === 'admin' && reqData?.password?.toLowerCase() === 'admin') {
      handleSetToken('admin');
      navigation.navigate('Root');
    } else {
      alert('The Username or Password is Incorrect');
    }
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
          // value={userName}
          defaultValue={userName}
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
          // value={password}
          defaultValue={password}
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
        <Button style={styles.loginBtn} disabled={disabledBtn} title={btnTitle} onPress={() => {
          handleLogin({ ...data, userName, password });
        }} />
        <TouchableOpacity onPress={() => navigation.navigate('Root')} style={styles.link}>
          <Text style={styles.linkText}>Go to back home!</Text>
        </TouchableOpacity>
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    paddingHorizontal: 0,
  },
  loginBtn: {
    marginTop: 16
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
    textAlign: 'center'
  },
});

const mapStateToProps = (state: any) => {
  return {
    // token: state.user.token
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleSetToken: (data: any) => {
      dispatch(setToken(data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
