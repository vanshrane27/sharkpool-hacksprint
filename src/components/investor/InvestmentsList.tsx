import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Investment {
  id: string;
  startupId: string;
  startupName: string;
  amount: number;
  equity: number;
  status: "pending" | "approved" | "rejected";
  date: string;
  startupDomain: string;
}

const InvestmentsList = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState("pending");

  // Mock data for development purposes
  const mockInvestments: Investment[] = [
    {
      id: "inv1",
      startupId: "1",
      startupName: "EcoSolutions India",
      amount: 3000000,
      equity: 10,
      status: "pending",
      date: "2023-04-01",
      startupDomain: "Sustainable Energy",
    },
    {
      id: "inv2",
      startupId: "2",
      startupName: "MedTech Innovations",
      amount: 5000000,
      equity: 15,
      status: "approved",
      date: "2023-03-15",
      startupDomain: "Healthcare",
    },
    {
      id: "inv3",
      startupId: "3",
      startupName: "AgriConnect",
      amount: 2000000,
      equity: 8,
      status: "rejected",
      date: "2023-02-28",
      startupDomain: "Agriculture",
    },
    {
      id: "inv4",
      startupId: "4",
      startupName: "FinTech Solutions",
      amount: 7500000,
      equity: 20,
      status: "pending",
      date: "2023-04-05",
      startupDomain: "Finance",
    },
  ];

  const pendingInvestments = mockInvestments.filter(
    (investment) => investment.status === "pending"
  );
  
  const approvedInvestments = mockInvestments.filter(
    (investment) => investment.status === "approved"
  );
  
  const rejectedInvestments = mockInvestments.filter(
    (investment) => investment.status === "rejected"
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "approved":
        return <Badge className="bg-india-green">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Investments</h1>
      
      <Tabs defaultValue="pending" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="pending">
            Pending
            {pendingInvestments.length > 0 && (
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {pendingInvestments.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved
            {approvedInvestments.length > 0 && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {approvedInvestments.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            {rejectedInvestments.length > 0 && (
              <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {rejectedInvestments.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          {pendingInvestments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingInvestments.map((investment) => (
                <InvestmentCard key={investment.id} investment={investment} />
              ))}
            </div>
          ) : (
            <EmptyState message="You don't have any pending investment requests." />
          )}
        </TabsContent>
        
        <TabsContent value="approved">
          {approvedInvestments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedInvestments.map((investment) => (
                <InvestmentCard key={investment.id} investment={investment} />
              ))}
            </div>
          ) : (
            <EmptyState message="You don't have any approved investments yet." />
          )}
        </TabsContent>
        
        <TabsContent value="rejected">
          {rejectedInvestments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rejectedInvestments.map((investment) => (
                <InvestmentCard key={investment.id} investment={investment} />
              ))}
            </div>
          ) : (
            <EmptyState message="You don't have any rejected investment requests." />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const InvestmentCard = ({ investment }: { investment: Investment }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{investment.startupName}</CardTitle>
            <CardDescription>{investment.startupDomain}</CardDescription>
          </div>
          {getStatusBadge(investment.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-sm text-gray-500">Investment</span>
              <p className="font-semibold">₹{investment.amount.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Equity</span>
              <p className="font-semibold">{investment.equity}%</p>
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-500">Valuation</span>
            <p className="font-semibold">
              ₹{((investment.amount / investment.equity) * 100).toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Request Date</span>
            <p className="font-semibold">{new Date(investment.date).toLocaleDateString()}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => window.location.href = `/investor/startup/${investment.startupId}`}
          >
            View Startup
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-8 text-center">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default InvestmentsList;
