import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield } from 'lucide-react';

interface MFASetupProps {
  onSuccess: () => void;
}

export default function MFASetup({ onSuccess }: MFASetupProps) {
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [verifyCode, setVerifyCode] = useState('');
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const enrollMFA = async () => {
    setIsEnrolling(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Authenticator App',
      });

      if (error) throw error;

      setQrCode(data.totp.qr_code);
      setSecret(data.totp.secret);
      
      toast({
        title: 'MFA Setup',
        description: 'Scan the QR code with your authenticator app',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  const verifyMFA = async () => {
    setIsVerifying(true);
    try {
      const factors = await supabase.auth.mfa.listFactors();
      if (factors.data?.totp.length === 0) {
        throw new Error('No MFA factor found');
      }

      const factorId = factors.data!.totp[0].id;

      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: verifyCode,
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'MFA has been enabled successfully',
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
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
          <CardTitle>Setup Multi-Factor Authentication</CardTitle>
        </div>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!qrCode ? (
          <Button 
            onClick={enrollMFA} 
            disabled={isEnrolling}
            className="w-full"
          >
            {isEnrolling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enable MFA
          </Button>
        ) : (
          <>
            <div className="space-y-4">
              <div className="flex justify-center">
                <img src={qrCode} alt="QR Code" className="border rounded-lg p-2" />
              </div>
              
              <div className="space-y-2">
                <Label>Manual Entry Code</Label>
                <Input value={secret} readOnly className="font-mono text-sm" />
                <p className="text-xs text-muted-foreground">
                  Use this code if you can't scan the QR code
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="verify-code">Verification Code</Label>
                <Input
                  id="verify-code"
                  placeholder="Enter 6-digit code"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  maxLength={6}
                />
              </div>

              <Button 
                onClick={verifyMFA} 
                disabled={isVerifying || verifyCode.length !== 6}
                className="w-full"
              >
                {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify and Enable
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
