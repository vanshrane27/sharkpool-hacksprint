import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface HostedStartup {
  id: string;
  name: string;
  domain: string;
  askingInvestment: number;
  equity: number;
  createdAt: any;
  pendingRequests: number;
  approvedRequests: number;
  totalInvestment: number;
  ownerId: string;
  description: string;
  founder: string;
  cofounder?: string;
  pitchVideoLink?: string;
  websiteLink?: string;
  foundedYear?: string;
  teamSize?: number;
  location?: string;
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
  date: any;
}

export const StartupDashboard = () => {
  const { userData, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("startups");
  const [startups, setStartups] = useState<HostedStartup[]>([]);
  const [requests, setRequests] = useState<InvestmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStartupData = async () => {
      if (!currentUser) return;

      try {
        // Fetch startups owned by the current user
        const startupsQuery = query(
          collection(db, "startup_data"),
          where("ownerId", "==", currentUser.uid)
        );
        const startupsSnapshot = await getDocs(startupsQuery);
        const startupsList = startupsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as HostedStartup[];

        // Fetch investment requests for these startups
        const requestsQuery = query(
          collection(db, "investment_requests"),
          where("startupId", "in", startupsList.map(s => s.id))
        );
        const requestsSnapshot = await getDocs(requestsQuery);
        const requestsList = requestsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as InvestmentRequest[];

        // Update startup data with request counts
        const updatedStartups = startupsList.map(startup => {
          const startupRequests = requestsList.filter(req => req.startupId === startup.id);
          return {
            ...startup,
            pendingRequests: startupRequests.filter(req => req.status === "pending").length,
            approvedRequests: startupRequests.filter(req => req.status === "approved").length,
            totalInvestment: startupRequests
              .filter(req => req.status === "approved")
              .reduce((sum, req) => sum + req.amount, 0),
          };
        });

        setStartups(updatedStartups);
        setRequests(requestsList);
      } catch (error) {
        console.error("Error fetching startup data:", error);
        toast({
          title: "Error",
          description: "Failed to load startup data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStartupData();
  }, [currentUser, toast]);

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  );

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

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
          {startups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {startups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          ) : (
            <EmptyStartupState />
          )}
        </TabsContent>
        
        <TabsContent value="requests">
          {requests.length > 0 ? (
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
        <div className="mt-1">
          <Badge className="bg-india-saffron">{startup.domain}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-sm text-gray-500">Asking</span>
              <p className="font-semibold">₹{startup.askingInvestment.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Equity</span>
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
              <span className="text-sm text-gray-500">Pending Requests</span>
              <p className="font-semibold">{startup.pendingRequests}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Approved Deals</span>
              <p className="font-semibold">{startup.approvedRequests}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
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
              <span className="text-sm text-gray-500">Investment Offer</span>
              <p className="font-semibold">₹{request.amount.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Equity Request</span>
              <p className="font-semibold">{request.equity}%</p>
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-500">Valuation</span>
            <p className="font-semibold">
              ₹{((request.amount / request.equity) * 100).toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Request Date</span>
            <p className="text-sm">{new Date(request.date?.toDate()).toLocaleDateString()}</p>
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
