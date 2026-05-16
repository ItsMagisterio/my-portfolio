import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";
import { Seo } from "./components/seo/Seo";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const CopyrightPolicy = lazy(() => import("./pages/CopyrightPolicy"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <main className="min-h-screen bg-background" aria-label="Загрузка страницы">
    <div className="sr-only" role="status" aria-live="polite">
      Загрузка…
    </div>
  </main>
);

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Seo />
            <CustomCursor />
            <Preloader />
            <ScrollToTop />
            <Toaster />
            <Sonner />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/terms" element={<TermsOfUse />} />
                <Route path="/copyright" element={<CopyrightPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
