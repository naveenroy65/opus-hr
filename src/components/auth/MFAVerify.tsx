import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield } from 'lucide-react';

interface MFAVerifyProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function MFAVerify({ onSuccess, onCancel }: MFAVerifyProps) {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const verifyCode = async () => {
    setIsVerifying(true);
    try {
      const factors = await supabase.auth.mfa.listFactors();
      if (!factors.data?.totp || factors.data.totp.length === 0) {
        throw new Error('No MFA factor found');
      }

      const factorId = factors.data.totp[0].id;

      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code,
      });

      if (verify.error) throw verify.error;

      toast({
        title: 'Success',
        description: 'MFA verification successful',
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Verification Failed',
        description: error.message || 'Invalid code',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Two-Factor Authentication</CardTitle>
        </div>
        <CardDescription>
          Enter the verification code from your authenticator app
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mfa-code">Verification Code</Label>
          <Input
            id="mfa-code"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            autoFocus
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={verifyCode} 
            disabled={isVerifying || code.length !== 6}
            className="flex-1"
          >
            {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify
          </Button>
          <Button 
            onClick={onCancel} 
            variant="outline"
            disabled={isVerifying}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
