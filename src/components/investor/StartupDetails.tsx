import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface Startup {
  id: string;
  name: string;
  founder: string;
  cofounder?: string;
  domain: string;
  description: string;
  askingInvestment: number;
  equity: number;
  pitchVideoLink?: string;
  websiteLink?: string;
  foundedYear?: string;
  teamSize?: number;
  location?: string;
  ownerId: string;
  ownerEmail: string;
  createdAt: any;
  pendingRequests: number;
  approvedRequests: number;
  totalInvestment: number;
}

export const StartupDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [equityRequested, setEquityRequested] = useState("");
  const [dealValuation, setDealValuation] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStartupDetails = async () => {
      if (!id) return;

      try {
        const startupDoc = await getDoc(doc(db, "startup_data", id));
        if (startupDoc.exists()) {
          setStartup({ id: startupDoc.id, ...startupDoc.data() } as Startup);
        } else {
          toast({
            title: "Error",
            description: "Startup not found",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching startup details:", error);
        toast({
          title: "Error",
          description: "Failed to load startup details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStartupDetails();
  }, [id, toast]);

  useEffect(() => {
    if (investmentAmount && equityRequested) {
      const amount = parseFloat(investmentAmount);
      const equity = parseFloat(equityRequested);
      if (!isNaN(amount) && !isNaN(equity) && equity > 0) {
        setDealValuation((amount / equity) * 100);
      }
    }
  }, [investmentAmount, equityRequested]);

  if (loading) {
    return <div className="text-center py-10">Loading startup details...</div>;
  }

  if (!startup) {
    return <div className="text-center py-10">Startup not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-india-saffron/10 to-india-green/10">
          <CardTitle className="text-2xl">{startup.name}</CardTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge className="bg-india-saffron">{startup.domain}</Badge>
            {startup.location && (
              <span className="text-sm text-gray-500">📍 {startup.location}</span>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-600">{startup.description}</p>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Team</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Founder:</span> {startup.founder}</p>
                {startup.cofounder && (
                  <p><span className="font-medium">Co-founder:</span> {startup.cofounder}</p>
                )}
                {startup.teamSize && (
                  <p><span className="font-medium">Team Size:</span> {startup.teamSize} members</p>
                )}
              </div>

              {startup.foundedYear && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Founded</h3>
                  <p>{startup.foundedYear}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Investment Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500">Asking Investment</p>
                  <p className="text-2xl font-bold">₹{startup.askingInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Equity Offered</p>
                  <p className="text-2xl font-bold">{startup.equity}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Investment Raised</p>
                  <p className="text-2xl font-bold">₹{startup.totalInvestment.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Links</h3>
                <div className="space-y-2">
                  {startup.websiteLink && (
                    <a
                      href={startup.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:underline"
                    >
                      Website
                    </a>
                  )}
                  {startup.pitchVideoLink && (
                    <a
                      href={startup.pitchVideoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:underline"
                    >
                      Pitch Video
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-india-navy hover:bg-blue-900">
                  Make Investment Offer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make Investment Offer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="investmentAmount">Investment Amount (₹)</Label>
                    <Input
                      id="investmentAmount"
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <Label htmlFor="equityRequested">Equity Requested (%)</Label>
                    <Input
                      id="equityRequested"
                      type="number"
                      value={equityRequested}
                      onChange={(e) => setEquityRequested(e.target.value)}
                      placeholder="Enter equity percentage"
                    />
                  </div>
                  {dealValuation > 0 && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Deal Valuation</p>
                      <p className="text-xl font-bold">₹{dealValuation.toLocaleString()}</p>
                    </div>
                  )}
                  <Button className="w-full bg-india-navy hover:bg-blue-900">
                    Submit Offer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
