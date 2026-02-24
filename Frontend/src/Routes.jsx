import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import HomePage from "./pages/home-page";
import TypingTestInterface from "./pages/typing-test-interface";
import NotFound from "./pages/NotFound";
import MPSCSkillTestFlow from "./pages/mpsc-skill-test-flow";
import MockExamModule from "./pages/mock-exam-module";
import TypingPlayground from "./pages/typing-playground";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RegistrationForm from "./pages/RegistrationForm";
import FormsPage from "./pages/forms";
import TermsAndConditions from "./pages/TermsAndConditions";
import AdminPanel from "./pages/admin-panel";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/forms" element={<FormsPage />} />
        <Route path="/admin-panel" element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        } />
        <Route path="/typing-test-interface" element={
          <ProtectedRoute>
            <TypingTestInterface />
          </ProtectedRoute>
        } />
        <Route path="/mpsc-skill-test-flow" element={
          <ProtectedRoute>
            <MPSCSkillTestFlow />
          </ProtectedRoute>
        } />
        <Route path="/mock-exam-module" element={
          <ProtectedRoute>
            <MockExamModule />
          </ProtectedRoute>
        } />
        <Route path="/typing-playground" element={
          <ProtectedRoute>
            <TypingPlayground />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
