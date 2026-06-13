import { Routes, Route, Navigate } from 'react-router-dom';
import ThemeProvider from './components/ThemeProvider';
import { CleaningNotificationProvider } from './context/CleaningNotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import AdminRoute from './components/AdminRoute';
import GuestRoute from './components/GuestRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import AdminLogin from './pages/admin/Login';
import Onboarding from './pages/Onboarding';

import OwnerDashboard from './pages/owner/Dashboard';
import OwnerRooms from './pages/owner/Rooms';
import OwnerTenants from './pages/owner/Tenants';
import AddTenant from './pages/owner/AddTenant';
import OwnerPayments from './pages/owner/Payments';
import OwnerComplaints from './pages/owner/Complaints';
import OwnerStaff from './pages/owner/Staff';
import OwnerTenantDocuments from './pages/owner/TenantDocuments';

import TenantPortal from './pages/tenant/Portal';
import TenantRentHistory from './pages/tenant/RentHistory';
import TenantComplaints from './pages/tenant/Complaints';
import TenantOnboarding from './pages/tenant/Onboarding';
import TenantDocuments from './pages/tenant/Documents';

import StaffLogin from './pages/staff/Login';
import StaffDashboard from './pages/staff/Dashboard';
import StaffComplaints from './pages/staff/Complaints';

function ownerRoute(element) {
  return <AdminRoute>{element}</AdminRoute>;
}

function roleRoute(element, role) {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRole={role}>{element}</RoleRoute>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sample-pg" replace />} />
      <Route
        path="/:pgId/*"
        element={
          <ThemeProvider>
            <CleaningNotificationProvider>
            <Routes>
              <Route index element={<Landing />} />
              <Route path="login" element={<GuestRoute><Login /></GuestRoute>} />
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="staff/login" element={<StaffLogin />} />
              <Route
                path="onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />

              <Route path="owner/dashboard" element={ownerRoute(<OwnerDashboard />)} />
              <Route path="owner/rooms" element={ownerRoute(<OwnerRooms />)} />
              <Route path="owner/tenants" element={ownerRoute(<OwnerTenants />)} />
              <Route path="owner/add-tenant" element={ownerRoute(<AddTenant />)} />
              <Route path="owner/payments" element={ownerRoute(<OwnerPayments />)} />
              <Route path="owner/complaints" element={ownerRoute(<OwnerComplaints />)} />
              <Route path="owner/staff" element={ownerRoute(<OwnerStaff />)} />
              <Route path="owner/documents" element={ownerRoute(<OwnerTenantDocuments />)} />

              <Route path="tenant/portal" element={roleRoute(<TenantPortal />, 'tenant')} />
              <Route path="tenant/rent" element={roleRoute(<TenantRentHistory />, 'tenant')} />
              <Route path="tenant/complaints" element={roleRoute(<TenantComplaints />, 'tenant')} />
              <Route path="tenant/onboarding" element={roleRoute(<TenantOnboarding />, 'tenant')} />
              <Route path="tenant/documents" element={roleRoute(<TenantDocuments />, 'tenant')} />

              <Route path="staff/dashboard" element={roleRoute(<StaffDashboard />, 'staff')} />
              <Route path="staff/complaints" element={roleRoute(<StaffComplaints />, 'staff')} />
            </Routes>
            </CleaningNotificationProvider>
          </ThemeProvider>
        }
      />
    </Routes>
  );
}
