import React from 'react';

const SectionContent = ({ sectionId, riverName = "Rio de Oro" }) => {
  const getContent = () => {
    switch (sectionId) {
      case 'introduccion':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
                <p className="text-xl text-[#2e3331] leading-relaxed mb-6 font-medium">
                  El Rio de Oro serpentea majestuosamente a través de las montañas del Cauca, 
                  llevando consigo sedimentos dorados que le dan su nombre característico.
                </p>
                <p className="text-lg text-[#2e3331] leading-relaxed opacity-90">
                  Sus aguas cristalinas reflejan la luz del sol creando destellos dorados 
                  que han cautivado a viajeros y comunidades locales durante siglos. Este río 
                  representa la conexión ancestral entre las montañas y los valles, siendo testigo 
                  de historias que se han transmitido de generación en generación.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="h-80 lg:h-96 relative overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src="/rio-de-oro.jpg" 
                    alt="Rio de Oro" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'origen':
        return (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 h-full">
                  <h3 className="text-2xl font-bold text-[#1b7895] mb-6">Nacimiento en las Alturas</h3>
                  <p className="text-lg text-[#2e3331] leading-relaxed mb-4">
                    Desde las cumbres de la cordillera Central, donde los vientos andinos moldean el paisaje 
                    y la vegetación de páramo abraza las alturas, nacen las aguas del Rio de Oro.
                  </p>
                  <p className="text-lg text-[#2e3331] leading-relaxed">
                    Los minerales naturales de la montaña se mezclan con las aguas 
                    creando esa tonalidad dorada única que da nombre al río, 
                    mientras desciende creando cascadas y pozos naturales de incomparable belleza.
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-b from-[#98bac6] to-[#afd0d8] rounded-2xl h-80 flex items-center justify-center shadow-xl border border-white/30">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">🏔️</div>
                    <p className="text-[#2e3331] font-medium">Cordillera Central</p>
                    <p className="text-[#2e3331] opacity-70 text-sm mt-2">3,500+ metros sobre el nivel del mar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'desafios':
        return (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
                  <h3 className="text-2xl font-bold text-[#1b7895] mb-4 flex items-center">
                    <span className="text-3xl mr-3">🌱</span>
                    Conservación Activa
                  </h3>
                  <p className="text-lg text-[#2e3331] leading-relaxed">
                    Las comunidades locales han desarrollado prácticas sostenibles de turismo ecológico 
                    que permiten disfrutar de las aguas doradas del río.
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
                  <h3 className="text-2xl font-bold text-[#1b7895] mb-4 flex items-center">
                    <span className="text-3xl mr-3">⚖️</span>
                    Equilibrio Natural
                  </h3>
                  <p className="text-lg text-[#2e3331] leading-relaxed">
                    El Rio de Oro ha sido históricamente valorado por su belleza natural y recursos minerales, 
                    creando un balance entre protección y desarrollo sostenible.
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-2xl p-8 h-full flex items-center justify-center border border-white/30">
                  <div className="text-center">
                    <div className="text-8xl mb-6">🌿</div>
                    <h4 className="text-2xl font-bold text-[#1b7895] mb-4">Futuro Sostenible</h4>
                    <p className="text-lg text-[#2e3331] opacity-80">
                      Preservando este tesoro natural para las futuras generaciones
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'cultura':
        return (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-12 border border-white/30">
                <h3 className="text-3xl font-bold text-[#1b7895] mb-8">Patrimonio Cultural Vivo</h3>
                <p className="text-xl text-[#2e3331] leading-relaxed mb-6">
                  Para las comunidades que habitan sus riberas, el Rio de Oro representa mucho más que agua; 
                  es una fuente de inspiración, leyendas y tradiciones que se transmiten de generación en generación.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 text-center">
                <div className="text-5xl mb-4">🎵</div>
                <h4 className="text-xl font-bold text-[#1b7895] mb-3">Canciones</h4>
                <p className="text-[#2e3331] opacity-90">
                  Melodías que narran la historia del río dorado
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 text-center">
                <div className="text-5xl mb-4">📖</div>
                <h4 className="text-xl font-bold text-[#1b7895] mb-3">Relatos</h4>
                <p className="text-[#2e3331] opacity-90">
                  Historias transmitidas de generación en generación
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 text-center">
                <div className="text-5xl mb-4">🎨</div>
                <h4 className="text-xl font-bold text-[#1b7895] mb-3">Arte</h4>
                <p className="text-[#2e3331] opacity-90">
                  Expresiones artísticas inspiradas en sus aguas
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return <p>Contenido no encontrado</p>;
    }
  };

  const getSectionTitle = () => {
    switch (sectionId) {
      case 'introduccion':
        return 'Introducción';
      case 'origen':
        return 'Origen Natural';
      case 'desafios':
        return 'Desafíos y Resiliencia';
      case 'cultura':
        return 'Conexión Cultural';
      default:
        return 'Sección';
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#1b7895] mb-6 text-center">{getSectionTitle()}</h3>
      {getContent()}
    </div>
  );
};

export default SectionContent;