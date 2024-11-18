'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { ThreeScene } from './ThreeScene';
import { 
  Box,
  CircleIcon,
  Layers,
  Paintbrush,
  RotateCcw,
  Eye,
  Plus,
  Trash,
  Camera,
} from 'lucide-react';

function ControlSection({ title, icon: Icon, children }: { 
  title: string; 
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Icon className="h-4 w-4" />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

const shapes = [
  { id: 'box', label: 'Cube', icon: Box },
  { id: 'sphere', label: 'Sphere', icon: CircleIcon },
  { id: 'torus', label: 'Torus', icon: CircleIcon }
] as const;

const colors = [
  { id: '#2563eb', label: 'Blue' },
  { id: '#16a34a', label: 'Green' },
  { id: '#dc2626', label: 'Red' },
  { id: '#9333ea', label: 'Purple' },
  { id: '#eab308', label: 'Gold' },
  { id: '#0d9488', label: 'Teal' }
];

export default function ThreeDemoPage() {
  const [scene, setScene] = useState<ThreeScene | null>(null);
  const [currentShape, setCurrentShape] = useState<typeof shapes[number]['id']>('box');
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(2);
  const [materialProps, setMaterialProps] = useState({
    metalness: 0.2,
    roughness: 0.1,
    clearcoat: 0.8,
    transmission: 0,
    ior: 1.5,
    thickness: 0.5,
  });

  const handleSceneReady = useCallback((container: HTMLDivElement) => {
    const newScene = new ThreeScene(container);
    setScene(newScene);
    return () => newScene.dispose();
  }, []);

  const handleShapeChange = (shape: typeof shapes[number]['id']) => {
    if (shape === currentShape) return;
    setCurrentShape(shape);
    scene?.morphMainMesh(shape);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    scene?.setMainMeshMaterial('color', color);
  };

  const handleMaterialChange = (property: keyof typeof materialProps) => (value: number) => {
    setMaterialProps(prev => ({ ...prev, [property]: value }));
    scene?.setMainMeshMaterial(property, value);
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
    scene?.setAutoRotate(!isRotating);
  };

  const handleRotationSpeedChange = (speed: number) => {
    setRotationSpeed(speed);
    scene?.setRotationSpeed(speed);
  };

  const addSphere = () => {
    scene?.addPhysicsObject('sphere', {
      x: (Math.random() - 0.5) * 3,
      y: 5,
      z: (Math.random() - 0.5) * 3
    });
  };

  const addCube = () => {
    scene?.addPhysicsObject('box', {
      x: (Math.random() - 0.5) * 3,
      y: 5,
      z: (Math.random() - 0.5) * 3
    });
  };

  const clearObjects = () => {
    scene?.clearPhysicsObjects();
  };

  const resetCamera = () => {
    scene?.resetCamera();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">3D Graphics</h2>
        <p className="text-sm text-muted-foreground">
          Explore real-time 3D graphics with physics, morphing, and material properties.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
        <Card className="p-6">
          <div
            ref={handleSceneReady}
            className="w-full h-[600px] rounded-lg"
          />
        </Card>

        <div className="space-y-6">
          <Card className="p-4 space-y-6">
            <ControlSection title="Geometry" icon={Layers}>
              <div className="grid grid-cols-3 gap-2">
                {shapes.map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    size="sm"
                    variant={currentShape === id ? "primary" : "secondary"}
                    onClick={() => handleShapeChange(id)}
                    className="flex flex-col items-center gap-1 h-auto py-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{label}</span>
                  </Button>
                ))}
              </div>
            </ControlSection>

            <ControlSection title="Material" icon={Paintbrush}>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {colors.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => handleColorChange(id)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === id ? 'scale-110 border-primary shadow-lg' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: id }}
                      title={label}
                    />
                  ))}
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Metalness</span>
                      <span>{materialProps.metalness.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={materialProps.metalness}
                      onChange={handleMaterialChange('metalness')}
                      min={0}
                      max={1}
                      step={0.01}
                      className="py-0.5"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Roughness</span>
                      <span>{materialProps.roughness.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={materialProps.roughness}
                      onChange={handleMaterialChange('roughness')}
                      min={0}
                      max={1}
                      step={0.01}
                      className="py-0.5"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Clearcoat</span>
                      <span>{materialProps.clearcoat.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={materialProps.clearcoat}
                      onChange={handleMaterialChange('clearcoat')}
                      min={0}
                      max={1}
                      step={0.01}
                      className="py-0.5"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Transmission</span>
                      <span>{materialProps.transmission.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={materialProps.transmission}
                      onChange={handleMaterialChange('transmission')}
                      min={0}
                      max={1}
                      step={0.01}
                      className="py-0.5"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>IOR</span>
                      <span>{materialProps.ior.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={materialProps.ior}
                      onChange={handleMaterialChange('ior')}
                      min={1}
                      max={2.33}
                      step={0.01}
                      className="py-0.5"
                    />
                  </div>
                </div>
              </div>
            </ControlSection>

            <ControlSection title="Physics Objects" icon={Plus}>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    onClick={addSphere}
                  >
                    <CircleIcon className="h-4 w-4 mr-2" />
                    Add Sphere
                  </Button>
                  <Button
                    size="sm"
                    onClick={addCube}
                  >
                    <Box className="h-4 w-4 mr-2" />
                    Add Cube
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={clearObjects}
                  className="w-full text-red-500 hover:text-red-600"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Clear Objects
                </Button>
              </div>
            </ControlSection>

            <ControlSection title="Scene" icon={Eye}>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant={isRotating ? "primary" : "secondary"}
                    onClick={toggleRotation}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {isRotating ? 'Stop' : 'Rotate'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={resetCamera}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Reset View
                  </Button>
                </div>

                {isRotating && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Rotation Speed</span>
                      <span>{rotationSpeed.toFixed(1)}x</span>
                    </div>
                    <Slider
                      value={rotationSpeed}
                      onChange={handleRotationSpeedChange}
                      min={0.5}
                      max={5}
                      step={0.5}
                      className="py-0.5"
                    />
                  </div>
                )}
              </div>
            </ControlSection>
          </Card>
        </div>
      </div>
    </div>
  );
}
