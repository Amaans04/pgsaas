import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StaffDashboardScreen from '../screens/staff/DashboardScreen';
import StaffComplaintsScreen from '../screens/staff/ComplaintsScreen';

const Tab = createBottomTabNavigator();

export default function StaffNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4F46E5',
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Dashboard: 'view-dashboard',
            Complaints: 'alert-circle',
          };
          return (
            <MaterialCommunityIcons name={icons[route.name] || 'circle'} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={StaffDashboardScreen} />
      <Tab.Screen name="Complaints" component={StaffComplaintsScreen} />
    </Tab.Navigator>
  );
}
