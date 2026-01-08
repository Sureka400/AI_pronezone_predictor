import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { Footer } from "./components/Footer";
import { RiskMap } from "./components/RiskMap";
import { AlertSystem } from "./components/AlertSystem";
import { DashboardPage } from "./pages/DashboardPage";
import { ForecastingPage } from "./pages/ForecastingPage";
import { ExplainabilityPage } from "./pages/ExplainabilityPage";
import { ComparisonPage } from "./pages/ComparisonPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ReportsPage } from "./pages/ReportsPage";
import { AccessPage } from "./pages/AccessPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HeroSection />;
      case "dashboard":
        return <DashboardPage />;
      case "forecasting":
        return <ForecastingPage />;
      case "explainability":
        return <ExplainabilityPage />;
      case "map":
        return <RiskMap />;
      case "compare":
        return <ComparisonPage />;
      case "alerts":
        return <AlertSystem />;
      case "history":
        return <HistoryPage />;
      case "reports":
        return <ReportsPage />;
      case "access":
        return <AccessPage />;
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
      
      <Footer />
    </div>
  );
}
