import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const ticketData = [
  { name: "Mon", resolved: 12, created: 15 },
  { name: "Tue", resolved: 19, created: 22 },
  { name: "Wed", resolved: 8, created: 11 },
  { name: "Thu", resolved: 25, created: 20 },
  { name: "Fri", resolved: 32, created: 28 },
  { name: "Sat", resolved: 18, created: 14 },
  { name: "Sun", resolved: 15, created: 12 },
];

const responseTimeData = [
  { time: "00:00", minutes: 2.4 },
  { time: "04:00", minutes: 1.8 },
  { time: "08:00", minutes: 3.2 },
  { time: "12:00", minutes: 2.1 },
  { time: "16:00", minutes: 1.5 },
  { time: "20:00", minutes: 2.8 },
];

const satisfactionData = [
  { name: "Excellent", value: 65, color: "#10B981" },
  { name: "Good", value: 28, color: "#3B82F6" },
  { name: "Average", value: 5, color: "#F59E0B" },
  { name: "Poor", value: 2, color: "#EF4444" },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold">
            Analytics
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground mt-2">
            Performance insights and customer support metrics
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Resolution</CardTitle>
              <CardDescription>Daily ticket creation vs resolution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ticketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="created" fill="hsl(var(--primary))" />
                  <Bar dataKey="resolved" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Time Trend</CardTitle>
              <CardDescription>Average response time throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="minutes" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction</CardTitle>
              <CardDescription>Rating distribution from customer feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
              <CardDescription>Important performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">First Response Time</span>
                <span className="font-semibold">1.2 minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Resolution Rate</span>
                <span className="font-semibold">94.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Customer Satisfaction</span>
                <span className="font-semibold">4.8/5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">AI Accuracy</span>
                <span className="font-semibold">96.2%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}