import { Product, Vendor, Category, Order } from './types';

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'TechVerse',
    slug: 'techverse',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200&q=80',
    rating: 4.9,
    reviewsCount: 342,
    verified: true,
    tagline: 'Precision crafted minimalist electronics & desk essentials.',
    description: 'TechVerse creates thoughtful, high-performance technology accessories designed for modern digital creators and minimalist workspaces.',
    joinedDate: 'Jan 2024',
    totalProducts: 42,
    totalOrders: 1280,
    totalRevenue: '₹14,25,000',
    ownerName: 'Sai Vardhan',
    ownerEmail: 'sai@techverse.io',
    status: 'ACTIVE',
  },
  {
    id: 'v2',
    name: 'Solace Studio',
    slug: 'solace-studio',
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    rating: 4.8,
    reviewsCount: 215,
    verified: true,
    tagline: 'Timeless rattan, solid oak, and architectural furniture.',
    description: 'Handcrafted interior objects and furniture designed with sustainable materials, organic shapes, and minimalist Scandinavian aesthetics.',
    joinedDate: 'Mar 2024',
    totalProducts: 28,
    totalOrders: 840,
    totalRevenue: '₹22,80,000',
    ownerName: 'Elena Rostova',
    ownerEmail: 'elena@solacestudio.com',
    status: 'ACTIVE',
  },
  {
    id: 'v3',
    name: 'Atelier Leather',
    slug: 'atelier-leather',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80',
    rating: 4.95,
    reviewsCount: 189,
    verified: true,
    tagline: 'Full-grain vegetable tanned Italian leather carryalls.',
    description: 'Artisanal leather goods hand-stitched using heritage techniques. Designed to age beautifully with time and daily use.',
    joinedDate: 'Feb 2024',
    totalProducts: 19,
    totalOrders: 620,
    totalRevenue: '₹18,60,000',
    ownerName: 'Marco Bellini',
    ownerEmail: 'marco@atelierleather.it',
    status: 'ACTIVE',
  },
  {
    id: 'v4',
    name: 'Lumina Audio',
    slug: 'lumina-audio',
    logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=80',
    rating: 4.7,
    reviewsCount: 124,
    verified: false,
    tagline: 'Acoustically tuned planar magnetic headphones & speakers.',
    description: 'Pure acoustic engineering encased in matte aluminum and soft acoustic wool. Delivering studio clarity for audiophiles.',
    joinedDate: 'May 2024',
    totalProducts: 12,
    totalOrders: 310,
    totalRevenue: '₹9,40,000',
    ownerName: 'Aarav Mehta',
    ownerEmail: 'aarav@luminaaudio.com',
    status: 'PENDING',
  }
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'c1',
    name: 'Electronics & Audio',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    description: 'Precision acoustics, wireless typing, and minimalist desk gear.',
    subcategories: ['Audio', 'Keyboards', 'Accessories', 'Displays'],
    productCount: 48,
  },
  {
    id: 'c2',
    name: 'Furniture & Living',
    slug: 'furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    description: 'Editorial lounge seating, marble tables, and sculptural lighting.',
    subcategories: ['Seating', 'Lighting', 'Tables', 'Decor'],
    productCount: 36,
  },
  {
    id: 'c3',
    name: 'Leather Goods & Carry',
    slug: 'leather-goods',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    description: 'Hand-stitched Italian leather bags, wallets, and travel folios.',
    subcategories: ['Backpacks', 'Folios', 'Wallets', 'Straps'],
    productCount: 24,
  },
  {
    id: 'c4',
    name: 'Apparel & Objects',
    slug: 'apparel',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80',
    description: 'Heavyweight organic cotton, tailored outerwear, and modern timepieces.',
    subcategories: ['Outerwear', 'Knitwear', 'Timepieces', 'Eyewear'],
    productCount: 32,
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Cowboy 4 Wireless Electric City Bike',
    slug: 'cowboy-4-electric-bike',
    vendorId: 'v1',
    vendorName: 'TechVerse',
    vendorSlug: 'techverse',
    categoryId: 'c1',
    categoryName: 'Electronics & Audio',
    subcategory: 'Accessories',
    price: 149999,
    originalPrice: 179999,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1000&q=80',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1000&q=80'
    ],
    description: 'Connected electric bike with sleek integrated wireless phone charging cockpit, hydraulic disc brakes, and automatic torque assistance.',
    specifications: {
      'Frame': '6061 Aluminum Alloy',
      'Battery': '360Wh Removable Li-Ion',
      'Range': '70 km per charge',
      'Weight': '18.9 kg'
    },
    stock: 14,
    sku: 'CB-401-BLK',
    isFeatured: true,
    isNew: true,
    status: 'Active',
    variants: [
      { id: 'v1', name: 'Color', options: ['Obsidian Black', 'Sand', 'Khaki'] },
      { id: 'v2', name: 'Frame', options: ['Standard', 'Step-Through'] }
    ]
  },
  {
    id: 'p2',
    name: 'Onyx Cane & Solid Oak Armchair',
    slug: 'onyx-cane-oak-armchair',
    vendorId: 'v2',
    vendorName: 'Solace Studio',
    vendorSlug: 'solace-studio',
    categoryId: 'c2',
    categoryName: 'Furniture & Living',
    subcategory: 'Seating',
    price: 34999,
    originalPrice: 42999,
    discountPercentage: 18,
    rating: 4.8,
    reviewCount: 46,
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=1000&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1000&q=80'
    ],
    description: 'Architectural lounge armchair crafted from solid blackened oak with hand-woven natural rattan cane webbing backrest.',
    specifications: {
      'Material': 'Solid Oak & Natural Rattan',
      'Dimensions': '68W x 74D x 78H cm',
      'Finish': 'Matte Charcoal Wax',
      'Craft': 'Handcrafted in Sweden'
    },
    stock: 6,
    sku: 'SL-CH-802',
    isFeatured: true,
    isNew: false,
    status: 'Low Stock',
    variants: [
      { id: 'v1', name: 'Finish', options: ['Blackened Oak', 'Natural Ash'] }
    ]
  },
  {
    id: 'p3',
    name: 'Smart Typewriter Mechanical Terminal',
    slug: 'smart-typewriter-terminal',
    vendorId: 'v1',
    vendorName: 'TechVerse',
    vendorSlug: 'techverse',
    categoryId: 'c1',
    categoryName: 'Electronics & Audio',
    subcategory: 'Keyboards',
    price: 49999,
    originalPrice: 59999,
    discountPercentage: 16,
    rating: 4.95,
    reviewCount: 112,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&q=80',
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=1000&q=80'
    ],
    description: 'Distraction-free electronic drafting device with front-lit E-Ink screen, Cherry MX Brown mechanical switches, and die-cast aluminum chassis.',
    specifications: {
      'Display': '4.3-inch E-Ink Ambient Screen',
      'Switches': 'Cherry MX Brown Mechanical',
      'Sync': 'Direct Wi-Fi Cloud Sync (Dropbox/Google Drive)',
      'Battery': '4 Weeks Writing Time'
    },
    stock: 22,
    sku: 'TV-TW-900',
    isFeatured: true,
    isNew: true,
    status: 'Active'
  },
  {
    id: 'p4',
    name: 'Vegetable Tanned Leather Weekender Bag',
    slug: 'vegetable-tanned-leather-weekender',
    vendorId: 'v3',
    vendorName: 'Atelier Leather',
    vendorSlug: 'atelier-leather',
    categoryId: 'c3',
    categoryName: 'Leather Goods & Carry',
    subcategory: 'Backpacks',
    price: 28999,
    originalPrice: 34999,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&q=80'
    ],
    description: 'Spacious duffel bag cut from 3.5mm Tuscan full-grain leather. Reinforced brass hardware, suede lining, and removable shoulder strap.',
    specifications: {
      'Leather': 'Tuscan Full-Grain Vegetable Tanned',
      'Capacity': '42 Liters',
      'Hardware': 'Solid Antiqued Brass',
      'Weight': '2.1 kg'
    },
    stock: 9,
    sku: 'AL-WK-303',
    isFeatured: true,
    isNew: false,
    status: 'Active',
    variants: [
      { id: 'v1', name: 'Leather Color', options: ['Cognac Tan', 'Espresso Dark Brown', 'Black'] }
    ]
  },
  {
    id: 'p5',
    name: 'Planar Sound Studio Reference Headphones',
    slug: 'planar-sound-reference-headphones',
    vendorId: 'v4',
    vendorName: 'Lumina Audio',
    vendorSlug: 'lumina-audio',
    categoryId: 'c1',
    categoryName: 'Electronics & Audio',
    subcategory: 'Audio',
    price: 38999,
    originalPrice: 45999,
    discountPercentage: 15,
    rating: 4.75,
    reviewCount: 39,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80'
    ],
    description: 'Open-back planar magnetic headphones built for ultra-clean soundstage reproduction, lambskin leather ear cushions, and detachable braided cable.',
    specifications: {
      'Driver Type': '106mm Planar Magnetic',
      'Frequency Response': '10 Hz - 50 kHz',
      'Impedance': '32 Ohms',
      'Cable': '6.35mm Braided OFC Copper'
    },
    stock: 4,
    sku: 'LA-HP-500',
    isFeatured: false,
    isNew: true,
    status: 'Low Stock'
  },
  {
    id: 'p6',
    name: 'Century Sculptural Brass Table Lamp',
    slug: 'century-brass-table-lamp',
    vendorId: 'v2',
    vendorName: 'Solace Studio',
    vendorSlug: 'solace-studio',
    categoryId: 'c2',
    categoryName: 'Furniture & Living',
    subcategory: 'Lighting',
    price: 18499,
    originalPrice: 22000,
    discountPercentage: 16,
    rating: 4.85,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1000&q=80'
    ],
    description: 'Solid spun brass desk fixture with adjustable shade direction and warm dimmable warm LED module.',
    specifications: {
      'Material': 'Solid Spun Brass',
      'Bulb': 'Warm 2700K Dimmable LED',
      'Dimensions': '24W x 38H cm'
    },
    stock: 18,
    sku: 'SL-LP-104',
    isFeatured: false,
    isNew: false,
    status: 'Active'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'MG-104829',
    customerName: 'Sai Vardhan',
    customerEmail: 'sai.customer@marketgrid.io',
    shippingAddress: {
      fullName: 'Sai Vardhan',
      street: '42 Jubilee Hills, Road No. 36',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500033',
      phone: '+91 98765 43210'
    },
    subOrders: [
      {
        vendorId: 'v1',
        vendorName: 'TechVerse',
        items: [
          {
            product: MOCK_PRODUCTS[2], // Typewriter
            quantity: 1
          }
        ],
        subtotal: 49999,
        status: 'Shipped',
        trackingNumber: 'TRK-TV-88201',
        estimatedDelivery: '24–26 September'
      },
      {
        vendorId: 'v2',
        vendorName: 'Solace Studio',
        items: [
          {
            product: MOCK_PRODUCTS[1], // Armchair
            quantity: 1
          }
        ],
        subtotal: 34999,
        status: 'Packed',
        trackingNumber: 'TRK-SL-90312',
        estimatedDelivery: '26–28 September'
      }
    ],
    grandTotal: 85098,
    deliveryFee: 100,
    orderDate: '19 September 2026',
    paymentStatus: 'Paid',
    paymentMethod: 'Razorpay / Credit Card',
    globalStatus: 'Partially Shipped'
  },
  {
    id: 'MG-104828',
    customerName: 'Ananya Rao',
    customerEmail: 'ananya@example.com',
    shippingAddress: {
      fullName: 'Ananya Rao',
      street: '128 Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      zipCode: '560038',
      phone: '+91 91234 56789'
    },
    subOrders: [
      {
        vendorId: 'v3',
        vendorName: 'Atelier Leather',
        items: [
          {
            product: MOCK_PRODUCTS[3], // Leather Bag
            quantity: 1
          }
        ],
        subtotal: 28999,
        status: 'Delivered',
        trackingNumber: 'TRK-AL-11029',
        estimatedDelivery: 'Delivered 18 Sep'
      }
    ],
    grandTotal: 29099,
    deliveryFee: 100,
    orderDate: '16 September 2026',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI / Google Pay',
    globalStatus: 'Delivered'
  }
];
