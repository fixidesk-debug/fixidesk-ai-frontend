import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface OrganizationConfig {
  autoRespond?: boolean;
  threshold?: number;
  model?: string;
}

export function AIControls() {
  const { toast } = useToast();

  const [orgId, setOrgId] = useState('');
  const [autoRespond, setAutoRespond] = useState(false);
  const [threshold, setThreshold] = useState(0.75);
  const [model, setModel] = useState('gemini-1.5-pro');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!orgId) return;
      const { data } = await supabase.from('organizations').select('config').eq('id', orgId).single();
      const cfg = (data as { config?: OrganizationConfig })?.config || {};
      if (typeof cfg.autoRespond === 'boolean') setAutoRespond(cfg.autoRespond);
      if (typeof cfg.threshold === 'number') setThreshold(cfg.threshold);
      if (typeof cfg.model === 'string') setModel(cfg.model);
    };
    load();
  }, [orgId]);

  const save = async () => {
    try {
      setSaving(true);
      const config = { autoRespond, threshold, model };
      const { error } = await supabase.from('organizations').update({ config }).eq('id', orgId);
      if (error) throw error;
      toast({ title: 'Saved', description: 'AI controls updated.' });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unexpected error';
      toast({ title: 'Save failed', description: message || 'Unexpected error', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="org">Organization ID</Label>
            <Input id="org" value={orgId} onChange={e => setOrgId(e.target.value)} placeholder="UUID" />
          </div>
          <div className="space-y-2">
            <Label>Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between border rounded-md p-3">
          <div>
            <div className="font-medium">Auto-respond</div>
            <div className="text-sm text-muted-foreground">Automatically reply when confidence ≥ threshold</div>
          </div>
          <Switch checked={autoRespond} onCheckedChange={setAutoRespond} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="threshold">Confidence threshold (0-1)</Label>
          <Input id="threshold" type="number" step="0.05" min={0} max={1} value={threshold} onChange={e => setThreshold(Number(e.target.value))} />
        </div>

        <Button onClick={save} disabled={!orgId || saving}>{saving ? 'Saving…' : 'Save'}</Button>
      </CardContent>
    </Card>
  );
}
