import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getRequestsByStartupId } from '@/lib/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { convertTimestamps } from '@/lib/firestore';

const StartupNotificationsPage = () => {
  const { currentUser } = useAuth();
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
          description: 'Failed to fetch notifications. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentUser, toast]);

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
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      
      {requests.length === 0 ? (
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <p className="text-gray-500">No notifications found.</p>
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
                    <CardTitle>Investment Request from {request.investorName || 'Investor'}</CardTitle>
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
                  {request.status !== 'pending' && (
                    <p><span className="font-medium">Updated:</span> {request.updatedAt ? new Date(request.updatedAt).toLocaleDateString() : 'N/A'}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StartupNotificationsPage; 