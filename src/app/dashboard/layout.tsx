import { Session } from "next-auth";

import { DashboardRootLayout } from "@/components/dashboard";
import DashboardNavbarContent from "@/components/dashboard-navbar";
import { NextAuthSessionProvider } from "@/providers/next-auth-session-provider";

const DashboardLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) => {
  return (
    <NextAuthSessionProvider session={session}>
      <div className="flex flex-col lg:flex-row">
        <DashboardNavbarContent />
        <DashboardRootLayout>{children}</DashboardRootLayout>
      </div>
    </NextAuthSessionProvider>
  );
};

export default DashboardLayout;
