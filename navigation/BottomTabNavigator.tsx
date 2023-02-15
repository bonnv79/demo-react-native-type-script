/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Pressable, Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NewsScreen from '../screens/NewsScreen';
import CreateNewsScreen from '../screens/CreateNewsScreen';
import { RootTabParamList, RootTabScreenProps } from '../types';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { setToken } from '../app/actions/userActions';
import { setNewsById } from '../app/actions/newsActions';
import HeaderNavigator from './HeaderNavigator';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator(props: any) {
  const {
    navigation,
    isLogin,
    handleSetToken,
    setNewsInfo
  } = props;
  const colorScheme = useColorScheme();

  function handleLogin() {
    if (isLogin) {
      handleSetToken('');
    }
    navigation.navigate('Login');
  }

  return (
    <>
      <HeaderNavigator />

      <BottomTab.Navigator
        initialRouteName="TabOne"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
        }}
      >
        <BottomTab.Screen
          name="TabOne"
          component={NewsScreen}
          options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
            title: 'News App',
            tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />,
            headerRight: () => (
              <Pressable
                onPress={handleLogin}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <Ionicons
                  name={isLogin ? 'ios-log-out-outline' : 'ios-log-in-outline'}
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ),
          })}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              // e.preventDefault();
              // loadData();
            },
          }}
        />
        {
          isLogin && (
            <BottomTab.Screen
              name="TabTwo"
              component={CreateNewsScreen}
              options={{
                title: 'Create News',
                tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />,
              }}
              listeners={{
                tabPress: (e) => {
                  setNewsInfo('');
                },
              }}
            />
          )
        }
      </BottomTab.Navigator>
    </>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const mapStateToProps = (state: any) => {
  return {
    isLogin: !!state.user.token,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleSetToken: (data: any) => dispatch(setToken(data)),
    setNewsInfo: (data: any) => dispatch(setNewsById(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabNavigator);