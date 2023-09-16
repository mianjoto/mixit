import { DashboardRootLayout } from "@/components/dashboard";
import DashboardNavbarContent from "@/components/dashboard-navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <DashboardNavbarContent />
      <DashboardRootLayout>{children}</DashboardRootLayout>
    </div>
  );
};

export default DashboardLayout;
