import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetFeeStructure, useInitiatePayment, useGetEnrollmentStatus } from '../hooks/useQueries';
import { Navigate } from '@tanstack/react-router';
import { Loader2, CreditCard, Check, IndianRupee, Calendar, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaymentType } from '../backend';
import { toast } from 'sonner';

export default function FeePayment() {
  const { identity } = useInternetIdentity();
  const { data: feeStructure, isLoading: feeLoading } = useGetFeeStructure();
  const { data: enrollments, isLoading: enrollmentLoading } = useGetEnrollmentStatus();
  const initiatePayment = useInitiatePayment();

  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType | null>(null);
  const [paymentId, setPaymentId] = useState<bigint | null>(null);

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (feeLoading || enrollmentLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const hasActiveEnrollment = enrollments && enrollments.length > 0;

  if (!hasActiveEnrollment) {
    return (
      <div className="py-12 animate-fade-in">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="font-display font-bold text-2xl mb-2">No Active Enrollment</h2>
            <p className="text-muted-foreground mb-6">
              You need to enroll in a course before making a payment.
            </p>
            <Button asChild>
              <a href="/enrollment">Go to Enrollment</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handlePayment = async (type: PaymentType) => {
    try {
      const id = await initiatePayment.mutateAsync(type);
      setPaymentId(id);
      setSelectedPaymentType(type);
      toast.success('Payment initiated successfully!');
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const monthlyFee = feeStructure ? Number(feeStructure.monthlyFee) : 500;
  const annualFee = feeStructure ? Number(feeStructure.annualFee) : 4800;
  const savings = monthlyFee * 12 - annualFee;

  if (paymentId !== null) {
    return (
      <div className="py-12 animate-fade-in">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-display font-bold text-2xl mb-2">Payment Initiated!</h2>
            <p className="text-muted-foreground mb-4">
              Your payment has been successfully initiated.
            </p>
            <div className="bg-muted rounded-lg p-4 mb-6 inline-block">
              <p className="text-sm text-muted-foreground mb-1">Payment ID</p>
              <p className="font-mono font-bold text-lg">{paymentId.toString()}</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <p>Payment Type: <span className="font-semibold text-foreground">
                {selectedPaymentType === PaymentType.monthly ? 'Monthly' : 'Annual'}
              </span></p>
              <p>Amount: <span className="font-semibold text-foreground">
                ₹{selectedPaymentType === PaymentType.monthly ? monthlyFee : annualFee}
              </span></p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="outline">
                <a href="/dashboard">Go to Dashboard</a>
              </Button>
              <Button onClick={() => { setPaymentId(null); setSelectedPaymentType(null); }}>
                Make Another Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 animate-fade-in">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Fee Payment
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose your payment plan and complete your registration
          </p>
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Monthly Payment */}
          <div className="bg-card border-2 border-border rounded-xl p-8 shadow-sm hover:shadow-warm transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/assets/generated/fee-payment-icon.dim_128x128.png" 
                alt="Monthly Payment" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="font-display font-semibold text-2xl">Monthly Plan</h3>
                <p className="text-sm text-muted-foreground">Pay every month</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <IndianRupee className="h-6 w-6 text-primary" />
                <span className="font-display font-bold text-4xl">{monthlyFee}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Flexible monthly payments
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Pay as you go</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>No long-term commitment</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Cancel anytime</span>
              </li>
            </ul>

            <Button
              className="w-full"
              onClick={() => handlePayment(PaymentType.monthly)}
              disabled={initiatePayment.isPending}
            >
              {initiatePayment.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Pay Monthly
                </>
              )}
            </Button>
          </div>

          {/* Annual Payment */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary rounded-xl p-8 shadow-warm relative">
            <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              SAVE ₹{savings}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/assets/generated/fee-payment-icon.dim_128x128.png" 
                alt="Annual Payment" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="font-display font-semibold text-2xl">Annual Plan</h3>
                <p className="text-sm text-muted-foreground">Pay once a year</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <IndianRupee className="h-6 w-6 text-primary" />
                <span className="font-display font-bold text-4xl">{annualFee}</span>
                <span className="text-muted-foreground">/year</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                <TrendingDown className="h-4 w-4" />
                <span>Save ₹{savings} compared to monthly</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Best value for money</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>One-time payment for the year</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>No monthly hassle</span>
              </li>
            </ul>

            <Button
              className="w-full"
              onClick={() => handlePayment(PaymentType.annual)}
              disabled={initiatePayment.isPending}
            >
              {initiatePayment.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Annually
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Payment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-2">What's Included:</p>
              <ul className="space-y-1">
                <li>• Access to all enrolled courses</li>
                <li>• Study materials and resources</li>
                <li>• Online assessments</li>
                <li>• Certificate upon completion</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Payment Terms:</p>
              <ul className="space-y-1">
                <li>• Secure payment processing</li>
                <li>• Instant payment confirmation</li>
                <li>• Payment history in dashboard</li>
                <li>• Refund policy as per school terms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
