import DashboardNavbarContent from "@/components/dashboard-navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <DashboardNavbarContent />
      {children}
    </div>
  );
};

export default DashboardLayout;
