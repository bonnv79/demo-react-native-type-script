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
import { createItem, deleteItem, getItemsById, getItemsByPage } from '../services/api';
import Loading from '../components/Loading';
import styled from 'styled-components/native';
import { hasError } from '../utils';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { setToken } from '../app/actions/user';

const ALERT_COLOR = {
  danger: '#f44336',
  success: '#04AA6D',
  info: '#2196F3',
  warning: '#ff9800',
};

const Msg = styled(Text) <{ color?: string }>`
  position: absolute;
  z-index: 10;
  top: ${Constants?.statusBarHeight}px;
  background-color: #f44336;
  background-color: ${(props) => props.color || ALERT_COLOR.success};
  color: white;
  padding: 12px;
  width: 100%;
`

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

let timeOut: any = null;

function BottomTabNavigator(props: any) {
  const { navigation, route, isLogin, handleSetToken } = props;
  const [loading, setLoading] = React.useState<boolean>();
  const [data, setData] = React.useState<[any]>();
  const [msg, setMsg] = React.useState<any>(null);
  const [updateData, setUpdateData] = React.useState<any>(null);

  const colorScheme = useColorScheme();

  const showNotify = (val: String, type?: String) => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    setMsg({
      msg: val,
      type
    });
    timeOut = setTimeout(() => {
      setMsg('');
    }, 3000);
  }

  async function loadData() {
    setLoading(true);
    const res = await getItemsByPage();
    setLoading(false);

    if (hasError(res)) {
      showNotify(res?.message, ALERT_COLOR.danger);
      return;
    }
    console.log(res?.data);
    setData(res?.data);
  }

  async function getDataById(id: String) {
    setLoading(true);
    const res = await getItemsById(id);
    setLoading(false);

    if (hasError(res)) {
      showNotify(res?.message, ALERT_COLOR.danger);
      return;
    }
    console.log('getDataById: ', res?.data);
    return res?.data;
  }

  async function handleDeleteItem(id: String) {
    setLoading(true);
    const res = await deleteItem(id);
    if (res?.data?.deletedCount > 0) {
      loadData();
      showNotify('Delete successfully');
    } else {
      showNotify(res?.message, ALERT_COLOR.danger);
      setLoading(false);
    }
  }

  async function handleCreateItem(props: any) {
    const { title, content, creator = 'admin', status = 0, ...req } = props;
    setLoading(true);
    const res = await createItem({
      ...req,
      title,
      content,
      creator,
      status
    });
    setLoading(false);

    if (hasError(res)) {
      showNotify(res?.message, ALERT_COLOR.danger);
      return;
    }
    navigation.replace('Root');
    showNotify('Create successfully');
  }

  async function handleEditItem(id: String) {
    const res = await getDataById(id);
    setUpdateData(res);
    navigation.navigate('TabTwo');
  }

  async function handleViewItem(id: String) {
    navigation.navigate('Modal');
  }

  function handleLogin() {
    if (isLogin) {
      handleSetToken('');
    }
    navigation.navigate('Login');
  }

  React.useEffect(() => {
    loadData();
    return;
  }, []);

  function NewsTab(props: any) {
    return <NewsScreen
      data={data}
      handleDeleteItem={handleDeleteItem}
      handleEditItem={handleEditItem}
      handleViewItem={handleViewItem}
      loadData={loadData}
      getDataById={getDataById}
      {...props}
    />;
  }

  function CreateNewsTab(props: any) {
    return <CreateNewsScreen
      handleCreateItem={handleCreateItem}
      getDataById={getDataById}
      showNotify={showNotify}
      data={updateData}
      {...props}
    />;
  }

  return (
    <>
      <Loading loading={loading} />
      {
        msg && (
          <Msg color={msg.type}>
            {msg.msg}
          </Msg>
        )
      }
      <BottomTab.Navigator
        initialRouteName="TabOne"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
        }}
      >
        <BottomTab.Screen
          name="TabOne"
          component={NewsTab}
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
              component={CreateNewsTab}
              options={{
                title: 'Create News',
                tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />,
              }}
              listeners={{
                tabPress: (e) => {
                  setUpdateData(null);
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
    isLogin: !!state.user.token
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleSetToken: (data: any) => {
      dispatch(setToken(data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabNavigator);