import DashboardNavbarContent from "@/components/sections/DashboardNavbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardNavbarContent />
      {children}
    </>
  );
};

export default DashboardLayout;
