'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MorphScene } from '../scenes/MorphScene';

const morphCode = `// Create base geometry (sphere)
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Create cube morph target by cloning and modifying the sphere geometry
const cubeGeometry = geometry.clone();
const positions = cubeGeometry.attributes.position.array;

for (let i = 0; i < positions.length; i += 3) {
  const x = positions[i];
  const y = positions[i + 1];
  const z = positions[i + 2];

  const cubeVertex = sphereToCube(x, y, z);

  positions[i] = cubeVertex.x;
  positions[i + 1] = cubeVertex.y;
  positions[i + 2] = cubeVertex.z;
}

// Assign the morph target to the base geometry
geometry.morphAttributes.position = [cubeGeometry.attributes.position];

// Clean up the cube geometry
cubeGeometry.dispose();

// Function to map sphere vertices to cube vertices
function sphereToCube(x, y, z) {
  const absX = Math.abs(x);
  const absY = Math.abs(y);
  const absZ = Math.abs(z);
  const max = Math.max(absX, absY, absZ);

  return new THREE.Vector3(x / max, y / max, z / max);
}`;

const shapes = [
  { id: 'sphere', label: 'Sphere' },
  { id: 'cube', label: 'Cube' },
] as const;

export function MorphExample() {
  const [scene, setScene] = useState<MorphScene | null>(null);
  const [currentShape, setCurrentShape] = useState<typeof shapes[number]['id']>('sphere');

  const handleSceneReady = useCallback((container: HTMLDivElement) => {
    const newScene = new MorphScene(container);
    setScene(newScene);
    return () => newScene.dispose();
  }, []);

  const handleShapeChange = (shape: typeof shapes[number]['id']) => {
    if (shape === currentShape) return;
    setCurrentShape(shape);
    scene?.morphTo(shape);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <pre className="text-sm bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
          <code>{morphCode}</code>
        </pre>
      </Card>

      <Card className="p-6 space-y-6">
        <div
          ref={handleSceneReady}
          className="w-full h-[300px] bg-white rounded-lg shadow-sm"
        />

        <div className="flex gap-2">
          {shapes.map(({ id, label }) => (
            <Button
              key={id}
              variant={currentShape === id ? 'primary' : 'secondary'}
              onClick={() => handleShapeChange(id)}
              className="flex-1"
            >
              {label}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
