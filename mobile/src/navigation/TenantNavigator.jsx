import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PortalScreen from '../screens/tenant/PortalScreen';
import RentHistoryScreen from '../screens/tenant/RentHistoryScreen';
import TenantComplaintsScreen from '../screens/tenant/ComplaintsScreen';
import DocumentsScreen from '../screens/tenant/DocumentsScreen';
import AddressImportScreen from '../screens/tenant/AddressImportScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TenantTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4F46E5',
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home',
            Rent: 'receipt',
            Complaints: 'alert-circle',
            Documents: 'file-document',
          };
          return (
            <MaterialCommunityIcons name={icons[route.name] || 'circle'} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={PortalScreen} />
      <Tab.Screen name="Rent" component={RentHistoryScreen} />
      <Tab.Screen name="Complaints" component={TenantComplaintsScreen} />
      <Tab.Screen name="Documents" component={DocumentsScreen} />
    </Tab.Navigator>
  );
}

export default function TenantNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TenantTabs" component={TenantTabs} options={{ headerShown: false }} />
      <Stack.Screen name="AddressImport" component={AddressImportScreen} options={{ title: 'Import Address' }} />
    </Stack.Navigator>
  );
}
