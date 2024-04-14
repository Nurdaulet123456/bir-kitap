import { StyleSheet, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../screens/Home"
import Icon from "@ant-design/react-native/lib/icon"
import { Services } from "../screens/Services"
import { CreatePostAndBook } from "../screens/CreatePostAndBook"
import { Search } from "../screens/Search"
import { Profile } from "../screens/Profile"

const Tab = createBottomTabNavigator()
export const TabNavigator = () => {
    const iconColor = (isFocused: boolean) => {
        if (isFocused) {
            return "#0A78D6"
        } else {
            return "rgba(10, 120, 214, 0.5)"
        }
    }

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { ...styles.tabbar, backgroundColor: "#fff" },
                tabBarHideOnKeyboard: true,
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Icon name="home" style={styles.tabIcon} color={iconColor(focused)} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Icon name="search" style={styles.tabIcon} color={iconColor(focused)} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="CreatePost"
                component={CreatePostAndBook}
                options={{
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Icon name="plus" style={styles.tabIcon} color={iconColor(focused)} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Services"
                component={Services}
                options={{
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Icon name="appstore" style={styles.tabIcon} color={iconColor(focused)} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Icon name="user" style={styles.tabIcon} color={iconColor(focused)} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabbar: {
        height: 71,
    },
    tabIcon: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 30,
        width: 30,
        verticalAlign: "middle",
        height: 71,
    },
})
