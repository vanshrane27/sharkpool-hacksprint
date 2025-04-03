import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface FormData {
  name: string;
  founder: string;
  cofounder: string;
  domain: string;
  description: string;
  askingInvestment: string;
  equity: string;
  pitchVideoLink: string;
  websiteLink: string;
  foundedYear: string;
  teamSize: string;
  location: string;
}

const HostStartupForm = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    founder: "",
    cofounder: "",
    domain: "",
    description: "",
    askingInvestment: "",
    equity: "",
    pitchVideoLink: "",
    websiteLink: "",
    foundedYear: "",
    teamSize: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to host a startup.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare data for submission
      const startupData = {
        ...formData,
        askingInvestment: parseFloat(formData.askingInvestment),
        equity: parseFloat(formData.equity),
        teamSize: formData.teamSize ? parseInt(formData.teamSize) : null,
        ownerId: currentUser.uid,
        ownerEmail: currentUser.email,
        createdAt: serverTimestamp(),
        pendingRequests: 0,
        approvedRequests: 0,
        totalInvestment: 0,
      };
      
      // Save to Firestore
      await addDoc(collection(db, "startup_data"), startupData);
      
      toast({
        title: "Startup Listed Successfully!",
        description: `${formData.name} has been successfully listed on Startup Nexus.`,
        duration: 5000,
      });
      
      // Redirect to dashboard
      navigate("/startup/dashboard");
    } catch (error: any) {
      console.error("Error hosting startup:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to host startup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Host Your Startup</CardTitle>
          <CardDescription>
            Fill in the details below to list your startup and connect with potential investors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Startup Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="domain">Domain/Industry</Label>
                <Input
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="founder">Founder Name</Label>
                <Input
                  id="founder"
                  name="founder"
                  value={formData.founder}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cofounder">Co-founder Name (Optional)</Label>
                <Input
                  id="cofounder"
                  name="cofounder"
                  value={formData.cofounder}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="askingInvestment">Investment Required (₹)</Label>
                <Input
                  id="askingInvestment"
                  name="askingInvestment"
                  type="number"
                  value={formData.askingInvestment}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="equity">Equity Offered (%)</Label>
                <Input
                  id="equity"
                  name="equity"
                  type="number"
                  value={formData.equity}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input
                  id="foundedYear"
                  name="foundedYear"
                  value={formData.foundedYear}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Input
                  id="teamSize"
                  name="teamSize"
                  type="number"
                  value={formData.teamSize}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="websiteLink">Website Link (Optional)</Label>
                <Input
                  id="websiteLink"
                  name="websiteLink"
                  type="url"
                  value={formData.websiteLink}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pitchVideoLink">Pitch Video Link (Optional)</Label>
                <Input
                  id="pitchVideoLink"
                  name="pitchVideoLink"
                  type="url"
                  value={formData.pitchVideoLink}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Startup Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="min-h-[100px]"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Hosting Startup..." : "Host Startup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HostStartupForm;
