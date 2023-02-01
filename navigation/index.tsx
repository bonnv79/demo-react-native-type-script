/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
// import TabOneScreen from '../screens/TabOneScreen';
// import TabTwoScreen from '../screens/TabTwoScreen';
import NewsScreen from '../screens/NewsScreen';
import CreateNewsScreen from '../screens/CreateNewsScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { createItem, deleteItem, getItemsByPage } from '../services/api';
import Loading from '../components/Loading';
import styled from 'styled-components/native';
import { hasError } from '../utils';
import Constants from 'expo-constants';

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

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

let timeOut: any = null;

function BottomTabNavigator() {
  const [loading, setLoading] = React.useState<Boolean>();
  const [data, setData] = React.useState<[any]>();
  const [msg, setMsg] = React.useState<any>(null);

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
    const { title, content, creator = 'admin', status = 0, resetCreateForm } = props;
    setLoading(true);
    const res = await createItem({
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
    resetCreateForm();
    showNotify('Create successfully');
  }

  React.useEffect(() => {
    loadData();
    return;
  }, []);

  function NewsTab() {
    return <NewsScreen data={data} handleDeleteItem={handleDeleteItem} />;
  }

  function CreateNewsTab() {
    return <CreateNewsScreen handleCreateItem={handleCreateItem} />;
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
            title: 'News',
            tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />,
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Modal')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                {/* <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              /> */}
              </Pressable>
            ),
          })}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              // e.preventDefault();
              loadData();
            },
          }}
        />
        <BottomTab.Screen
          name="TabTwo"
          component={CreateNewsTab}
          options={{
            title: 'Create News',
            tabBarIcon: ({ color }) => <TabBarIcon name="plus-circle" color={color} />,
          }}
        />
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
