import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import OwnerDashboardScreen from '../screens/owner/DashboardScreen';
import RoomsScreen from '../screens/owner/RoomsScreen';
import AddRoomScreen from '../screens/owner/AddRoomScreen';
import TenantsScreen from '../screens/owner/TenantsScreen';
import AddTenantScreen from '../screens/owner/AddTenantScreen';
import PaymentsScreen from '../screens/owner/PaymentsScreen';
import CreatePaymentScreen from '../screens/owner/CreatePaymentScreen';
import OwnerComplaintsScreen from '../screens/owner/ComplaintsScreen';
import StaffScreen from '../screens/owner/StaffScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function OwnerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4F46E5',
        headerStyle: { backgroundColor: '#fff' },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Dashboard: 'view-dashboard',
            Rooms: 'door',
            Tenants: 'account-group',
            Payments: 'cash',
            Complaints: 'alert-circle',
          };
          return (
            <MaterialCommunityIcons name={icons[route.name] || 'circle'} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={OwnerDashboardScreen} />
      <Tab.Screen name="Rooms" component={RoomsScreen} />
      <Tab.Screen name="Tenants" component={TenantsScreen} />
      <Tab.Screen name="Payments" component={PaymentsScreen} />
      <Tab.Screen name="Complaints" component={OwnerComplaintsScreen} />
    </Tab.Navigator>
  );
}

export default function OwnerNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OwnerTabs" component={OwnerTabs} options={{ headerShown: false }} />
      <Stack.Screen name="AddRoom" component={AddRoomScreen} options={{ title: 'Add Room' }} />
      <Stack.Screen name="AddTenant" component={AddTenantScreen} options={{ title: 'Assign Tenant' }} />
      <Stack.Screen name="CreatePayment" component={CreatePaymentScreen} options={{ title: 'Custom Payment' }} />
      <Stack.Screen name="Staff" component={StaffScreen} options={{ title: 'Staff' }} />
    </Stack.Navigator>
  );
}
