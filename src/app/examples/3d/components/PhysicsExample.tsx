'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Box, CircleIcon, Trash } from 'lucide-react';
import { PhysicsScene } from '../scenes/PhysicsScene';

const physicsCode = `// Simple physics simulation with Three.js
const objects = [];

// Add physics properties to mesh
function addPhysics(mesh) {
  return {
    mesh,
    velocity: new THREE.Vector3(),
    acceleration: new THREE.Vector3(0, -9.81, 0),
    update(deltaTime) {
      // Update velocity and position
      this.velocity.add(
        this.acceleration.clone().multiplyScalar(deltaTime)
      );
      this.mesh.position.add(
        this.velocity.clone().multiplyScalar(deltaTime)
      );
      
      // Ground collision
      if (this.mesh.position.y < radius) {
        this.mesh.position.y = radius;
        this.velocity.y = -this.velocity.y * 0.5; // bounce
        this.velocity.x *= 0.98; // friction
        this.velocity.z *= 0.98;
      }
    }
  };
}

// Update physics
function updatePhysics(deltaTime) {
  for (const obj of objects) {
    obj.update(deltaTime);
    
    // Object collisions
    for (const other of objects) {
      if (obj === other) continue;
      const dist = obj.mesh.position
        .distanceTo(other.mesh.position);
      
      if (dist < radius * 2) {
        // Collision response
        const normal = obj.mesh.position
          .clone()
          .sub(other.mesh.position)
          .normalize();
          
        obj.velocity.reflect(normal)
          .multiplyScalar(0.5);
      }
    }
  }
}`;

export function PhysicsExample() {
  const [scene, setScene] = useState<PhysicsScene | null>(null);

  const handleSceneReady = useCallback((container: HTMLDivElement) => {
    const newScene = new PhysicsScene(container);
    setScene(newScene);
    return () => newScene.dispose();
  }, []);

  const addSphere = () => {
    scene?.addObject('sphere', {
      x: (Math.random() - 0.5) * 3,
      y: 5,
      z: (Math.random() - 0.5) * 3
    });
  };

  const addCube = () => {
    scene?.addObject('box', {
      x: (Math.random() - 0.5) * 3,
      y: 5,
      z: (Math.random() - 0.5) * 3
    });
  };

  const clearObjects = () => {
    scene?.clearObjects();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <pre className="text-sm bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
          <code>{physicsCode}</code>
        </pre>
      </Card>

      <Card className="p-6 space-y-6">
        <div 
          ref={handleSceneReady}
          className="w-full h-[300px] bg-white rounded-lg shadow-sm"
        />

        <div className="flex gap-2">
          <Button
            onClick={addSphere}
            className="flex-1"
          >
            <CircleIcon className="h-4 w-4 mr-2" />
            Add Sphere
          </Button>
          <Button
            onClick={addCube}
            className="flex-1"
          >
            <Box className="h-4 w-4 mr-2" />
            Add Cube
          </Button>
          <Button
            variant="secondary"
            onClick={clearObjects}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
