import { useGetPaymentHistory } from '../hooks/useQueries';
import { Loader2, Receipt, Calendar, IndianRupee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaymentStatus, PaymentType, type PaymentRecord } from '../backend';

export default function PaymentHistory() {
  const { data: payments, isLoading } = useGetPaymentHistory();

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.completed:
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">Completed</Badge>;
      case PaymentStatus.pending:
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Pending</Badge>;
      case PaymentStatus.failed:
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPaymentTypeBadge = (type: PaymentType) => {
    return type === PaymentType.monthly ? (
      <Badge variant="outline">Monthly</Badge>
    ) : (
      <Badge variant="secondary">Annual</Badge>
    );
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Receipt className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-2xl">Payment History</h2>
          <p className="text-sm text-muted-foreground">Your payment records</p>
        </div>
      </div>

      {!payments || payments.length === 0 ? (
        <div className="text-center py-12">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Receipt className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            No payment records found. Make your first payment to see it here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id.toString()}>
                  <TableCell className="font-mono text-sm">
                    #{payment.id.toString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formatDate(payment.paymentDate)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-semibold">
                      <IndianRupee className="h-4 w-4" />
                      <span>{Number(payment.amount).toLocaleString('en-IN')}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getPaymentTypeBadge(payment.paymentType)}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
