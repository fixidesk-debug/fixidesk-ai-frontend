import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { orchestratorApi } from '@/lib/api';

export function AIKnowledge() {
  const { toast } = useToast();

  const [orgId1, setOrgId1] = useState('');
  const [url, setUrl] = useState('');
  const [name1, setName1] = useState('');
  const [loading1, setLoading1] = useState(false);

  const [orgId2, setOrgId2] = useState('');
  const [name2, setName2] = useState('');
  const [content, setContent] = useState('');
  const [loading2, setLoading2] = useState(false);

  const ingestUrl = async () => {
    try {
      setLoading1(true);
      await orchestratorApi.ingestUrl({ organization_id: orgId1, url, name: name1 || undefined });
      toast({ title: 'Ingested', description: 'URL content ingested and embedded.' });
      setUrl('');
      setName1('');
    } catch (e: unknown) {
      const message = (e as any)?.response?.data?.error || 'Unexpected error';
      toast({ title: 'Ingest failed', description: message, variant: 'destructive' });
    } finally {
      setLoading1(false);
    }
  };

  const ingestText = async () => {
    try {
      setLoading2(true);
      await orchestratorApi.ingestText({ organization_id: orgId2, name: name2, content });
      toast({ title: 'Ingested', description: 'Text ingested and embedded.' });
      setName2('');
      setContent('');
    } catch (e: unknown) {
      const message = (e as any)?.response?.data?.error || 'Unexpected error';
      toast({ title: 'Ingest failed', description: message, variant: 'destructive' });
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Ingest from URL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="org1">Organization ID</Label>
            <Input id="org1" value={orgId1} onChange={e => setOrgId1(e.target.value)} placeholder="UUID" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://docs.example.com/article" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name1">Name (optional)</Label>
            <Input id="name1" value={name1} onChange={e => setName1(e.target.value)} placeholder="Article title" />
          </div>
          <Button onClick={ingestUrl} disabled={!orgId1 || !url || loading1}>
            {loading1 ? 'Ingesting…' : 'Ingest URL'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ingest Raw Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="org2">Organization ID</Label>
            <Input id="org2" value={orgId2} onChange={e => setOrgId2(e.target.value)} placeholder="UUID" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name2">Name</Label>
            <Input id="name2" value={name2} onChange={e => setName2(e.target.value)} placeholder="Document name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" value={content} onChange={e => setContent(e.target.value)} rows={8} placeholder="Paste clean text here" />
          </div>
          <Button onClick={ingestText} disabled={!orgId2 || !name2 || !content || loading2}>
            {loading2 ? 'Ingesting…' : 'Ingest Text'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
