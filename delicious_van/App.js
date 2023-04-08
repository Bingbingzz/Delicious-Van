import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from "react";
import Explore from './screens/explore/Explore';
import PostDetail from './screens/explore/PostDetail';
import PostEdit from './screens/explore/PostEdit';
import PostAdd from './screens/explore/PostAdd';
import Comments from './screens/me/Comments';
import Favorites from './screens/me/Favorites';
import UserProfile from './screens/me/UserProfile';
import Login from './screens/welcome/Login';
import SignUp from './screens/welcome/SignUp';
import Welcome from './screens/welcome/Welcome';
import BottomTab from './components/BottomTab';
import LocationPicker from './screens/explore/LocationPicker';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { auth } from "./firebase/firebase-setup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Provider } from 'react-native-paper';
import * as Notifications from "expo-notifications";
import colors from './colors';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
const AuthStack = (
  <>
    <Stack.Screen name="Welcome" component={Welcome} options={{
      headerShown: false,
    }} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </>
)

const AppStack = (
  <>
    <Stack.Screen
      name="BottomTab"
      component={BottomTab}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="Explore" component={Explore} />
    <Stack.Screen name="PostDetail" component={PostDetail} />
    <Stack.Screen name="PostAdd" component={PostAdd} />
    <Stack.Screen name="LocationPicker" component={LocationPicker} />
    <Stack.Screen name="PostEdit" component={PostEdit} />
    <Stack.Screen name="Comments" component={Comments} />
    <Stack.Screen name="Favorites" component={Favorites} />
    <Stack.Screen name="UserProfile" component={UserProfile} />
  </>
);
export default function App() {
  useEffect(() => {
    const subscrption = Notifications.addNotificationReceivedListener((notificaiton) => {
      console.log(notificaiton);
    });
    return subscrption.remove();
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); //when there is a valid user show app stack
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="BottomTab"
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.white,
            headerTitleStyle: { fontSize: 20 },
          }}
        >
          {/* {AppStack} */}
          {isAuthenticated ? AppStack : AuthStack}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({

});
