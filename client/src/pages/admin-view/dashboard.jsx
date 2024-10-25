import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaChartBar, FaUser, FaShoppingCart, FaCog } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Dialog } from '@/components/ui/dialog';

const sampleData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Function to handle overview button click
  const handleOverviewClick = () => {
    setActiveTab('overview');
    console.log('Overview section active');
  };

  // Function to handle sales chart button click
  const handleSalesChartClick = () => {
    setActiveTab('chart');
    console.log('Sales chart displayed');
  };

  // Function to handle settings button click
  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
    console.log('Settings modal opened');
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FaChartBar className="text-4xl text-blue-500 mr-4" />
              <div>
                <p className="text-lg font-medium text-gray-800">Total Sales</p>
                <p className="text-2xl font-semibold text-gray-900">$45,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FaUser className="text-4xl text-green-500 mr-4" />
              <div>
                <p className="text-lg font-medium text-gray-800">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">1,250</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FaShoppingCart className="text-4xl text-red-500 mr-4" />
              <div>
                <p className="text-lg font-medium text-gray-800">Pending Orders</p>
                <p className="text-2xl font-semibold text-gray-900">30</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <Button
              onClick={handleOverviewClick}
              className={`py-2 px-4 ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Overview
            </Button>
            <Button
              onClick={handleSalesChartClick}
              className={`py-2 px-4 ${activeTab === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Sales Chart
            </Button>
          </div>
          {activeTab === 'overview' ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-09-17</TableCell>
                    <TableCell>User John Doe registered</TableCell>
                    <TableCell>Success</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-09-16</TableCell>
                    <TableCell>Order #12345 processed</TableCell>
                    <TableCell>Success</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="h-64">
              <LineChart
                width={600}
                height={300}
                data={sampleData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <Button
          onClick={handleSettingsClick}
          className="bg-gray-800 text-white hover:bg-gray-900"
        >
          <FaCog className="mr-2" /> Settings
        </Button>
      </div>

      {/* Settings Modal */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Settings</h2>
          {/* Settings content */}
          <p>Settings content goes here.</p>
          <div className="flex justify-end">
            <Button
              onClick={() => setIsSettingsOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AdminDashboard;
