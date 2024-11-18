'use client';

import { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CodePreview } from '@/components/ui/CodePreview';

interface ApiGetResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

interface ApiPostResponse {
  success: boolean;
  message: string;
  data: Record<string, unknown>;
  timestamp: string;
}

const examples = [
  {
    id: 'api-get',
    title: 'API GET Request',
    description: 'Fetching data from a Next.js API route',
    code: `// API Route (app/api/hello/route.ts)
export async function GET() {
  return Response.json({
    message: 'Hello from the API!',
    timestamp: new Date().toISOString(),
  });
}

// Client Component
export default function ApiExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hello');
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <Button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </Button>
      {data && (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[200px]">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}`,
    component: <ApiExample />
  },
  {
    id: 'api-post',
    title: 'API POST Request',
    description: 'Sending data to a Next.js API route',
    code: `// API Route (app/api/hello/route.ts)
export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({
    message: 'Data received',
    data: body,
  });
}

// Client Component
export default function ApiPostExample() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: 'data' }),
      });
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      console.error('Error sending data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <Button onClick={sendData} disabled={loading}>
        {loading ? 'Sending...' : 'Send Data'}
      </Button>
      {response && (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[200px]">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}`,
    component: <ApiPostExample />
  },
  {
    id: 'dynamic-routes',
    title: 'Dynamic Routes',
    description: 'Example of Next.js dynamic routing with parameters',
    code: `// app/examples/[id]/page.tsx
export default function DynamicRoutePage({ params }) {
  return (
    <div>
      <h1>Dynamic Route: {params.id}</h1>
      <p>This page demonstrates dynamic routing in Next.js</p>
    </div>
  );
}

// Usage
import Link from 'next/link';

export default function DynamicRouteExample() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Link href="/examples/1" className="text-blue-500 hover:underline">
          Example 1
        </Link>
        <Link href="/examples/2" className="text-blue-500 hover:underline">
          Example 2
        </Link>
      </div>
    </div>
  );
}`,
    component: <DynamicRouteExample />
  }
];

// Example Components
function ApiExample() {
  const [data, setData] = useState<ApiGetResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hello');
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <Button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </Button>
      {data && (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[200px]">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

function ApiPostExample() {
  const [response, setResponse] = useState<ApiPostResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const sendData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: 'data' }),
      });
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      console.error('Error sending data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <Button onClick={sendData} disabled={loading}>
        {loading ? 'Sending...' : 'Send Data'}
      </Button>
      {response && (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[200px]">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}

function DynamicRouteExample() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => window.open('/examples/1', '_blank')}>
          Example 1
        </Button>
        <Button variant="outline" onClick={() => window.open('/examples/2', '_blank')}>
          Example 2
        </Button>
      </div>
      <Text variant="body" className="text-foreground-secondary">
        Click the buttons to open dynamic routes in a new tab
      </Text>
    </div>
  );
}

export default function NextjsExamplesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text variant="h2">Next.js Features</Text>
        <Text variant="body" className="text-foreground-secondary">
          Examples of Next.js API routes, server components, and routing features.
        </Text>
      </div>

      <div className="space-y-16">
        {examples.map((example) => (
          <div key={example.id} className="space-y-6">
            <div className="space-y-2">
              <Text variant="h3">{example.title}</Text>
              <Text variant="body" className="text-foreground-secondary">
                {example.description}
              </Text>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <CodePreview code={example.code} />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center justify-center min-h-[200px]">
                  {example.component}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
