'use client';

import { useState, useEffect } from 'react';
import { Text } from '@/components/ui/Text';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form';
import { Select } from '@/components/ui/Select';
import { Toast } from '@/components/ui/Toast';
import { CodePreview } from '@/components/ui/CodePreview';

const examples = [
  {
    id: 'form-validation',
    title: 'Form Validation',
    description: 'Form with built-in validation and error handling',
    code: `import { Form } from '@/components/ui/Form';

export default function FormExample() {
  return (
    <div className="space-y-4">
      <Form />
      {/* Form includes email and password validation */}
    </div>
  );
}`,
    component: <Form />
  },
  {
    id: 'data-select',
    title: 'Data Selection',
    description: 'Interactive data selection with state management',
    code: `import { Select } from '@/components/ui/Select';
import { useState } from 'react';

export default function DataSelectExample() {
  const [selected, setSelected] = useState(null);
  
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  return (
    <div className="space-y-4">
      <Select
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select an option"
      />
      {selected && (
        <div className="p-4 bg-gray-100 rounded-lg">
          Selected: {selected.label}
        </div>
      )}
    </div>
  );
}`,
    component: <DataSelectExample />
  },
  {
    id: 'local-storage',
    title: 'Local Storage',
    description: 'Persisting data with browser local storage',
    code: `import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function LocalStorageExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('count');
    if (stored) setCount(parseInt(stored));
  }, []);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('count', newCount.toString());
  };

  const reset = () => {
    setCount(0);
    localStorage.removeItem('count');
  };

  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">Count: {count}</div>
      <div className="flex gap-4">
        <Button onClick={increment}>Increment</Button>
        <Button variant="outline" onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}`,
    component: <LocalStorageExample />
  }
];

function DataSelectExample() {
  const [selected, setSelected] = useState<any>(null);
  
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  return (
    <div className="space-y-4">
      <Select
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select an option"
      />
      {selected && (
        <div className="p-4 bg-gray-100 rounded-lg">
          Selected: {selected.label}
        </div>
      )}
    </div>
  );
}

function LocalStorageExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('count');
    if (stored) setCount(parseInt(stored));
  }, []);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('count', newCount.toString());
  };

  const reset = () => {
    setCount(0);
    localStorage.removeItem('count');
  };

  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">Count: {count}</div>
      <div className="flex gap-4">
        <Button onClick={increment}>Increment</Button>
        <Button variant="outline" onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}

export default function DataExamplesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text variant="h2">Data & Forms</Text>
        <Text variant="body" className="text-foreground-secondary">
          Examples of form handling, data management, and state persistence.
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
