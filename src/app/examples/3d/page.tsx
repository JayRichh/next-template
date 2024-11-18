'use client';

import { MaterialExample } from './components/MaterialExample';
import { MorphExample } from './components/MorphExample';
import { PhysicsExample } from './components/PhysicsExample';

export default function ThreeExamplesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">3D Graphics</h2>
        <p className="text-sm text-muted-foreground">
          Interactive 3D examples demonstrating advanced graphics techniques.
        </p>
      </div>

      <div className="space-y-16">
        <section className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold tracking-tight">Physical Materials</h3>
            <p className="text-sm text-muted-foreground">
              Explore physically based materials with real-time property adjustments. 
              Demonstrates metalness, roughness, clearcoat, and transmission effects.
            </p>
          </div>
          <MaterialExample />
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold tracking-tight">Geometry Morphing</h3>
            <p className="text-sm text-muted-foreground">
              Smooth transitions between different 3D shapes using vertex interpolation. 
              Watch as one geometry seamlessly morphs into another.
            </p>
          </div>
          <MorphExample />
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold tracking-tight">Interactive Physics</h3>
            <p className="text-sm text-muted-foreground">
              Real-time physics simulation with dynamic objects and collisions. 
              Add objects, watch them fall, bounce, and interact with each other.
            </p>
          </div>
          <PhysicsExample />
        </section>
      </div>
    </div>
  );
}
