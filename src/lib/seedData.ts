export const sampleMachinery = [
  {
    name: "CAT 320 Excavator",
    type: "excavator",
    description:
      "Powerful hydraulic excavator perfect for digging, trenching, and material handling. Features advanced hydraulics and fuel efficiency.",
    image_url:
      "https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: {
      "Operating Weight": "20,000 kg",
      "Engine Power": "121 HP",
      "Bucket Capacity": "1.0 m³",
      "Max Digging Depth": "6.5 m",
    },
    price_per_day: 450,
    is_available: true,
    featured: true,
  },
  {
    name: "Liebherr Mobile Crane LTM 1050",
    type: "crane",
    description:
      "Mobile crane with excellent lifting capacity and reach. Ideal for construction sites and heavy lifting operations.",
    image_url:
      "https://images.pexels.com/photos/210764/pexels-photo-210764.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: {
      "Max Lifting Capacity": "50 tons",
      "Max Boom Length": "40 m",
      "Engine Power": "367 HP",
      Drive: "8x4x4",
    },
    price_per_day: 1250,
    is_available: true,
    featured: true,
  },
  {
    name: "Komatsu WA380 Wheel Loader",
    type: "loader",
    description:
      "Versatile wheel loader for loading, excavating, and material transport. High productivity and operator comfort.",
    image_url:
      "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: {
      "Operating Weight": "13,500 kg",
      "Engine Power": "197 HP",
      "Bucket Capacity": "2.3 m³",
      "Lifting Capacity": "6,800 kg",
    },
    price_per_day: 550,
    is_available: true,
    featured: true,
  },
  {
    name: "Volvo A40G Articulated Dump Truck",
    type: "dump_truck",
    description:
      "Heavy-duty articulated dump truck for hauling materials across rough terrain. High payload capacity.",
    image_url:
      "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: {
      "Payload Capacity": "40 tons",
      "Engine Power": "450 HP",
      "Body Capacity": "24 m³",
      "Max Speed": "55 km/h",
    },
    price_per_day: 750,
    is_available: true,
    featured: false,
  },
  {
    name: "CAT D8T Bulldozer",
    type: "bulldozer",
    description:
      "Powerful bulldozer for grading, clearing, and earthmoving. Excellent pushing power and blade control.",
    image_url:
      "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: {
      "Operating Weight": "37,000 kg",
      "Engine Power": "310 HP",
      "Blade Capacity": "6.2 m³",
      "Ground Pressure": "95 kPa",
    },
    price_per_day: 850,
    is_available: true,
    featured: false,
  },
  {
    name: "Hitachi ZX350 Excavator",
    type: "excavator",
    description:
      "Medium-sized excavator with exceptional fuel efficiency and operator comfort for extended operations.",
    image_url:
      "https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: {
      "Operating Weight": "35,000 kg",
      "Engine Power": "257 HP",
      "Bucket Capacity": "1.8 m³",
      "Max Digging Depth": "7.5 m",
    },
    price_per_day: 650,
    is_available: false,
    featured: false,
  },
  {
    name: "Terex RT 555 Rough Terrain Crane",
    type: "crane",
    description:
      "Rough terrain crane designed for off-road lifting. Four-wheel drive and steering for maneuverability.",
    image_url:
      "https://images.pexels.com/photos/210764/pexels-photo-210764.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: {
      "Max Lifting Capacity": "55 tons",
      "Max Boom Length": "47 m",
      "Engine Power": "350 HP",
      Drive: "4x4x4",
    },
    price_per_day: 1100,
    is_available: true,
    featured: false,
  },
  {
    name: "JCB 435S Wheel Loader",
    type: "loader",
    description:
      "Compact wheel loader perfect for confined spaces. Excellent visibility and quick attachment changes.",
    image_url:
      "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: {
      "Operating Weight": "15,800 kg",
      "Engine Power": "224 HP",
      "Bucket Capacity": "2.9 m³",
      "Lifting Capacity": "8,200 kg",
    },
    price_per_day: 600,
    is_available: true,
    featured: false,
  },
  {
    name: "Bell B30E Articulated Dump Truck",
    type: "dump_truck",
    description:
      "Reliable articulated dump truck with excellent traction and stability on challenging terrain.",
    image_url:
      "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: {
      "Payload Capacity": "28 tons",
      "Engine Power": "300 HP",
      "Body Capacity": "17 m³",
      "Max Speed": "52 km/h",
    },
    price_per_day: 650,
    is_available: true,
    featured: false,
  },
  {
    name: "Komatsu D65PX Bulldozer",
    type: "bulldozer",
    description:
      "Mid-size bulldozer with advanced electronics for precise grading and excellent productivity.",
    image_url:
      "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: {
      "Operating Weight": "20,000 kg",
      "Engine Power": "185 HP",
      "Blade Capacity": "3.9 m³",
      "Ground Pressure": "72 kPa",
    },
    price_per_day: 550,
    is_available: true,
    featured: false,
  },
];
// NOTE: seeding is now handled by the in-memory data layer. `sampleMachinery`
// is a pure static export so it can be imported without side effects.
