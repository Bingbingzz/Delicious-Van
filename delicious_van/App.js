import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Explore from './screens/explore/Explore';
import PostDetail from './screens/explore/PostDetail';
import PostEdit from './screens/explore/PostEdit';
import Comments from './screens/me/Comments';
import Favorites from './screens/me/Favorites';
import UserProfile from './screens/me/UserProfile';
import RestaurantCategory from './screens/restaurant/RestaurantCategory';
import Login from './screens/welcome/Login';
import SignUp from './screens/welcome/SignUp';
import Welcome from './screens/welcome/Welcome';
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { KeyboardTrackingView, KeyboardAwareInsetsView, KeyboardRegistry, KeyboardAccessoryView, KeyboardUtils } from 'react-native-ui-lib/keyboard';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { auth } from "./Firebase/firebase-setup";
import colors from './colors';
const AuthStack = (
  <>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </>
)

const AppStack = (
  <>
    <Stack.Screen name="Explore" component={Explore} />
    <Stack.Screen name="PostDetail" component={PostDetail} />
    <Stack.Screen name="PostEdit" component={PostEdit} />
    <Stack.Screen name="Comments" component={Comments} />
    <Stack.Screen name="Favorites" component={Favorites} />
    <Stack.Screen name="UserProfile" component={UserProfile} />
    <Stack.Screen name="RestaurantCategory" component={RestaurantCategory} />
    <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
    <Stack.Screen name="RestaurantProfile" component={RestaurantProfile} />

  </>
);
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: colors.secondary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontSize: 20 },
        }}
      >
        {isAuthenticated ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
