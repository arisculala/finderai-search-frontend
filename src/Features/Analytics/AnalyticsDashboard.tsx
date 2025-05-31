import Breadcrumbs from "../Components/BreadCrumbs/BreadCrumbs";
import MainContent from "../Structural/MainContent/MainContent";
import Navbar from "../Structural/Navbar/Navbar";
import Sidebar from "../Structural/Sidebar/Sidebar";
import { BREADCRUMBS } from "@/App/Consts";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
      <Navbar />
        <Breadcrumbs breadcrumbs={BREADCRUMBS.ANALYTICS} />
        <MainContent>
          This is analytics main content.
        </MainContent>
      </div>
    </div>
  );
}
