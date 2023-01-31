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
import { ColorSchemeName, Pressable } from 'react-native';

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

function BottomTabNavigator() {
  const [loading, setLoading] = React.useState<Boolean>();
  const [data, setData] = React.useState<[any]>();

  const colorScheme = useColorScheme();

  async function loadData() {
    setLoading(true);
    try {
      const res = await getItemsByPage();
      if (res?.data) {
        console.log(res?.data);
        setData(res?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteItem(id: String) {
    setLoading(true);
    const res = await deleteItem(id);
    if (res?.data?.deletedCount > 0) {
      loadData();
    } else {
      setLoading(true);
    }
  }

  async function handleCreateItem(props: any) {
    const { title, content, resetCreateForm } = props;
    setLoading(true);
    await createItem({
      title,
      content
    });
    resetCreateForm();
    setLoading(false);
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
