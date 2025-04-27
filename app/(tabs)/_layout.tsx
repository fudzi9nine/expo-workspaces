import React from 'react';
import {Tabs} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import {COLORS} from '@/contstants/Styles';

interface TabScreenOption {
  tabBarIcon: ({color, size}: {color: string; size: number}) => React.ReactElement;
  tabBarLabel: string;
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: COLORS.PRIMARY, headerShown: false}}>
      <Tabs.Screen
        name="home"
        options={
          {
            tabBarIcon: ({color, size}) => <Ionicons name="home-outline" size={size} color={color} />,
            tabBarLabel: 'Home'
          } as TabScreenOption
        }
      />
      <Tabs.Screen
        name="explore"
        options={
          {
            tabBarIcon: ({color, size}) => <Ionicons name="search-outline" size={size} color={color} />,
            tabBarLabel: 'Explore'
          } as TabScreenOption
        }
      />
      <Tabs.Screen
        name="progress"
        options={
          {
            tabBarIcon: ({color, size}) => <Ionicons name="analytics-outline" size={size} color={color} />,
            tabBarLabel: 'Progress'
          } as TabScreenOption
        }
      />
      <Tabs.Screen
        name="profile"
        options={
          {
            tabBarIcon: ({color, size}) => <Ionicons name="person-circle-outline" size={size} color={color} />,
            tabBarLabel: 'Profile'
          } as TabScreenOption
        }
      />
    </Tabs>
  );
}
