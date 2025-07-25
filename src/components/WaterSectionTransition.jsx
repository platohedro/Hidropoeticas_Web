import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WaterSectionTransition = () => {
  const mountRef = useRef(null);
  const animationFrameRef = useRef(null);
  const shaderMaterialRef = useRef(null);
  const scrollRef = useRef(0);
  const [isVisible, setIsVisible] = React.useState(false);

  // Función para manejar el scroll
  const handleScroll = () => {
    if (shaderMaterialRef.current) {
      scrollRef.current = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
      shaderMaterialRef.current.uniforms.scroll.value = scrollRef.current;
    }
  };

  // Función para manejar el movimiento del mouse
  const handleMouseMove = (event) => {
    if (shaderMaterialRef.current) {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      shaderMaterialRef.current.uniforms.mousePosition.value.set(x, y);
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    let scene, camera, renderer;

    // Configuración inicial de Three.js
    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      // Crear material con shader personalizado para el efecto de agua
      const waterMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          progress: { value: 0.0 },
          scroll: { value: 0.0 },
          parallaxStrength: { value: 2.5 },  // Aumentado para mayor efecto
          transitionDirection: { value: new THREE.Vector2(0, 1) },
          flowSpeed: { value: 2.5 },  // Aumentado para movimiento más fluido
          mousePosition: { value: new THREE.Vector2(0.5, 0.5) }  // Nueva uniform para interacción del mouse
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float progress;
          uniform float scroll;
          uniform float parallaxStrength;
          uniform float flowSpeed;
          uniform vec2 resolution;
          uniform vec2 transitionDirection;
          varying vec2 vUv;

          //	Classic Perlin 3D Noise 
          //	by Stefan Gustavson
          vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
          vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
          vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

          float cnoise(vec3 P){
            vec3 Pi0 = floor(P); // Integer part
            vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
            Pi0 = mod(Pi0, 289.0);
            Pi1 = mod(Pi1, 289.0);
            vec3 Pf0 = fract(P); // Fractional part
            vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
            vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
            vec4 iy = vec4(Pi0.yy, Pi1.yy);
            vec4 iz0 = Pi0.zzzz;
            vec4 iz1 = Pi1.zzzz;

            vec4 ixy = permute(permute(ix) + iy);
            vec4 ixy0 = permute(ixy + iz0);
            vec4 ixy1 = permute(ixy + iz1);

            vec4 gx0 = ixy0 / 7.0;
            vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
            gx0 = fract(gx0);
            vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
            vec4 sz0 = step(gz0, vec4(0.0));
            gx0 -= sz0 * (step(0.0, gx0) - 0.5);
            gy0 -= sz0 * (step(0.0, gy0) - 0.5);

            vec4 gx1 = ixy1 / 7.0;
            vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
            gx1 = fract(gx1);
            vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
            vec4 sz1 = step(gz1, vec4(0.0));
            gx1 -= sz1 * (step(0.0, gx1) - 0.5);
            gy1 -= sz1 * (step(0.0, gy1) - 0.5);

            vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
            vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
            vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
            vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
            vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
            vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
            vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
            vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

            vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
            g000 *= norm0.x;
            g010 *= norm0.y;
            g100 *= norm0.z;
            g110 *= norm0.w;
            vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
            g001 *= norm1.x;
            g011 *= norm1.y;
            g101 *= norm1.z;
            g111 *= norm1.w;

            float n000 = dot(g000, Pf0);
            float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
            float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
            float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
            float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
            float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
            float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
            float n111 = dot(g111, Pf1);

            vec3 fade_xyz = fade(Pf0);
            vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
            vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
            float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
            return 2.2 * n_xyz;
          }

          void main() {
            // Aplicar efecto parallax basado en scroll
            vec2 uv = vUv;
            vec2 parallaxUV = uv;
            
            // Vector de dirección mejorado basado en scroll y mouse
            vec2 flowDir = transitionDirection * (1.0 + scroll) + (mousePosition - 0.5) * scroll;
            
            // Efecto de parallax dinámico con más capas y escalas variables
            float scale1 = 2.0 + scroll * 3.0;  // Capa base más sutil
            float scale2 = 4.0 + scroll * 4.0;  // Capa media más detallada
            float scale3 = 6.0 + scroll * 5.0;  // Capa fina para detalles
            float scale4 = 8.0 + scroll * 6.0;  // Nueva capa para más profundidad
            
            // Primera capa - movimiento lento y base
            vec2 flow1 = flowDir * time * flowSpeed * 0.3;
            float water1 = cnoise(vec3(
                (uv + flow1) * scale1 + mousePosition.x * 2.0,
                time * 0.4 + mousePosition.y
            )) * parallaxStrength * 1.2;
            
            // Segunda capa - movimiento medio con variación
            vec2 flow2 = flowDir * time * flowSpeed * 0.6;
            float water2 = cnoise(vec3(
                (uv + flow2) * scale2 + mousePosition.y,
                time * 0.6 + mousePosition.x * 2.0
            )) * parallaxStrength * 0.8;
            
            // Tercera capa - movimiento rápido con detalle fino
            vec2 flow3 = flowDir * time * flowSpeed * 0.9;
            float water3 = cnoise(vec3(
                (uv + flow3) * scale3 + mousePosition * 3.0,
                time * 0.8
            )) * parallaxStrength * 0.6;
            
            // Cuarta capa - micro detalles y brillos
            vec2 flow4 = flowDir * time * flowSpeed * 1.2;
            float water4 = cnoise(vec3(
                (uv + flow4) * scale4 + mousePosition * 4.0,
                time
            )) * parallaxStrength * 0.3;
            
            // Combinar las capas con efecto parallax mejorado
            vec2 totalOffset = vec2(
                water1 + water2 * 0.7 + water3 * 0.4 + water4 * 0.2,
                water1 * 1.3 + water2 * 0.9 + water3 * 0.6 + water4 * 0.3
            ) * (1.0 + scroll * 0.8);  // Mayor influencia del scroll
            
            // Aplicar distorsión no lineal para efecto más orgánico
            float distortionFactor = sin(time * 0.5 + scroll * 3.0) * 0.1 + 1.0;
            parallaxUV += totalOffset * mix(0.6, 2.0, progress) * distortionFactor;
            
            // Crear efecto de ondulación con parallax
            float noise = cnoise(vec3(parallaxUV * 5.0, time * 0.5));
            
            // Calcular el desplazamiento basado en el ruido y scroll
            float displacement = noise * 0.3 * (1.0 + scroll * 0.5);
            
            // Crear el efecto de transición con ondas
            float wave = sin(parallaxUV.y * 10.0 + time + scroll * 5.0) * 0.1;
            float transition = smoothstep(0.0, 1.0, (parallaxUV.y + wave + displacement) - progress);
            
            // Colores de la cascada
            vec3 color1 = vec3(0.05, 0.3, 0.5); // Azul más profundo
            vec3 color2 = vec3(0.4, 0.7, 0.9); // Azul claro espumoso
            vec3 highlight = vec3(0.8, 0.9, 1.0); // Blanco espumoso para resaltes
            
            // Crear efecto de espuma y brillo en la cascada
            float foam = smoothstep(0.4, 0.8, noise);
            float highlights = pow(noise, 4.0) * 0.8;
            
            // Mezclar colores para crear el efecto de cascada
            vec3 waterColor = mix(color1, color2, noise);
            vec3 finalColor = mix(waterColor, highlight, highlights + foam * 0.3);
            
            // Aplicar transparencia para la transición
            float alpha = transition * (1.0 - progress);
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide
      });

      shaderMaterialRef.current = waterMaterial;

      // Crear un plano que cubra toda la pantalla
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, waterMaterial);
      scene.add(mesh);
    };

    // Animación
    const animate = () => {
      if (!shaderMaterialRef.current) return;

      const currentTime = Date.now() * 0.001;
      shaderMaterialRef.current.uniforms.time.value = currentTime;

      if (isVisible) {
        const progress = shaderMaterialRef.current.uniforms.progress.value;
        // Aceleración no lineal para el progreso
        const speed = 0.02 * (1.0 - Math.pow(progress, 2));
        shaderMaterialRef.current.uniforms.progress.value += speed;
        
        // Actualizar la dirección del flujo basada en el scroll
        const scrollY = window.pageYOffset;
        const prevScroll = shaderMaterialRef.current.uniforms.scroll.value;
        const scrollDelta = scrollY - prevScroll;
        const direction = new THREE.Vector2(
          Math.sign(scrollDelta) * 0.2,
          Math.sign(scrollDelta)
        );
        shaderMaterialRef.current.uniforms.transitionDirection.value.copy(direction);
        
        if (shaderMaterialRef.current.uniforms.progress.value >= 1.0) {
          setIsVisible(false);
        }
      } else {
        shaderMaterialRef.current.uniforms.progress.value = 0;
        shaderMaterialRef.current.uniforms.transitionDirection.value.set(0, 1);
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Manejar el redimensionamiento de la ventana
    const handleResize = () => {
      if (shaderMaterialRef.current) {
        shaderMaterialRef.current.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
      }
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    init();
    animate();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Inicializar valores
    handleScroll();
    shaderMaterialRef.current.uniforms.mousePosition.value.set(0.5, 0.5);

    // Limpieza
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current && mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    const handleStartTransition = () => {
      setIsVisible(true);
    };

    const handleEndTransition = () => {
      setIsVisible(false);
    };

    // Agregar el atributo data para el selector
    if (mountRef.current) {
      mountRef.current.setAttribute('data-water-transition', '');
    }

    mountRef.current.addEventListener('startTransition', handleStartTransition);
    mountRef.current.addEventListener('endTransition', handleEndTransition);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeEventListener('startTransition', handleStartTransition);
        mountRef.current.removeEventListener('endTransition', handleEndTransition);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 50,
        pointerEvents: 'none'
      }}
    />
  );
};

export default WaterSectionTransition;
