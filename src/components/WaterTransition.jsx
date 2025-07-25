import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WaterTransition = ({ isVisible, onComplete }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Water drop particles
    const particleCount = 200;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = Math.random() * 10 + 5;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      velocities[i3] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 1] = -Math.random() * 0.2 - 0.1;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;
      
      sizes[i] = Math.random() * 0.1 + 0.05;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Particle material with water-like appearance
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x98bac6) },
        opacity: { value: 0.8 }
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        varying float vAlpha;
        
        void main() {
          vAlpha = sin(time + position.y * 0.1) * 0.5 + 0.5;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        varying float vAlpha;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.5) discard;
          
          float alpha = (1.0 - distance * 2.0) * vAlpha * opacity;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Ripple effect
    const rippleGeometry = new THREE.RingGeometry(0.1, 2, 32);
    const rippleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 1.0 }
      },
      vertexShader: `
        uniform float time;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float opacity;
        void main() {
          float alpha = sin(time * 2.0) * 0.5 + 0.5;
          gl_FragColor = vec4(0.6, 0.8, 0.9, alpha * opacity * 0.3);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const ripples = [];
    for (let i = 0; i < 5; i++) {
      const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial.clone());
      ripple.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        -5
      );
      ripple.rotation.x = Math.PI / 2;
      scene.add(ripple);
      ripples.push(ripple);
    }

    camera.position.z = 5;

    // Animation loop
    let startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;
      
      // Update particles
      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
        
        // Reset particles that fall too low
        if (positions[i3 + 1] < -5) {
          positions[i3 + 1] = 10;
          positions[i3] = (Math.random() - 0.5) * 20;
          positions[i3 + 2] = (Math.random() - 0.5) * 20;
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
      
      // Update shader uniforms
      particleMaterial.uniforms.time.value = elapsed;
      
      // Update ripples
      ripples.forEach((ripple, index) => {
        ripple.material.uniforms.time.value = elapsed + index * 0.5;
        ripple.scale.setScalar(1 + Math.sin(elapsed + index) * 0.3);
      });
      
      renderer.render(scene, camera);
      
      // Auto-complete after 3 seconds
      if (elapsed > 3 && onComplete) {
        onComplete();
        return;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isVisible) {
      animate();
    }

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ background: 'rgba(152, 186, 198, 0.1)' }}
    />
  );
};

export default WaterTransition;

