import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/home-page";
import TypingTestInterface from "./pages/typing-test-interface";
import NotFound from "./pages/NotFound";
import MPSCSkillTestFlow from "./pages/mpsc-skill-test-flow";
import MockExamModule from "./pages/mock-exam-module";
import TypingPlayground from "./pages/typing-playground";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/typing-test-interface" element={<TypingTestInterface />} />
        <Route path="/mpsc-skill-test-flow" element={<MPSCSkillTestFlow />} />
        <Route path="/mock-exam-module" element={<MockExamModule />} />
        <Route path="/typing-playground" element={<TypingPlayground />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;