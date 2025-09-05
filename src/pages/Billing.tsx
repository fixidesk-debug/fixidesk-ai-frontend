import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const plans = [
  {
    id: 'starter',
    nameKey: "pricing.plan.starter.name",
    descriptionKey: "pricing.plan.starter.desc",
    price: "$29",
    periodKey: "pricing.perMonth",
    features: [
      "pricing.plan.starter.f1",
      "pricing.plan.starter.f2",
      "pricing.plan.starter.f3",
      "pricing.plan.starter.f4",
      "pricing.plan.starter.f5",
      "pricing.plan.starter.f6"
    ],
    ctaKey: "pricing.ctaStart",
    popular: false
  },
  {
    id: 'pro',
    nameKey: "pricing.plan.pro.name",
    descriptionKey: "pricing.plan.pro.desc",
    price: "$79",
    periodKey: "pricing.perMonth",
    features: [
      "pricing.plan.pro.f1",
      "pricing.plan.pro.f2",
      "pricing.plan.pro.f3",
      "pricing.plan.pro.f4",
      "pricing.plan.pro.f5",
      "pricing.plan.pro.f6",
      "pricing.plan.pro.f7",
      "pricing.plan.pro.f8"
    ],
    ctaKey: "pricing.ctaStart",
    popular: true
  },
  {
    id: 'enterprise',
    nameKey: "pricing.plan.ent.name",
    descriptionKey: "pricing.plan.ent.desc",
    price: "Custom",
    periodKey: "pricing.contactSales",
    features: [
      "pricing.plan.ent.f1",
      "pricing.plan.ent.f2",
      "pricing.plan.ent.f3",
      "pricing.plan.ent.f4",
      "pricing.plan.ent.f5",
      "pricing.plan.ent.f6",
      "pricing.plan.ent.f7",
      "pricing.plan.ent.f8"
    ],
    ctaKey: "pricing.ctaContact",
    popular: false
  }
];

export default function Billing() {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [plan, setPlan] = useState("pro");
  const [coupon, setCoupon] = useState("");
  const { t } = useI18n();

  // Temporary disable
  const isDisabled = true;

  useEffect(() => {
    // choose default plan from permissions if present
    const currentPlan = (profile?.permissions as any)?.plan;
    if (currentPlan) setPlan(currentPlan);
  }, [profile?.permissions]);

  const handleActivate = async () => {
    if (!user) return;
    setProcessing(true);
    try {
      // In a real app, redirect to Stripe Checkout; here we simulate successful activation
      const newPermissions = {
        ...(profile?.permissions || {}),
        plan,
        subscription_active: true,
        subscribed_at: new Date().toISOString(),
      };
      const { error } = await supabase
        .from('profiles')
        .update({ permissions: newPermissions })
        .eq('id', user.id);
      if (error) throw error;
      toast({ title: 'Subscription active', description: `Your ${plan} plan is now active.` });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to activate subscription';
      toast({ title: 'Activation failed', description: msg, variant: 'destructive' });
    } finally {
      setProcessing(false);
    }
  };

  if (isDisabled) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle>Billing Temporarily Unavailable</CardTitle>
              <CardDescription>
                The billing system is currently under maintenance. Please check back later.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="text-muted-foreground">Activate your subscription to access all features</p>
        </div>

        {/* Pricing Cards copied from landing with in-app CTAs */}
        <section className="py-4">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            {plans.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {p.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-md text-xs inline-flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      {t("pricing.mostPopular")}
                    </div>
                  </div>
                )}
                <Card className={`h-full flex flex-col transition-all duration-300 hover:shadow-beautiful ${p.popular ? 'border-primary shadow-glow' : 'border-border/50 hover:border-primary/20'}`}>
                  <CardHeader className="pb-8">
                    <CardTitle className="text-xl font-semibold">{t(p.nameKey)}</CardTitle>
                    <CardDescription className="text-muted-foreground">{t(p.descriptionKey)}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{p.price}</span>
                      {p.price !== "Custom" && (
                        <span className="text-muted-foreground ml-1">/{t(p.periodKey)}</span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col space-y-6">
                    <ul className="space-y-3 flex-1">
                      {p.features.map((fk) => (
                        <li key={fk} className="flex items-start">
                          <Check className="h-5 w-5 text-success mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{t(fk)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 mt-auto">
                      <Button
                        variant={p.popular ? 'hero' : 'outline'}
                        size="lg"
                        className="w-full"
                        onClick={() => setPlan(p.id)}
                      >
                        {plan === p.id ? 'Selected' : 'Select Plan'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Confirm your selection and activate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Selected Plan</Label>
              <div className="text-sm text-muted-foreground capitalize">{plan}</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coupon">Coupon Code (optional)</Label>
              <Input id="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Enter coupon" />
            </div>
            <Button onClick={handleActivate} disabled={processing}>
              {processing ? 'Activating…' : 'Activate Subscription'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}


