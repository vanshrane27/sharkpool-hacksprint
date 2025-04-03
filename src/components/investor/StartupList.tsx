
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Startup {
  id: string;
  name: string;
  founder: string;
  domain: string;
  description: string;
  askingInvestment: number;
  equity: number;
}

const StartupList = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const startupCollection = collection(db, "startups");
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
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = startups.filter(
        startup =>
          startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          startup.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
          startup.founder.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStartups(filtered);
    } else {
      setFilteredStartups(startups);
    }
  }, [searchTerm, startups]);

  // Mock data for initial development
  useEffect(() => {
    if (startups.length === 0 && !loading) {
      const mockStartups: Startup[] = [
        {
          id: "1",
          name: "EcoSolutions India",
          founder: "Rajesh Kumar",
          domain: "Sustainable Energy",
          description: "Developing affordable solar solutions for rural India",
          askingInvestment: 5000000,
          equity: 15,
        },
        {
          id: "2",
          name: "MedTech Innovations",
          founder: "Priya Sharma",
          domain: "Healthcare",
          description: "AI-powered diagnostic tools for rural healthcare centers",
          askingInvestment: 7500000,
          equity: 20,
        },
        {
          id: "3",
          name: "AgriConnect",
          founder: "Vikram Singh",
          domain: "Agriculture",
          description: "Connecting farmers directly to markets through mobile technology",
          askingInvestment: 3000000,
          equity: 12,
        },
      ];
      setStartups(mockStartups);
      setFilteredStartups(mockStartups);
    }
  }, [startups, loading]);

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
              </CardHeader>
              <CardContent className="p-6">
                <Badge className="mb-2 bg-india-saffron">{startup.domain}</Badge>
                <p className="text-gray-600 mt-2">{startup.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Asking</p>
                    <p className="font-semibold">₹{(startup.askingInvestment).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Equity Offered</p>
                    <p className="font-semibold">{startup.equity}%</p>
                  </div>
                </div>
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

export default StartupList;
