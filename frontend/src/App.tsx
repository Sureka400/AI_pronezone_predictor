import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AlertSystem } from "./components/AlertSystem";
import { DashboardPage } from "./pages/DashboardPage";
import { ForecastingPage } from "./pages/ForecastingPage";
import { ExplainabilityPage } from "./pages/ExplainabilityPage";
import { ComparisonPage } from "./pages/ComparisonPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ReportsPage } from "./pages/ReportsPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HeroSection onNavigate={setCurrentPage} />;
      case "forecasting":
        return <ForecastingPage />;
      case "explainability":
        return <ExplainabilityPage />;
      case "map":
        return <DashboardPage />;
      case "compare":
        return <ComparisonPage />;
      case "alerts":
        return <AlertSystem />;
      case "history":
        return <HistoryPage />;
      case "reports":
        return <ReportsPage />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="relative min-h-screen">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="pt-20 min-h-screen">
        {renderPage()}
      </main>
    </div>
  );
}
