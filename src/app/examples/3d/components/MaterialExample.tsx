'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Slider } from '@/components/ui/Slider';
import { MaterialScene } from '../scenes/MaterialScene';

const materialCode = `// Create a physically based material with dynamic properties
const material = new THREE.MeshPhysicalMaterial({ 
  color: '#2563eb',
  metalness: 0.2,    // Metallic look (0-1)
  roughness: 0.1,    // Surface smoothness (0-1)
  clearcoat: 0.8,    // Clear coating amount (0-1)
  transmission: 0,   // Transparency (0-1)
  ior: 1.5,         // Index of refraction
});

// Update material properties in real-time
function updateMaterial(property: string, value: number) {
  material[property] = value;
  material.needsUpdate = true;
}`;

export function MaterialExample() {
  const [scene, setScene] = useState<MaterialScene | null>(null);
  const [properties, setProperties] = useState({
    metalness: 0.2,
    roughness: 0.1,
    clearcoat: 0.8,
    transmission: 0,
    ior: 1.5,
  });

  const handleSceneReady = useCallback((container: HTMLDivElement) => {
    const newScene = new MaterialScene(container);
    setScene(newScene);
    return () => newScene.dispose();
  }, []);

  const handlePropertyChange = (property: keyof typeof properties) => (value: number) => {
    setProperties(prev => ({ ...prev, [property]: value }));
    scene?.setMaterialProperty(property, value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <pre className="text-sm bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
          <code>{materialCode}</code>
        </pre>
      </Card>

      <Card className="p-6 space-y-6">
        <div 
          ref={handleSceneReady}
          className="w-full h-[300px] bg-white rounded-lg shadow-sm"
        />

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Metalness</span>
              <span>{properties.metalness.toFixed(2)}</span>
            </div>
            <Slider
              value={properties.metalness}
              onChange={handlePropertyChange('metalness')}
              min={0}
              max={1}
              step={0.01}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Roughness</span>
              <span>{properties.roughness.toFixed(2)}</span>
            </div>
            <Slider
              value={properties.roughness}
              onChange={handlePropertyChange('roughness')}
              min={0}
              max={1}
              step={0.01}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Clearcoat</span>
              <span>{properties.clearcoat.toFixed(2)}</span>
            </div>
            <Slider
              value={properties.clearcoat}
              onChange={handlePropertyChange('clearcoat')}
              min={0}
              max={1}
              step={0.01}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Transmission</span>
              <span>{properties.transmission.toFixed(2)}</span>
            </div>
            <Slider
              value={properties.transmission}
              onChange={handlePropertyChange('transmission')}
              min={0}
              max={1}
              step={0.01}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>IOR</span>
              <span>{properties.ior.toFixed(2)}</span>
            </div>
            <Slider
              value={properties.ior}
              onChange={handlePropertyChange('ior')}
              min={1}
              max={2.33}
              step={0.01}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
