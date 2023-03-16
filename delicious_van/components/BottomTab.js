import PressableButton from './PressableButton';
import { IonIcon } from '@ionic/react';
import React from 'react';
import Explore from '../screens/explore/Explore';
import RestaurantCategory from '../screens/restaurant/RestaurantCategory';
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
                        iconName = 'compass-outline';
                    } else if (route.name === 'RestaurantCategory') {
                        iconName = 'restaurant-outline';
                    } else if (route.name === 'UserProfile') {
                        iconName = 'person-outline';
                    }

                    return <IonIcon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.white,
                tabBarInactiveTintColor: colors.background,
                tabBarStyle: {
                    display: 'flex',
                    backgroundColor: colors.buttonBackground,
                },
                activeTintColor: colors.white,
                inactiveTintColor: colors.grey,
                headerStyle: {
                    backgroundColor: colors.buttonBackground,
                },
                headerTitleAlign: 'center',
                headerTintColor: colors.white,
                headerRight: () => (
                    <PressableButton
                        buttonPressed={() => {
                            iconPressed(navigation);
                        }}
                    >
                        <IonIcon icon={iconName} size={24} color="black" />
                    </PressableButton>
                ),
            })}
        >
            <Tab.Screen name="Explore" component={Explore} />
            <Tab.Screen name="RestaurantCategory" component={RestaurantCategory} />
            <Tab.Screen name="UserProfile" component={UserProfile} />
        </Tab.Navigator>
    );
};

function iconPressed(navigation) {
    navigation.navigate('PostEdit');
}

export default BottomTab;
