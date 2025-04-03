import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getRequestsByStartupId, updateRequestStatus } from '@/lib/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { convertTimestamps } from '@/lib/firestore';

const StartupRequestsPage = () => {
  const { currentUser, userData } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const startupRequests = await getRequestsByStartupId(currentUser.uid);
        setRequests(startupRequests.map(convertTimestamps));
      } catch (error) {
        console.error('Error fetching requests:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch requests. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentUser, toast]);

  const handleStatusUpdate = async (requestId: string, newStatus: string) => {
    try {
      await updateRequestStatus(requestId, newStatus);
      
      // Update local state
      setRequests(prevRequests => 
        prevRequests.map(request => 
          request.id === requestId 
            ? { ...request, status: newStatus } 
            : request
        )
      );
      
      toast({
        title: 'Status Updated',
        description: `Request status has been updated to ${newStatus}.`,
      });
    } catch (error) {
      console.error('Error updating request status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update request status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Investment Requests</h1>
      
      {requests.length === 0 ? (
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <p className="text-gray-500">No investment requests found.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Request from {request.investorName || 'Investor'}</CardTitle>
                    <CardDescription>
                      Amount: ₹{request.amount?.toLocaleString() || '0'}
                    </CardDescription>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><span className="font-medium">Message:</span> {request.message || 'No message provided'}</p>
                  <p><span className="font-medium">Date:</span> {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
              </CardContent>
              {request.status === 'pending' && (
                <CardFooter className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="bg-green-50 text-green-700 hover:bg-green-100"
                    onClick={() => handleStatusUpdate(request.id, 'accepted')}
                  >
                    Accept
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-red-50 text-red-700 hover:bg-red-100"
                    onClick={() => handleStatusUpdate(request.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StartupRequestsPage; 