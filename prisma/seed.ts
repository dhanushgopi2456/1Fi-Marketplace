import 'dotenv/config';
import { prisma } from '../lib/prisma.js';

async function main() {
  console.log('Clearing existing records...');
  await prisma.order.deleteMany({});
  await prisma.emiPlan.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Seeding default user...');
  const demoUser = await prisma.user.create({
    data: {
      id: 'usr_demo_01',
      name: 'Gopi Dhanush',
      email: 'gopidhanush615@gmail.com',
      phone: '+91 98765 43210',
    },
  });

  console.log('Seeding products across all categories and brands...');

  // Helper to generate realistic EMI plans given selling price
  function generateEmiPlans(sellingPrice: number, cashbackAmount: number = 7500) {
    const plans = [
      { tenure: 3, rate: 0, processingFee: 0 },
      { tenure: 6, rate: 0, processingFee: 0 },
      { tenure: 12, rate: 0, processingFee: 0 },
      { tenure: 24, rate: 0, processingFee: 499 },
      { tenure: 36, rate: 10.5, processingFee: 999 },
      { tenure: 48, rate: 10.5, processingFee: 1499 },
      { tenure: 60, rate: 10.5, processingFee: 1999 },
    ];

    return plans.map((p) => {
      let monthly: number;
      let totalPayable: number;
      if (p.rate === 0) {
        monthly = Math.round(sellingPrice / p.tenure);
        totalPayable = sellingPrice + p.processingFee;
      } else {
        const monthlyRate = p.rate / 12 / 100;
        const emi =
          (sellingPrice * monthlyRate * Math.pow(1 + monthlyRate, p.tenure)) /
          (Math.pow(1 + monthlyRate, p.tenure) - 1);
        monthly = Math.round(emi);
        totalPayable = Math.round(monthly * p.tenure + p.processingFee);
      }

      return {
        tenureMonths: p.tenure,
        monthlyPayment: monthly,
        interestRate: p.rate,
        cashback: cashbackAmount,
        processingFee: p.processingFee,
        totalPayable,
        active: true,
      };
    });
  }

  // ==========================================
  // --- 1. CATEGORY: Smartphones ---
  // ==========================================

  // 1.1 Apple iPhone 17 Pro (Brand: Apple)
  await prisma.product.create({
    data: {
      slug: 'iphone-17-pro',
      name: 'Apple iPhone 17 Pro',
      brand: 'Apple',
      category: 'Smartphones',
      description:
        'iPhone 17 Pro forged in titanium with cutting-edge aerospace engineering, groundbreaking A19 Pro Bionic chip, pro camera system with next-generation telephoto zoom, and industry-leading battery efficiency. Backed by flexible 1Fi mutual fund-linked EMI options.',
      variants: {
        create: [
          {
            color: 'Silver',
            storage: '256 GB',
            sku: 'APL-IP17P-SLV-256',
            mrp: 134900,
            price: 127400,
            stock: 24,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80', alt: 'Apple iPhone 17 Pro Silver - Front and Back view', sortOrder: 1 },
                { url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80', alt: 'Apple iPhone 17 Pro Silver - Angle Profile', sortOrder: 2 },
              ],
            },
            emiPlans: { create: generateEmiPlans(127400, 7500) },
          },
          {
            color: 'Orange',
            storage: '256 GB',
            sku: 'APL-IP17P-ORG-256',
            mrp: 134900,
            price: 127400,
            stock: 18,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80', alt: 'Apple iPhone 17 Pro Sunset Orange Edition', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(127400, 7500) },
          },
        ],
      },
    },
  });

  // 1.2 Apple iPhone 16 (Brand: Apple)
  await prisma.product.create({
    data: {
      slug: 'apple-iphone-16',
      name: 'Apple iPhone 16',
      brand: 'Apple',
      category: 'Smartphones',
      description:
        'Meet iPhone 16. Built for Apple Intelligence with Camera Control, 48MP Fusion camera with 2x optical-quality Telephoto, next-generation Photographic Styles, and A18 chip.',
      variants: {
        create: [
          {
            color: 'Ultramarine',
            storage: '128 GB',
            sku: 'APL-IP16-ULT-128',
            mrp: 79900,
            price: 74900,
            stock: 30,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=1000&q=80', alt: 'Apple iPhone 16 Ultramarine Edition', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(74900, 4500) },
          },
          {
            color: 'Teal',
            storage: '256 GB',
            sku: 'APL-IP16-TEL-256',
            mrp: 89900,
            price: 84900,
            stock: 20,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=1000&q=80', alt: 'Apple iPhone 16 Teal Edition', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(84900, 5000) },
          },
        ],
      },
    },
  });

  // 1.3 Samsung Galaxy S24 Ultra (Brand: Samsung)
  await prisma.product.create({
    data: {
      slug: 'samsung-galaxy-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      category: 'Smartphones',
      description:
        'Galaxy S24 Ultra with Galaxy AI built-in, Titanium frame, 200MP Quad Tele camera, embedded S Pen, and stunning 6.8-inch Dynamic AMOLED 2X flat display with Corning Gorilla Armor.',
      variants: {
        create: [
          {
            color: 'Titanium Gray',
            storage: '256 GB',
            sku: 'SAM-S24U-GRY-256',
            mrp: 134999,
            price: 129999,
            stock: 20,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80', alt: 'Samsung Galaxy S24 Ultra Titanium Front', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(129999, 7000) },
          },
        ],
      },
    },
  });

  // 1.4 Google Pixel 9 Pro (Brand: Google)
  await prisma.product.create({
    data: {
      slug: 'google-pixel-9-pro',
      name: 'Google Pixel 9 Pro',
      brand: 'Google',
      category: 'Smartphones',
      description:
        'Pixel 9 Pro engineered with Google Tensor G4, Gemini Nano multi-modal on-device AI, pro-grade triple rear camera with 30x Super Res Zoom, and a brilliant Super Actua display.',
      variants: {
        create: [
          {
            color: 'Obsidian',
            storage: '256 GB',
            sku: 'GOOG-PX9P-OBS-256',
            mrp: 119999,
            price: 109999,
            stock: 16,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80', alt: 'Google Pixel 9 Pro Obsidian Front View', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(109999, 6500) },
          },
        ],
      },
    },
  });

  // ==========================================
  // --- 2. CATEGORY: Electronics ---
  // ==========================================

  // 2.1 Apple MacBook Pro 16" M4 Max (Brand: Apple)
  await prisma.product.create({
    data: {
      slug: 'apple-macbook-pro-16-m4-max',
      name: 'Apple MacBook Pro 16" M4 Max',
      brand: 'Apple',
      category: 'Electronics',
      description:
        'The ultimate professional powerhouse with Apple M4 Max chip, Liquid Retina XDR display with 1600 nits peak brightness, and up to 24 hours of battery life.',
      variants: {
        create: [
          {
            color: 'Space Black',
            storage: '1 TB SSD',
            sku: 'APL-MBP16-M4M-BLK-1TB',
            mrp: 349900,
            price: 329900,
            stock: 10,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80', alt: 'Apple MacBook Pro 16 Space Black', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(329900, 15000) },
          },
        ],
      },
    },
  });

  // 2.2 Sony WH-1000XM5 ANC Headphones (Brand: Sony)
  await prisma.product.create({
    data: {
      slug: 'sony-wh-1000xm5-headphones',
      name: 'Sony WH-1000XM5 ANC Headphones',
      brand: 'Sony',
      category: 'Electronics',
      description:
        'Industry-leading noise cancellation powered by dual processors and 8 microphones. Hi-Res Audio wireless, Speak-to-Chat, and 30-hour battery life.',
      variants: {
        create: [
          {
            color: 'Silver',
            storage: 'Wireless Hi-Res',
            sku: 'SNY-XM5-SLV',
            mrp: 34990,
            price: 29990,
            stock: 35,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80', alt: 'Sony WH-1000XM5 Premium Headphones', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(29990, 2000) },
          },
          {
            color: 'Black',
            storage: 'Wireless Hi-Res',
            sku: 'SNY-XM5-BLK',
            mrp: 34990,
            price: 29990,
            stock: 40,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80', alt: 'Sony WH-1000XM5 Black Edition', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(29990, 2000) },
          },
        ],
      },
    },
  });

  // 2.3 Sony PlayStation 5 Pro Console (Brand: Sony)
  await prisma.product.create({
    data: {
      slug: 'sony-playstation-5-pro',
      name: 'Sony PlayStation 5 Pro Console',
      brand: 'Sony',
      category: 'Electronics',
      description:
        'PlayStation 5 Pro unleashes next-generation gaming with upgraded GPU, advanced ray tracing, PlayStation Spectral Super Resolution (PSSR), and 2TB high-speed NVMe SSD.',
      variants: {
        create: [
          {
            color: 'Glacier White',
            storage: '2 TB SSD',
            sku: 'SNY-PS5PRO-2TB',
            mrp: 79990,
            price: 69990,
            stock: 18,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80', alt: 'Sony PlayStation 5 Pro Gaming Console', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(69990, 4000) },
          },
        ],
      },
    },
  });

  // 2.4 Google Pixel Watch 3 (Brand: Google)
  await prisma.product.create({
    data: {
      slug: 'google-pixel-watch-3',
      name: 'Google Pixel Watch 3 (45mm LTE)',
      brand: 'Google',
      category: 'Electronics',
      description:
        'Bigger Actua display with 2000 nits peak brightness, custom fitness readiness guidance powered by Fitbit, Loss of Pulse Detection, and all-day battery with fast charging.',
      variants: {
        create: [
          {
            color: 'Matte Black',
            storage: '45mm Actua LTE',
            sku: 'GOOG-PW3-BLK-45',
            mrp: 47990,
            price: 43990,
            stock: 22,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80', alt: 'Google Pixel Watch 3 Smartwatch', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(43990, 2500) },
          },
        ],
      },
    },
  });

  // 2.5 Google Pixel Buds Pro 2 (Brand: Google)
  await prisma.product.create({
    data: {
      slug: 'google-pixel-buds-pro-2',
      name: 'Google Pixel Buds Pro 2 with Tensor A1',
      brand: 'Google',
      category: 'Electronics',
      description:
        'Empowered by Tensor A1 audio processing, Silent Seal 2.0 active noise cancellation, Gemini Live hands-free conversation, and ultra-comfortable twist-to-fit wing stabilizer.',
      variants: {
        create: [
          {
            color: 'Porcelain',
            storage: 'Spatial Audio with Head Tracking',
            sku: 'GOOG-PBP2-POR',
            mrp: 24900,
            price: 22900,
            stock: 30,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80', alt: 'Google Pixel Buds Pro 2 True Wireless Earbuds', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(22900, 1500) },
          },
        ],
      },
    },
  });

  // 2.6 Samsung Galaxy Watch Ultra (Brand: Samsung)
  await prisma.product.create({
    data: {
      slug: 'samsung-galaxy-watch-ultra',
      name: 'Samsung Galaxy Watch Ultra (47mm Titanium)',
      brand: 'Samsung',
      category: 'Electronics',
      description:
        'Cushion-design titanium case resilient to 10 ATM and 55°C heat. Dual-frequency GPS, Multi-Sport workout tracking, and 100-hour battery life in power saving mode.',
      variants: {
        create: [
          {
            color: 'Titanium Gray',
            storage: '47mm LTE Sapphire',
            sku: 'SAM-GWU-GRY-47',
            mrp: 64999,
            price: 59999,
            stock: 15,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80', alt: 'Samsung Galaxy Watch Ultra Titanium', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(59999, 3500) },
          },
        ],
      },
    },
  });

  // 2.7 Apple Watch Ultra 2 (Brand: Apple)
  await prisma.product.create({
    data: {
      slug: 'apple-watch-ultra-2',
      name: 'Apple Watch Ultra 2 GPS + Cellular (49mm)',
      brand: 'Apple',
      category: 'Electronics',
      description:
        'The most rugged and capable Apple Watch. 49mm aerospace titanium case, 3000-nit Always-On Retina display, S9 SiP with Double Tap gesture, and precision dual-frequency GPS.',
      variants: {
        create: [
          {
            color: 'Natural Titanium',
            storage: '49mm Oceanic Band',
            sku: 'APL-AWU2-NAT-49',
            mrp: 89900,
            price: 84900,
            stock: 12,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1000&q=80', alt: 'Apple Watch Ultra 2 GPS Titanium', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(84900, 5000) },
          },
        ],
      },
    },
  });

  // ==========================================
  // --- 3. CATEGORY: TV, AC & Appliances ---
  // ==========================================

  // 3.1 LG 65" OLED evo G4 4K Smart Cinema TV (Brand: LG)
  await prisma.product.create({
    data: {
      slug: 'lg-65-oled-evo-g4-4k-tv',
      name: 'LG 65" OLED evo G4 4K Smart TV',
      brand: 'LG',
      category: 'TV, AC & Appliances',
      description:
        'Next-generation Brightness Booster Max powered by the α11 AI Processor 4K. Zero-gap Gallery Design, 144Hz VRR gaming, Dolby Vision, and 5-year OLED panel warranty.',
      variants: {
        create: [
          {
            color: 'Gallery Titanium',
            storage: '65 Inch 4K OLED',
            sku: 'LG-OLED65G4-TIT',
            mrp: 279990,
            price: 239990,
            stock: 9,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80', alt: 'LG 65 inch OLED evo G4 Home Cinema Setup', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(239990, 10000) },
          },
        ],
      },
    },
  });

  // 3.2 Samsung 65" Neo QLED 4K Smart AI TV (QN90D) (Brand: Samsung)
  await prisma.product.create({
    data: {
      slug: 'samsung-65-neo-qled-4k-ai-tv',
      name: 'Samsung 65" Neo QLED 4K Smart AI TV (QN90D)',
      brand: 'Samsung',
      category: 'TV, AC & Appliances',
      description:
        'NQ4 AI Gen2 Processor with 20 AI neural networks, Quantum Matrix Technology with Mini LEDs, Anti-Glare screen, Dolby Atmos with Object Tracking Sound+, and Motion Xcelerator 144Hz.',
      variants: {
        create: [
          {
            color: 'Titan Black',
            storage: '65 Inch Neo QLED Mini-LED',
            sku: 'SAM-QN65Q90D-BLK',
            mrp: 219990,
            price: 179990,
            stock: 14,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1000&q=80', alt: 'Samsung Neo QLED 4K Smart TV in Modern Living Room', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(179990, 8500) },
          },
        ],
      },
    },
  });

  // 3.3 Sony Bravia XR 65" 4K OLED Google TV (Brand: Sony)
  await prisma.product.create({
    data: {
      slug: 'sony-bravia-xr-65-oled-tv',
      name: 'Sony Bravia XR 65" 4K OLED Google TV (A80L)',
      brand: 'Sony',
      category: 'TV, AC & Appliances',
      description:
        'Cognitive Processor XR delivers pure black and dazzling brightness. Acoustic Surface Audio+ turns the entire screen into a speaker, perfect for PlayStation 5 with Auto HDR Tone Mapping.',
      variants: {
        create: [
          {
            color: 'Titanium Black Metal',
            storage: '65 Inch XR OLED (Acoustic Audio)',
            sku: 'SNY-XR65A80L-TIT',
            mrp: 249990,
            price: 219990,
            stock: 11,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1577979749830-f1d742b96791?auto=format&fit=crop&w=1000&q=80', alt: 'Sony Bravia XR 65 inch OLED Google TV Display', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(219990, 9500) },
          },
        ],
      },
    },
  });

  // 3.4 LG AI Dual Inverter Split AC 1.5 Ton 5-Star (Brand: LG)
  await prisma.product.create({
    data: {
      slug: 'lg-ai-dual-inverter-split-ac',
      name: 'LG 1.5 Ton 5-Star AI Dual Inverter Wi-Fi Split AC',
      brand: 'LG',
      category: 'TV, AC & Appliances',
      description:
        'AI Dual Inverter with 6-in-1 convertible cooling modes, ThinQ Wi-Fi voice control, 100% copper condenser with Ocean Black Protection, and anti-virus HD filter.',
      variants: {
        create: [
          {
            color: 'Mirror Black Glass',
            storage: '1.5 Ton 5-Star (Super Convertible)',
            sku: 'LG-AC15T-AI-BLK',
            mrp: 65990,
            price: 46990,
            stock: 25,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=80', alt: 'LG Dual Inverter Smart Air Conditioner Unit', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(46990, 2500) },
          },
        ],
      },
    },
  });

  // 3.5 Daikin 1.5 Ton 5-Star Smart Inverter AC (Brand: Daikin)
  await prisma.product.create({
    data: {
      slug: 'daikin-1-5-ton-5-star-smart-inverter-ac',
      name: 'Daikin 1.5 Ton 5-Star Smart Inverter AC',
      brand: 'Daikin',
      category: 'TV, AC & Appliances',
      description:
        'Streamer Discharge technology for air purification, Dew Clean self-cleaning evaporator, Neo Swing compressor with PM2.5 filter, and built-in Wi-Fi voice control.',
      variants: {
        create: [
          {
            color: 'Pure White',
            storage: '1.5 Ton (Copper Condenser)',
            sku: 'DKN-AC15T-5S-WHT',
            mrp: 67900,
            price: 49990,
            stock: 22,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=80', alt: 'Daikin Smart Inverter Split Air Conditioner Unit', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(49990, 3000) },
          },
        ],
      },
    },
  });

  // 3.6 LG 655L Frost-Free InstaView Side-by-Side Refrigerator (Brand: LG)
  await prisma.product.create({
    data: {
      slug: 'lg-instaview-door-in-door-refrigerator',
      name: 'LG 655L Frost-Free InstaView Refrigerator',
      brand: 'LG',
      category: 'TV, AC & Appliances',
      description:
        'Knock twice to see 23% more of what is inside without opening the door. LinearCooling reduces temperature fluctuations, DoorCooling+ provides even freshness, and UVnano dispenser sanitizes water nozzle.',
      variants: {
        create: [
          {
            color: 'Matte Black Steel',
            storage: '655L Side-by-Side Inverter',
            sku: 'LG-REF655-INSTA-BLK',
            mrp: 149990,
            price: 119990,
            stock: 8,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1000&q=80', alt: 'LG InstaView Door-in-Door Refrigerator in Luxury Kitchen', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(119990, 6000) },
          },
        ],
      },
    },
  });

  // 3.7 Samsung 650L Bespoke AI French Door Smart Refrigerator (Brand: Samsung)
  await prisma.product.create({
    data: {
      slug: 'samsung-bespoke-ai-refrigerator',
      name: 'Samsung 650L Bespoke AI French Door Smart Refrigerator',
      brand: 'Samsung',
      category: 'TV, AC & Appliances',
      description:
        'AI Family Hub touchscreen with internal food recognition cameras, Auto Open Door sensor, Beverage Center with auto-fill pitcher, and Twin Cooling Plus technology.',
      variants: {
        create: [
          {
            color: 'Clean White Glass',
            storage: '650L 4-Door French Door',
            sku: 'SAM-BESPOKE-REF-650',
            mrp: 189990,
            price: 149990,
            stock: 6,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80', alt: 'Samsung Bespoke AI Refrigerator Kitchen Interior', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(149990, 7500) },
          },
        ],
      },
    },
  });

  // 3.8 Dyson V15 Detect Extra Cordless Vacuum (Brand: Dyson)
  await prisma.product.create({
    data: {
      slug: 'dyson-v15-detect-extra-cordless-vacuum',
      name: 'Dyson V15 Detect Extra Cordless Vacuum',
      brand: 'Dyson',
      category: 'TV, AC & Appliances',
      description:
        'Laser illumination reveals microscopic dust. Piezo sensor scientifically measures dust particle counts and boosts suction power automatically. Up to 60 minutes run time.',
      variants: {
        create: [
          {
            color: 'Yellow / Nickel',
            storage: 'Cordless 240AW Suction',
            sku: 'DYS-V15-EX-YEL',
            mrp: 68900,
            price: 59900,
            stock: 18,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1000&q=80', alt: 'Dyson Cordless Vacuum Cleaner in Modern Home', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(59900, 3500) },
          },
        ],
      },
    },
  });

  // ==========================================
  // --- 4. CATEGORY: Kitchen & Home ---
  // ==========================================

  // 4.1 De'Longhi Magnifica S Espresso Maker (Brand: De'Longhi)
  await prisma.product.create({
    data: {
      slug: 'delonghi-magnifica-s-espresso-maker',
      name: "De'Longhi Magnifica S Automatic Espresso Maker",
      brand: "De'Longhi",
      category: 'Kitchen & Home',
      description:
        'Bean-to-cup authentic Italian coffee maker with 15-bar pump pressure, manual milk frothing wand for velvety cappuccinos, and integrated steel conical burr grinder.',
      variants: {
        create: [
          {
            color: 'Gloss Black',
            storage: '1.8L Water Tank',
            sku: 'DLG-MAGS-BLK',
            mrp: 58990,
            price: 44990,
            stock: 15,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1000&q=80', alt: "De'Longhi Espresso Coffee Machine Pouring Rich Crema", sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(44990, 2500) },
          },
        ],
      },
    },
  });

  // 4.2 Philips XXL Smart Digital Air Fryer (Brand: Philips)
  await prisma.product.create({
    data: {
      slug: 'philips-xxl-smart-digital-air-fryer',
      name: 'Philips XXL Smart Digital Air Fryer',
      brand: 'Philips',
      category: 'Kitchen & Home',
      description:
        'Smart Sensing technology automatically adjusts time and temperature for perfect results. Rapid CombiAir tech removes excess fat while locking in moisture and flavor.',
      variants: {
        create: [
          {
            color: 'Black & Champagne',
            storage: '7.2L (1.4kg Capacity)',
            sku: 'PHL-AF-XXL-BLK',
            mrp: 24995,
            price: 18990,
            stock: 30,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1000&q=80', alt: 'Modern Digital Air Fryer on Marble Kitchen Counter', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(18990, 1000) },
          },
        ],
      },
    },
  });

  // ==========================================
  // --- 5. CATEGORY: Health & Wellness ---
  // ==========================================

  // 5.1 Ultrahuman Ring AIR Titanium Tracker (Brand: Ultrahuman)
  await prisma.product.create({
    data: {
      slug: 'ultrahuman-ring-air-titanium',
      name: 'Ultrahuman Ring AIR Titanium Health Tracker',
      brand: 'Ultrahuman',
      category: 'Health & Wellness',
      description:
        'Ultra-lightweight 2.4-gram aerospace-grade titanium sleep, circadian rhythm, and metabolic tracker. Continuous heart rate, HRV, skin temperature monitoring with zero monthly subscriptions.',
      variants: {
        create: [
          {
            color: 'Raw Titanium',
            storage: 'Size 10 (Multi-Sensor)',
            sku: 'UH-RA-TIT-10',
            mrp: 32999,
            price: 28499,
            stock: 20,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80', alt: 'Ultrahuman Ring AIR Titanium Smart Health Ring', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(28499, 1800) },
          },
        ],
      },
    },
  });

  // 5.2 Dyson Purifier Hot+Cool Formaldehyde HP09 (Brand: Dyson)
  await prisma.product.create({
    data: {
      slug: 'dyson-purifier-hot-cool-hp09',
      name: 'Dyson Purifier Hot+Cool Formaldehyde HP09',
      brand: 'Dyson',
      category: 'Health & Wellness',
      description:
        'Automatically detects and continuously destroys formaldehyde. Fully HEPA H13-sealed filtration captures 99.95% of ultrafine particles down to 0.1 microns.',
      variants: {
        create: [
          {
            color: 'Nickel & Gold',
            storage: 'Whole Room 350° Airflow',
            sku: 'DYS-HP09-NKL-GLD',
            mrp: 69900,
            price: 61900,
            stock: 12,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1000&q=80', alt: 'Dyson HEPA Air Purifier in Living Space', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(61900, 3500) },
          },
        ],
      },
    },
  });

  // 5.3 Dyson Airwrap Multi-Styler Complete Long (Brand: Dyson)
  await prisma.product.create({
    data: {
      slug: 'dyson-airwrap-multi-styler-complete',
      name: 'Dyson Airwrap Multi-Styler Complete Long',
      brand: 'Dyson',
      category: 'Health & Wellness',
      description:
        'Dries and styles simultaneously using Coanda airflow with no extreme heat damage. Intelligent heat control measures temperature over 40 times per second.',
      variants: {
        create: [
          {
            color: 'Strawberry Bronze & Blush Pink',
            storage: '6 Styling Attachments + Case',
            sku: 'DYS-AW-LONG-PNK',
            mrp: 54900,
            price: 49900,
            stock: 16,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80', alt: 'Dyson Airwrap Multi-Styler Complete Edition', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(49900, 2800) },
          },
        ],
      },
    },
  });

  // 5.4 Philips Sonicare 9900 Prestige Electric Toothbrush (Brand: Philips)
  await prisma.product.create({
    data: {
      slug: 'philips-sonicare-9900-prestige',
      name: 'Philips Sonicare 9900 Prestige Smart Toothbrush',
      brand: 'Philips',
      category: 'Health & Wellness',
      description:
        'SenseIQ technology senses pressure, motion, and coverage up to 100 times per second, dynamically adapting intensity in real time for unmatched oral care.',
      variants: {
        create: [
          {
            color: 'Midnight Blue',
            storage: 'SenseIQ + Leather Travel Case',
            sku: 'PHL-SONIC-9900-BLU',
            mrp: 29995,
            price: 24995,
            stock: 24,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1559591937-e1032b918669?auto=format&fit=crop&w=1000&q=80', alt: 'Philips Sonicare Prestige Electric Toothbrush', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(24995, 1500) },
          },
        ],
      },
    },
  });

  // 5.5 Philips Series 9000 Prestige Wet & Dry Electric Shaver (Brand: Philips)
  await prisma.product.create({
    data: {
      slug: 'philips-series-9000-prestige-shaver',
      name: 'Philips Series 9000 Prestige Wet & Dry Electric Shaver',
      brand: 'Philips',
      category: 'Health & Wellness',
      description:
        'NanoTech dual precision blades reinforced with nanoparticles deliver ultimate close shaving. BeardAdapt sensor checks hair density 500 times per second.',
      variants: {
        create: [
          {
            color: 'Brushed Chrome',
            storage: 'Qi Wireless Charging Pad Included',
            sku: 'PHL-S9000-CHRM',
            mrp: 36995,
            price: 29995,
            stock: 19,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=1000&q=80', alt: 'Philips Series 9000 Prestige Electric Shaver', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(29995, 1800) },
          },
        ],
      },
    },
  });

  // ==========================================
  // --- 6. CATEGORY: Fashion ---
  // ==========================================

  // 6.1 Ray-Ban Meta Smart Glasses (Brand: Ray-Ban)
  await prisma.product.create({
    data: {
      slug: 'ray-ban-meta-smart-glasses-wayfarer',
      name: 'Ray-Ban Meta Smart Glasses Wayfarer Polarized',
      brand: 'Ray-Ban',
      category: 'Fashion',
      description:
        'Iconic Wayfarer silhouette infused with ultra-wide 12MP camera, open-ear spatial audio speakers, 5-mic array, hands-free Meta AI voice assistance, and polarized UV400 lenses.',
      variants: {
        create: [
          {
            color: 'Shiny Black Polarized',
            storage: '32 GB Internal (Standard Fit)',
            sku: 'RB-META-WAY-BLK',
            mrp: 39990,
            price: 34990,
            stock: 25,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80', alt: 'Ray-Ban Meta Smart Sunglasses Wayfarer', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(34990, 2200) },
          },
        ],
      },
    },
  });

  // 6.2 TAG Heuer Connected Calibre E4 (Brand: TAG Heuer)
  await prisma.product.create({
    data: {
      slug: 'tag-heuer-connected-calibre-e4',
      name: 'TAG Heuer Connected Calibre E4 Smartwatch',
      brand: 'TAG Heuer',
      category: 'Fashion',
      description:
        'Swiss horology meets cutting-edge digital performance. Crafted from ultra-light Grade 2 titanium with black DLC coating, ceramic bezel, sapphire crystal screen, and luxury sports biometric tracking.',
      variants: {
        create: [
          {
            color: 'Titanium Black DLC',
            storage: '45mm Case (Sapphire Crystal)',
            sku: 'TH-CONN-E4-45',
            mrp: 235000,
            price: 215000,
            stock: 6,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80', alt: 'TAG Heuer Connected Luxury Smartwatch on Wrist', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(215000, 11000) },
          },
        ],
      },
    },
  });

  // 6.3 Nike Sportswear Tech Fleece Windrunner (Brand: Nike)
  await prisma.product.create({
    data: {
      slug: 'nike-sportswear-tech-fleece-windrunner',
      name: 'Nike Sportswear Tech Fleece Windrunner Set',
      brand: 'Nike',
      category: 'Fashion',
      description:
        'Engineered thermal lightweight warmth with signature chevron Windrunner styling. Includes premium full-zip hooded track jacket and tailored tapered Tech Fleece joggers.',
      variants: {
        create: [
          {
            color: 'Dark Heather Grey / Black',
            storage: 'Size L (Tailored Slim Fit)',
            sku: 'NKE-TF-SET-GRY-L',
            mrp: 18995,
            price: 14995,
            stock: 35,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80', alt: 'Nike Sportswear Tech Fleece Windrunner Jacket', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(14995, 1000) },
          },
        ],
      },
    },
  });

  // ==========================================
  // --- 7. CATEGORY: Baby & Kids ---
  // ==========================================

  // 7.1 Nanit Pro Smart Baby Monitor (Brand: Nanit)
  await prisma.product.create({
    data: {
      slug: 'nanit-pro-smart-baby-monitor',
      name: 'Nanit Pro Smart Baby Monitor & Breathing Wear',
      brand: 'Nanit',
      category: 'Baby & Kids',
      description:
        '1080p HD crystal video overhead nursery camera. Tracks breathing motion without sensors touching your baby, analyzes sleep patterns, temperature, and humidity with smart night vision.',
      variants: {
        create: [
          {
            color: 'White',
            storage: 'Wall Mount + Sensor Band',
            sku: 'NNT-PRO-WHT',
            mrp: 34999,
            price: 27999,
            stock: 16,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1000&q=80', alt: 'Smart Nursery Setup with Nanit Camera', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(27999, 1800) },
          },
        ],
      },
    },
  });

  // 7.2 Amazon Fire HD 10 Kids Pro Tablet (Brand: Amazon)
  await prisma.product.create({
    data: {
      slug: 'amazon-fire-hd-10-kids-pro-tablet',
      name: 'Amazon Fire HD 10 Kids Pro Tablet (10.1")',
      brand: 'Amazon',
      category: 'Baby & Kids',
      description:
        'Built for school-age kids. 10.1-inch 1080p Full HD screen, octa-core processor, robust kid-proof protective case, comprehensive parental controls, and 1 year of Amazon Kids+ interactive learning.',
      variants: {
        create: [
          {
            color: 'Sky Blue',
            storage: '32 GB (microSD Expandable)',
            sku: 'AMZ-FHD10K-BLU',
            mrp: 18999,
            price: 14999,
            stock: 28,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80', alt: 'Kids Educational Learning Tablet with Rugged Bumper', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(14999, 1000) },
          },
        ],
      },
    },
  });

  // ==========================================
  // --- 8. CATEGORY: Sports & Fitness ---
  // ==========================================

  // 8.1 Nike Alphafly 3 Premium Marathon Running Shoes (Brand: Nike)
  await prisma.product.create({
    data: {
      slug: 'nike-alphafly-3-marathon-shoes',
      name: 'Nike Alphafly 3 Premium Marathon Shoes',
      brand: 'Nike',
      category: 'Sports & Fitness',
      description:
        'Fine-tuned for marathon speed. Features dual Air Zoom units in forefoot, full-length carbon-fibre Flyplate, responsive ZoomX foam midsole, and atomknit 3.0 breathable upper.',
      variants: {
        create: [
          {
            color: 'Volt / Concord / Total Orange',
            storage: 'UK 9 (Carbon Flyplate Pro)',
            sku: 'NKE-AF3-VLT-UK9',
            mrp: 25995,
            price: 22795,
            stock: 20,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80', alt: 'Nike Alphafly 3 Carbon Marathon Running Shoes', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(22795, 1500) },
          },
          {
            color: 'White / Black / Clear Jade',
            storage: 'UK 10 (Carbon Flyplate Pro)',
            sku: 'NKE-AF3-WHT-UK10',
            mrp: 25995,
            price: 22795,
            stock: 18,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80', alt: 'Nike Alphafly 3 White Jade Edition', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(22795, 1500) },
          },
        ],
      },
    },
  });

  // 8.2 Nike Air Zoom Pegasus 41 Road Running Shoes (Brand: Nike)
  await prisma.product.create({
    data: {
      slug: 'nike-air-zoom-pegasus-41',
      name: 'Nike Air Zoom Pegasus 41 Road Running Shoes',
      brand: 'Nike',
      category: 'Sports & Fitness',
      description:
        'Responsive daily trainer powered by all-new ReactX foam providing 13% more energy return. Dual Air Zoom units in heel and forefoot deliver springy transitions.',
      variants: {
        create: [
          {
            color: 'Black / White / Bicoastal',
            storage: 'UK 9 (ReactX Midsole)',
            sku: 'NKE-PEG41-BLK-UK9',
            mrp: 12995,
            price: 11895,
            stock: 35,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80', alt: 'Nike Pegasus 41 Running Shoe Side Profile', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(11895, 800) },
          },
        ],
      },
    },
  });

  // 8.3 Garmin Forerunner 965 GPS Multisport Watch (Brand: Garmin)
  await prisma.product.create({
    data: {
      slug: 'garmin-forerunner-965-gps-smartwatch',
      name: 'Garmin Forerunner 965 GPS Solar Multisport Watch',
      brand: 'Garmin',
      category: 'Sports & Fitness',
      description:
        'Brilliant 1.4-inch AMOLED touchscreen with lightweight titanium bezel. Advanced training metrics, full-color onboard mapping, multi-band GNSS with SatIQ, and up to 23 days of battery life.',
      variants: {
        create: [
          {
            color: 'Carbon Gray Titanium',
            storage: '32 GB Internal Maps',
            sku: 'GRM-FR965-GRY',
            mrp: 67990,
            price: 59990,
            stock: 15,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80', alt: 'Garmin Multisport GPS Watch on Trail Runner', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(59990, 3500) },
          },
        ],
      },
    },
  });

  // 8.4 Garmin Fenix 8 AMOLED 51mm Premium Multisport GPS Watch (Brand: Garmin)
  await prisma.product.create({
    data: {
      slug: 'garmin-fenix-8-amoled-51mm',
      name: 'Garmin Fenix 8 AMOLED 51mm Multisport GPS Watch',
      brand: 'Garmin',
      category: 'Sports & Fitness',
      description:
        'Engineered for serious athletes and adventurers. 51mm titanium bezel with scratch-resistant sapphire lens, vivid AMOLED display, built-in speaker and microphone for voice commands, and leakproof inductive buttons.',
      variants: {
        create: [
          {
            color: 'Titanium Slate Gray / Sapphire',
            storage: '51mm Sapphire Glass (Topographic Maps)',
            sku: 'GRM-FNX8-51-TIT',
            mrp: 114990,
            price: 104990,
            stock: 8,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80', alt: 'Garmin Fenix 8 Sapphire AMOLED Multisport Watch', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(104990, 6500) },
          },
        ],
      },
    },
  });

  // 8.5 Cultsport Smart Connected Folding Treadmill (Brand: Cultsport)
  await prisma.product.create({
    data: {
      slug: 'cultsport-smart-connected-folding-treadmill',
      name: 'Cultsport Smart Connected Treadmill with Auto-Incline',
      brand: 'Cultsport',
      category: 'Sports & Fitness',
      description:
        'Equipped with a powerful 3.0 HP continuous brushless DC motor, 15-level auto inclination, Bluetooth workout live-syncing with Cult.fit trainers, and hydraulic SoftDrop folding mechanism.',
      variants: {
        create: [
          {
            color: 'Stealth Black',
            storage: '15-Level Auto-Incline (Max 120kg)',
            sku: 'CLT-TRD-AI-BLK',
            mrp: 49990,
            price: 36990,
            stock: 11,
            images: {
              create: [
                { url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80', alt: 'Smart Motorized Treadmill in Modern Home Gym', sortOrder: 1 },
              ],
            },
            emiPlans: { create: generateEmiPlans(36990, 2500) },
          },
        ],
      },
    },
  });

  // Seed initial demo orders for the user so they have active EMIs for "Pay EMI" demo!
  const firstVariant = await prisma.productVariant.findFirst({
    where: { sku: 'APL-IP17P-SLV-256' },
    include: { emiPlans: { where: { tenureMonths: 12 } } },
  });

  if (firstVariant && firstVariant.emiPlans[0]) {
    await prisma.order.create({
      data: {
        userId: demoUser.id,
        variantId: firstVariant.id,
        emiPlanId: firstVariant.emiPlans[0].id,
        status: 'CONFIRMED',
      },
    });
  }

  const secondVariant = await prisma.productVariant.findFirst({
    where: { sku: 'SNY-XM5-SLV' },
    include: { emiPlans: { where: { tenureMonths: 6 } } },
  });

  if (secondVariant && secondVariant.emiPlans[0]) {
    await prisma.order.create({
      data: {
        userId: demoUser.id,
        variantId: secondVariant.id,
        emiPlanId: secondVariant.emiPlans[0].id,
        status: 'CONFIRMED',
      },
    });
  }

  console.log('Database seeded successfully with all 8 categories, 9 brands, and extra demo products!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
