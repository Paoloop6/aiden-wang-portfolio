import { Switch, Route, Router } from "wouter";
import { useState, useEffect, useCallback } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PlantAIPage from "@/pages/plantai";

function useHashLocation(): [string, (to: string, opts?: { replace?: boolean }) => void] {
  const getHash = () => {
    const hash = window.location.hash.replace(/^#/, "");
    return hash || "/";
  };
  const [loc, setLoc] = useState(getHash);

  useEffect(() => {
    const handler = () => setLoc(getHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    if (opts?.replace) {
      window.location.replace("#" + to);
    } else {
      window.location.hash = to;
    }
  }, []);

  return [loc, navigate];
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/plantai" component={PlantAIPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router hook={useHashLocation}>
          <AppRouter />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
