import DashboardNavbarContent from "@/components/dashboard-navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardNavbarContent />
      {children}
    </>
  );
};

export default DashboardLayout;
