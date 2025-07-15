import { Tabs } from 'expo-router';
import Colors from '../../constant/Colors';
import * as SolidIcons from "react-native-heroicons/solid";
import * as OutlineIcons from "react-native-heroicons/outline";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.primary[500],
                    borderTopWidth: 0,
                    height: 88,
                    paddingTop: 8,
                    paddingBottom: 8,
                },
                tabBarActiveTintColor: Colors.neutro,
                tabBarInactiveTintColor: Colors.primary[200],
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Monitor',
                    tabBarIcon: ({ color, focused }) => (
                        focused ?
                            <SolidIcons.ShieldCheckIcon size={16} color={color} /> :
                            <OutlineIcons.ShieldCheckIcon size={16} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="streaming"
                options={{
                    title: 'Streaming',
                    tabBarIcon: ({ color, focused }) => (
                        focused ?
                            <SolidIcons.SignalIcon size={16} color={color} /> :
                            <OutlineIcons.SignalIcon size={16} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="resumen"
                options={{
                    title: 'Resumen',
                    tabBarIcon: ({ color, focused }) => (
                        focused ?
                            <SolidIcons.VideoCameraIcon size={16} color={color} /> :
                            <OutlineIcons.VideoCameraIcon size={16} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="proceso"
                options={{
                    title: 'Proceso',
                    tabBarIcon: ({ color, focused }) => (
                        focused ?
                            <SolidIcons.DocumentTextIcon size={16} color={color} /> :
                            <OutlineIcons.DocumentTextIcon size={16} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="encontrar"
                options={{
                    title: 'Encontrar',
                    tabBarIcon: ({ color, focused }) => (
                        focused ?
                            <SolidIcons.MapIcon size={16} color={color} /> :
                            <OutlineIcons.MapIcon size={16} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}