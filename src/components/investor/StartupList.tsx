import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

export const StartupList = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const startupCollection = collection(db, "startup_data");
        const startupSnapshot = await getDocs(startupCollection);
        const startupList = startupSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Startup[];
        
        setStartups(startupList);
        setFilteredStartups(startupList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching startups:", error);
        toast({
          title: "Error",
          description: "Failed to load startups. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchStartups();
  }, [toast]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = startups.filter(
        startup =>
          startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          startup.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
          startup.founder.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (startup.cofounder && startup.cofounder.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredStartups(filtered);
    } else {
      setFilteredStartups(startups);
    }
  }, [searchTerm, startups]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discover Startups</h1>
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search startups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading startups...</div>
      ) : filteredStartups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <Card key={startup.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-india-saffron/10 to-india-green/10">
                <CardTitle>{startup.name}</CardTitle>
                <p className="text-sm text-gray-500">Founded by {startup.founder}</p>
                {startup.cofounder && (
                  <p className="text-sm text-gray-500">Co-founder: {startup.cofounder}</p>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <Badge className="mb-2 bg-india-saffron">{startup.domain}</Badge>
                <p className="text-gray-600 mt-2 line-clamp-3">{startup.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Asking</p>
                    <p className="font-semibold">₹{startup.askingInvestment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Equity Offered</p>
                    <p className="font-semibold">{startup.equity}%</p>
                  </div>
                </div>
                {startup.location && (
                  <p className="text-sm text-gray-500 mt-2">
                    📍 {startup.location}
                  </p>
                )}
              </CardContent>
              <CardFooter className="bg-gray-50 p-4">
                <Link to={`/investor/startup/${startup.id}`} className="w-full">
                  <Button variant="default" className="w-full bg-india-navy hover:bg-blue-900">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">No startups found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};
