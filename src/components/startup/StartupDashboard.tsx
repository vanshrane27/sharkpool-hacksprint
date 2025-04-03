
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

interface HostedStartup {
  id: string;
  name: string;
  domain: string;
  askingInvestment: number;
  equity: number;
  createdAt: string;
  pendingRequests: number;
  approvedRequests: number;
  totalInvestment: number;
}

interface InvestmentRequest {
  id: string;
  startupId: string;
  startupName: string;
  investorName: string;
  investorId: string;
  amount: number;
  equity: number;
  status: "pending" | "approved" | "rejected";
  date: string;
}

const StartupDashboard = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState("startups");

  // Mock data for development purposes
  const mockStartups: HostedStartup[] = [
    {
      id: "1",
      name: "EcoSolutions India",
      domain: "Sustainable Energy",
      askingInvestment: 5000000,
      equity: 15,
      createdAt: "2023-01-15",
      pendingRequests: 2,
      approvedRequests: 1,
      totalInvestment: 2500000,
    },
    {
      id: "2",
      name: "AgriTech Innovations",
      domain: "Agriculture",
      askingInvestment: 3000000,
      equity: 12,
      createdAt: "2023-03-10",
      pendingRequests: 1,
      approvedRequests: 0,
      totalInvestment: 0,
    },
  ];

  const mockRequests: InvestmentRequest[] = [
    {
      id: "req1",
      startupId: "1",
      startupName: "EcoSolutions India",
      investorName: "Anand Mahindra",
      investorId: "inv1",
      amount: 2000000,
      equity: 8,
      status: "pending",
      date: "2023-04-02",
    },
    {
      id: "req2",
      startupId: "1",
      startupName: "EcoSolutions India",
      investorName: "Ratan Tata",
      investorId: "inv2",
      amount: 3000000,
      equity: 10,
      status: "pending",
      date: "2023-04-01",
    },
    {
      id: "req3",
      startupId: "1",
      startupName: "EcoSolutions India",
      investorName: "Mukesh Ambani",
      investorId: "inv3",
      amount: 2500000,
      equity: 7,
      status: "approved",
      date: "2023-03-15",
    },
    {
      id: "req4",
      startupId: "2",
      startupName: "AgriTech Innovations",
      investorName: "Kiran Mazumdar-Shaw",
      investorId: "inv4",
      amount: 1500000,
      equity: 6,
      status: "pending",
      date: "2023-03-28",
    },
  ];

  const pendingRequests = mockRequests.filter(
    (request) => request.status === "pending"
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Startup Dashboard</h1>
        <Link to="/startup/host">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Host New Startup
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="startups" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="startups">
            Your Startups
          </TabsTrigger>
          <TabsTrigger value="requests">
            Investment Requests
            {pendingRequests.length > 0 && (
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {pendingRequests.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="startups">
          {mockStartups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockStartups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          ) : (
            <EmptyStartupState />
          )}
        </TabsContent>
        
        <TabsContent value="requests">
          {mockRequests.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingRequests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
              
              {pendingRequests.length === 0 && (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">You have no pending investment requests.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">You have not received any investment requests yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StartupCard = ({ startup }: { startup: HostedStartup }) => {
  const fundingProgress = (startup.totalInvestment / startup.askingInvestment) * 100;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3 bg-gradient-to-r from-india-saffron/10 to-india-green/10">
        <CardTitle>{startup.name}</CardTitle>
        <CardDescription>
          <Badge className="bg-india-saffron">{startup.domain}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">Asking</p>
              <p className="font-semibold">₹{startup.askingInvestment.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Equity</p>
              <p className="font-semibold">{startup.equity}%</p>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm">
              <span>Funding Progress</span>
              <span>{fundingProgress.toFixed(0)}%</span>
            </div>
            <Progress className="h-2 mt-1" value={fundingProgress} />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">Pending Requests</p>
              <p className="font-semibold">{startup.pendingRequests}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Approved Deals</p>
              <p className="font-semibold">{startup.approvedRequests}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2"
          onClick={() => window.location.href = `/startup/manage/${startup.id}`}
        >
          Manage Startup
        </Button>
      </CardFooter>
    </Card>
  );
};

const RequestCard = ({ request }: { request: InvestmentRequest }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{request.startupName}</CardTitle>
        <CardDescription>from {request.investorName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">Investment Offer</p>
              <p className="font-semibold">₹{request.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Equity Request</p>
              <p className="font-semibold">{request.equity}%</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Valuation</p>
            <p className="font-semibold">
              ₹{((request.amount / request.equity) * 100).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Request Date</p>
            <p className="text-sm">{new Date(request.date).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" className="w-[48%]">
          Reject
        </Button>
        <Button variant="default" size="sm" className="w-[48%] bg-india-green hover:bg-green-700">
          Accept
        </Button>
      </CardFooter>
    </Card>
  );
};

const EmptyStartupState = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-12 text-center">
      <h3 className="text-xl font-semibold mb-2">You haven't hosted any startups yet</h3>
      <p className="text-gray-500 mb-6">
        Host your startup to connect with potential investors and raise funds.
      </p>
      <Link to="/startup/host">
        <Button className="bg-india-saffron hover:bg-orange-600">
          <Plus className="mr-2 h-4 w-4" /> Host Your Startup
        </Button>
      </Link>
    </div>
  );
};

export default StartupDashboard;
