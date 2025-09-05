import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export default function AccountSettings() {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [updating, setUpdating] = useState(false);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });

  const handlePasswordUpdate = async () => {
    if (!pwd.next || pwd.next.length < 8) {
      toast({ title: "Invalid password", description: "Minimum 8 characters.", variant: "destructive" });
      return;
    }
    if (pwd.next !== pwd.confirm) {
      toast({ title: "Passwords do not match", description: "Re-enter to confirm.", variant: "destructive" });
      return;
    }
    setUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pwd.next });
      if (error) throw error;
      toast({ title: "Password updated", description: "Your password has been changed." });
      setPwd({ current: "", next: "", confirm: "" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to update password";
      toast({ title: "Update failed", description: msg, variant: "destructive" });
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOutAll = async () => {
    try {
      // Supabase does not expose sign-out-all-sessions on client; force rotate token by password update or signOut.
      await signOut();
      toast({ title: "Signed out", description: "You have been signed out." });
    } catch {
      toast({ title: "Sign out failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirm = window.prompt("Type DELETE to permanently delete your account:");
    if (confirm !== "DELETE") return;
    try {
      // Requires service role or edge function. Here we mark profile inactive as a safe placeholder.
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: false })
        .eq('id', user.id);
      if (error) throw error;
      toast({ title: "Account disabled", description: "Your account has been deactivated." });
      await signOut();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to delete account";
      toast({ title: "Action failed", description: msg, variant: "destructive" });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage password, sessions, and account controls</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="next">New Password</Label>
                <Input id="next" type="password" value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input id="confirm" type="password" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} />
              </div>
            </div>
            <Button onClick={handlePasswordUpdate} disabled={updating}>{updating ? 'Updating…' : 'Update Password'}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sessions</CardTitle>
            <CardDescription>Sign out of your current session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" onClick={handleSignOutAll}>Sign Out</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>Disable or delete your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Deactivating will prevent login; data is retained. Full deletion typically requires admin approval.</p>
            <div className="flex gap-2">
              <Button variant="destructive" onClick={handleDeleteAccount}>Deactivate Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}


