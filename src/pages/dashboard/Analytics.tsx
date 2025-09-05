import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard";
import { motion } from "framer-motion";

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            Analytics Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-2"
          >
            Track performance, analyze trends, and optimize your support operations
          </motion.p>
        </div>
        
        <AnalyticsDashboard />
      </div>
    </DashboardLayout>
  );
}