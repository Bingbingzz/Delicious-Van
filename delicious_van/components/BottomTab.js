import PressableButton from './PressableButton';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import Explore from '../screens/explore/Explore';
import PostAdd from '../screens/explore/PostAdd';
import UserProfile from '../screens/me/UserProfile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../colors';

const Tab = createBottomTabNavigator();

const BottomTab = ({ navigation }) => {
    let iconName;
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Explore') {
                        iconName = 'explore';
                    } else if (route.name === 'PostAdd') {
                        iconName = 'add';
                        size = 40;
                        color = colors.primary;
                    } else if (route.name === 'UserProfile') {
                        iconName = 'person-outline';
                    }

                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.background,
                tabBarStyle: {
                    display: 'flex',
                    backgroundColor: colors.background,
                },
                activeTintColor: colors.primary,
                inactiveTintColor: colors.grey,
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTitleAlign: 'center',
                headerTintColor: colors.white,
                headerRight: () => (
                    <PressableButton
                        buttonPressed={() => {
                            iconPressed(navigation);
                        }}
                    >
                        <Ionicons icon={iconName} size={24} color="black" />
                    </PressableButton>
                ),
            })}
        >
            <Tab.Screen name="Explore" component={Explore} />
            <Tab.Screen
                name="PostAdd"
                component={PostAdd}
                options={{ title: 'Write a Post' }}
            />

            <Tab.Screen name="UserProfile"
                component={UserProfile}
                options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
};
export default BottomTab;
