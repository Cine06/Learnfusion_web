import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";

import AdminDashboard from "./components/AdminDashboard";
import AddUser from "./components/AddUser";
import AdminSectionManagement from "./components/AdminSectionManagement";
import AdminManageSection from "./components/AdminManageSection";
import AdminHandouts from "./components/AdminHandouts";
import Unauthorized from "./components/Unauthorized";

import TeacherDashboard from "./components/TeacherDashboard";
import Assessment from "./components/Assessment";
import Handouts from "./components/Handouts";
import SectionManagement from "./components/SectionManagement";
import ManageSection from "./components/ManageSection";
import AssignStudents from "./components/AssignStudents";
import Message from "./components/Messages";
import Report from "./components/Report";
import LessonDetails from "./components/LessonDetails";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import DetailedChatView from "./components/DetailedChatView";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<PrivateRoute requiredRole="Admin" />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/sectionmanage" element={<AdminSectionManagement />} />
          <Route path="/admin-manage-section/:sectionName" element={<AdminManageSection />} />
          <Route path="/admin-handouts" element={<AdminHandouts />} />
        </Route>

        <Route element={<PrivateRoute requiredRole="Teacher" />}>
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/handouts" element={<Handouts />} />
          <Route path="/section" element={<SectionManagement />} />
          <Route path="/manage-section/:sectionId" element={<ManageSection />} />
          <Route path="/assign-students/:sectionName" element={<AssignStudents />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/report/:sectionName/:lessonName" element={<Report />} />
          <Route path="/lesson/:id" element={<LessonDetails />} />
          <Route path="/messages/chat/:otherUserId" element={<DetailedChatView />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
