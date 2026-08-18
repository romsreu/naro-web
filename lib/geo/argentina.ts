export const PAISES = ['Argentina'] as const

export const PROVINCIAS_ARGENTINA: Record<string, string[]> = {
  'Buenos Aires': ['La Plata', 'Mar del Plata', 'Bahía Blanca', 'San Isidro', 'Quilmes', 'Tandil'],
  'Ciudad Autónoma de Buenos Aires': ['Ciudad Autónoma de Buenos Aires'],
  Catamarca: ['San Fernando del Valle de Catamarca', 'Andalgalá', 'Belén'],
  Chaco: ['Resistencia', 'Presidencia Roque Sáenz Peña', 'Villa Ángela'],
  Chubut: ['Rawson', 'Comodoro Rivadavia', 'Trelew', 'Puerto Madryn'],
  Córdoba: ['Córdoba', 'Villa Carlos Paz', 'Río Cuarto', 'Villa María'],
  Corrientes: ['Corrientes', 'Goya', 'Mercedes'],
  'Entre Ríos': ['Paraná', 'Concordia', 'Gualeguaychú'],
  Formosa: ['Formosa', 'Clorinda', 'Pirané'],
  Jujuy: ['San Salvador de Jujuy', 'Palpalá', 'Perico'],
  'La Pampa': ['Santa Rosa', 'General Pico'],
  'La Rioja': ['La Rioja', 'Chilecito'],
  Mendoza: ['Mendoza', 'San Rafael', 'Godoy Cruz', 'Luján de Cuyo'],
  Misiones: ['Posadas', 'Oberá', 'Eldorado', 'Puerto Iguazú'],
  Neuquén: ['Neuquén', 'San Martín de los Andes', 'Zapala'],
  'Río Negro': ['Viedma', 'San Carlos de Bariloche', 'General Roca'],
  Salta: ['Salta', 'Orán', 'Tartagal'],
  'San Juan': ['San Juan', 'Rawson', 'Chimbas'],
  'San Luis': ['San Luis', 'Villa Mercedes'],
  'Santa Cruz': ['Río Gallegos', 'Caleta Olivia', 'El Calafate'],
  'Santa Fe': ['Santa Fe', 'Rosario', 'Rafaela', 'Venado Tuerto'],
  'Santiago del Estero': ['Santiago del Estero', 'La Banda', 'Termas de Río Hondo'],
  'Tierra del Fuego': ['Ushuaia', 'Río Grande'],
  Tucumán: ['San Miguel de Tucumán', 'Tafí Viejo', 'Yerba Buena'],
}

export const PROVINCIAS = Object.keys(PROVINCIAS_ARGENTINA)
