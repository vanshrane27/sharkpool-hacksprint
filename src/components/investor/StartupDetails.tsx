
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
}

const StartupDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [equityOffer, setEquityOffer] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        if (!id) return;
        
        const startupDoc = doc(db, "startups", id);
        const startupSnapshot = await getDoc(startupDoc);
        
        if (startupSnapshot.exists()) {
          setStartup({
            id: startupSnapshot.id,
            ...startupSnapshot.data(),
          } as Startup);
        } else {
          // Use mock data for development
          const mockStartup: Startup = {
            id: "1",
            name: "EcoSolutions India",
            founder: "Rajesh Kumar",
            cofounder: "Anita Desai",
            domain: "Sustainable Energy",
            description: "EcoSolutions India is developing affordable solar solutions for rural India. Our innovative approach combines low-cost materials with efficient design to create solar products that are accessible to the masses. We aim to bring clean energy to 1 million rural households by 2025.",
            askingInvestment: 5000000,
            equity: 15,
            pitchVideoLink: "https://www.youtube.com/watch?v=example",
            websiteLink: "https://ecosolutionsindia.com",
            foundedYear: "2022",
            teamSize: 12,
            location: "Bangalore, Karnataka"
          };
          setStartup(mockStartup);
        }
      } catch (error) {
        console.error("Error fetching startup details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartupDetails();
  }, [id]);

  const handleInvestmentSubmit = async () => {
    if (!currentUser || !startup) return;
    
    try {
      // In a real implementation, this would save to Firestore
      // For now, just show toast
      toast({
        title: "Investment Request Submitted!",
        description: `You've offered ₹${parseInt(investmentAmount).toLocaleString()} for ${equityOffer}% equity in ${startup.name}.`,
        duration: 5000,
      });
      
      setIsDialogOpen(false);
      
      // Reset form
      setEquityOffer("");
      setInvestmentAmount("");
    } catch (error) {
      console.error("Error submitting investment request:", error);
      toast({
        title: "Error",
        description: "Failed to submit investment request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const calculateValuation = () => {
    if (!equityOffer || !investmentAmount) return "0";
    
    const equity = parseFloat(equityOffer);
    const investment = parseFloat(investmentAmount);
    
    if (equity <= 0 || investment <= 0) return "0";
    
    const valuation = (investment / equity) * 100;
    return valuation.toLocaleString();
  };

  if (loading) {
    return <div className="container mx-auto py-16 text-center">Loading startup details...</div>;
  }

  if (!startup) {
    return <div className="container mx-auto py-16 text-center">Startup not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{startup.name}</h1>
          <p className="text-gray-600">{startup.domain} | Founded: {startup.foundedYear || "N/A"} | {startup.location || "India"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-line">{startup.description}</p>
              
              {startup.pitchVideoLink && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Pitch Video</h3>
                  <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-md">
                    <a 
                      href={startup.pitchVideoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-india-navy hover:underline"
                    >
                      Watch Pitch Video
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Asking Investment</p>
                  <p className="font-bold text-2xl">₹{startup.askingInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Equity Offered</p>
                  <p className="font-bold text-2xl">{startup.equity}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Valuation</p>
                  <p className="font-bold text-2xl">
                    ₹{((startup.askingInvestment / startup.equity) * 100).toLocaleString()}
                  </p>
                </div>
                <Separator />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-india-green hover:bg-green-700">Invest Now</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Make an Investment Offer</DialogTitle>
                      <DialogDescription>
                        Send your investment proposal to {startup.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="investment">Investment Amount (₹)</Label>
                        <Input
                          id="investment"
                          type="number"
                          placeholder="Enter amount in INR"
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="equity">Equity Requested (%)</Label>
                        <Input
                          id="equity"
                          type="number"
                          min="0.1"
                          max="100"
                          step="0.1"
                          placeholder="Enter equity percentage"
                          value={equityOffer}
                          onChange={(e) => setEquityOffer(e.target.value)}
                        />
                      </div>
                      <div className="pt-2">
                        <Label>Deal Valuation</Label>
                        <p className="text-xl font-bold">₹{calculateValuation()}</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        onClick={handleInvestmentSubmit}
                        disabled={!equityOffer || !investmentAmount}
                      >
                        Submit Offer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Founder</h3>
                  <p>{startup.founder}</p>
                </div>
                {startup.cofounder && (
                  <div>
                    <h3 className="font-semibold text-lg">Co-Founder</h3>
                    <p>{startup.cofounder}</p>
                  </div>
                )}
                {startup.teamSize && (
                  <div>
                    <h3 className="font-semibold text-lg">Team Size</h3>
                    <p>{startup.teamSize} members</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {startup.websiteLink && (
                  <div>
                    <h3 className="font-semibold text-lg">Website</h3>
                    <a
                      href={startup.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-india-navy hover:underline"
                    >
                      {startup.websiteLink}
                    </a>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">Industry</h3>
                  <Badge className="mt-1 bg-india-saffron">{startup.domain}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StartupDetails;
