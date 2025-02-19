import React from "react";
import { Users, DollarSign, Heart } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stats-item");
      return res.data;
    },
  });


  const monthlyData = [
    { month: 'Jan', donations: 45, donors: 32 },
    { month: 'Feb', donations: 52, donors: 40 },
    { month: 'Mar', donations: 60, donors: 45 },
    { month: 'Apr', donations: 38, donors: 28 },
    { month: 'May', donations: 65, donors: 50 },
    { month: 'Jun', donations: 72, donors: 55 },
  ];

  const bloodTypeData = [
    { name: 'A+', value: 24 },
    { name: 'B+', value: 18 },
    { name: 'O+', value: 32 },
    { name: 'AB+', value: 8 },
    { name: 'A-', value: 6 },
    { name: 'B-', value: 4 },
  ];

  const COLORS = ['#dc2626', '#2563eb', '#16a34a', '#d97706', '#9333ea', '#059669'];

  return (
    <div className="p-6 space-y-6">
      <Card className="bg-gradient-to-r from-red-50 to-red-100">
        <CardHeader>
          <h1 className="text-3xl font-semibold text-center text-red-700">
            Welcome {user.displayName}
          </h1>
          <p className="text-center text-gray-600">
            Manage the blood donation process and track key statistics
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Total Donors</CardTitle>
            <Users className="text-blue-500 h-8 w-8" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-700">{stats?.users}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Total Funds</CardTitle>
            <DollarSign className="text-green-500 h-8 w-8" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-700">${stats?.totalPrice}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Donation Requests</CardTitle>
            <Heart className="text-red-500 h-8 w-8" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-700">{stats?.donors}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Monthly Donation Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="donations" 
                    name="Donations" 
                    fill="#dc2626" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="donors" 
                    name="Donors" 
                    fill="#2563eb" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Blood Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bloodTypeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {bloodTypeData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;