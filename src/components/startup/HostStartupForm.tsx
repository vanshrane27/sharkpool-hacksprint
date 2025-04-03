
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const domains = [
  "Agriculture",
  "Education",
  "Healthcare",
  "Sustainable Energy",
  "Finance",
  "E-commerce",
  "Transportation",
  "Food & Beverage",
  "Manufacturing",
  "Technology",
  "AI & ML",
  "Blockchain",
  "Social Impact",
  "Real Estate",
  "Entertainment",
];

const HostStartupForm = () => {
  const { currentUser, userData } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    founder: userData?.displayName || "",
    cofounder: "",
    domain: "",
    askingInvestment: "",
    equity: "",
    description: "",
    pitchVideoLink: "",
    websiteLink: "",
    foundedYear: new Date().getFullYear().toString(),
    teamSize: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
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
      };
      
      // In a real implementation, this would save to Firestore
      // const docRef = await addDoc(collection(db, "startups"), startupData);
      
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
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Host Your Startup</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Organization Name*</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your startup name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="domain">Industry/Domain*</Label>
                    <Select 
                      value={formData.domain} 
                      onValueChange={handleSelectChange("domain")}
                      required
                    >
                      <SelectTrigger id="domain">
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent>
                        {domains.map((domain) => (
                          <SelectItem key={domain} value={domain}>
                            {domain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="founder">Founder Name*</Label>
                    <Input
                      id="founder"
                      name="founder"
                      value={formData.founder}
                      onChange={handleChange}
                      placeholder="Founder's full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cofounder">Co-Founder Name (if applicable)</Label>
                    <Input
                      id="cofounder"
                      name="cofounder"
                      value={formData.cofounder}
                      onChange={handleChange}
                      placeholder="Co-founder's full name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Startup Description*</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your startup, its mission, vision, and unique value proposition..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Investment Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="askingInvestment">Investment Amount (₹)*</Label>
                    <Input
                      id="askingInvestment"
                      name="askingInvestment"
                      type="number"
                      min="100000"
                      value={formData.askingInvestment}
                      onChange={handleChange}
                      placeholder="Amount in INR"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="equity">Equity Offered (%)*</Label>
                    <Input
                      id="equity"
                      name="equity"
                      type="number"
                      min="0.1"
                      max="100"
                      step="0.1"
                      value={formData.equity}
                      onChange={handleChange}
                      placeholder="Percentage of equity"
                      required
                    />
                  </div>
                </div>
                
                {formData.askingInvestment && formData.equity && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-sm text-gray-500">Calculated Valuation</div>
                    <div className="text-xl font-bold">
                      ₹{((parseFloat(formData.askingInvestment) / parseFloat(formData.equity)) * 100).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pitchVideoLink">Pitch Video Link</Label>
                    <Input
                      id="pitchVideoLink"
                      name="pitchVideoLink"
                      type="url"
                      value={formData.pitchVideoLink}
                      onChange={handleChange}
                      placeholder="YouTube or other video link"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="websiteLink">Company Website</Label>
                    <Input
                      id="websiteLink"
                      name="websiteLink"
                      type="url"
                      value={formData.websiteLink}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="foundedYear">Founded Year</Label>
                    <Input
                      id="foundedYear"
                      name="foundedYear"
                      type="number"
                      min="1990"
                      max={new Date().getFullYear()}
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
                      min="1"
                      value={formData.teamSize}
                      onChange={handleChange}
                      placeholder="Number of team members"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-india-saffron hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Host Your Startup"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HostStartupForm;
