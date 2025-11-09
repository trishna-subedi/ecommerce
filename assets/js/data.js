// =======================================================
// EcoMart: Central Data Store (data.js)
// =======================================================
// This file contains all mock data for the application.
// In a real-world scenario, this data would come from a
// backend API. For our front-end project, this serves as
// our single source of truth.
// =======================================================


// =======================================================
// 1. PRODUCTS DATA
// Description: An array of product objects. Each object
// contains all necessary details to render it on the
// product grid and the product detail page.
// =======================================================
const products = [
    {
        id: 'eco-elec-0art01',
        name: 'Aura Recycled Smartphone Case',
        price: 34.99,
        category: 'electronics',
        stockStatus: 'in-stock', // 'in-stock', 'low-stock', 'out-of-stock'
        avgRating: 4.5,
        shortDescription: 'Sleek, durable, and made from 100% recycled plastics.',
        description: `Protect your device and the planet with the Aura Smartphone Case. Crafted entirely from post-consumer recycled plastics, this case offers robust protection against drops and scratches without adding bulk. Its minimalist design and smooth, matte finish provide a premium feel, proving that sustainability and style can go hand-in-hand.`,
        specifications: [
            { key: 'Material', value: '100% Recycled TPU Plastic' },
            { key: 'Compatibility', value: 'iPhone 15, Pixel 8, Galaxy S24' },
            { key: 'Features', value: '6 ft. Drop Protection, Wireless Charging Compatible' },
            { key: 'Color Options', value: 'Matte Black, Forest Green, Ocean Blue' }
        ],
        image: {
            thumbnail: 'assets/images/1a.jpg',
            gallery: [
                'assets/images/1a.jpg',
                'assets/images/3a.jpg',
                'assets/images/2a.jpg'
            ]
        }
    },
    {
        id: 'green-comp-00a2',
        name: 'TerraBook Pro Laptop (Refurbished)',
        price: 899.00,
        originalPrice: 759.50, 
        category: 'computing',
        stockStatus: 'low-stock',
        avgRating: 4.8,
        shortDescription: 'High-performance computing with a minimal carbon footprint.',
        description: `Experience power and responsibility with the TerraBook Pro. This professionally refurbished laptop is certified to perform like new, extending its life and reducing e-waste. Featuring an energy-efficient processor and a display made with recycled materials, it's the perfect choice for the eco-conscious professional who refuses to compromise on performance.`,
        specifications: [
            { key: 'Processor', value: 'Energy-Efficient Core i7' },
            { key: 'Memory (RAM)', value: '16GB DDR4' },
            { key: 'Storage', value: '512GB NVMe SSD' },
            { key: 'Display', value: '14" 2K Resolution (30% Recycled Glass)' },
            { key: 'Warranty', value: '1-Year Full Coverage' }
        ],
        image: {
            thumbnail: 'assets/images/2a.jpg',
            gallery: [
                'assets/images/4a.jpg',
                'assets/images/5a.jpg',
                'assets/images/11a.jpg'
            ]
        }
    },
    {
        id: 'audio-002112',
        name: 'SonosGrove Bamboo Bluetooth Speaker',
        price: 129.50,
        originalPrice: 159.50, 
        category: 'audio',
        stockStatus: 'in-stock',
        avgRating: 4.7,
        shortDescription: 'Immersive 360° sound from a sustainably crafted speaker.',
        description: `Fill your space with rich, crystal-clear audio from the SonosGrove Speaker. The speaker enclosure is crafted from sustainably harvested bamboo, known for its excellent acoustic properties and rapid renewability. Recycled aluminum and fabrics complete the design, offering a premium audio experience that looks as good as it sounds.`,
        specifications: [
            { key: 'Materials', value: 'Natural Bamboo, Recycled Aluminum, Fabric Mesh' },
            { key: 'Battery Life', value: '15 Hours Playtime' },
            { key: 'Connectivity', value: 'Bluetooth 5.2, USB-C' },
            { key: 'Water Resistance', value: 'IPX5 Splashproof' }
        ],
        image: {
            thumbnail: 'assets/images/3a.jpg',
            gallery: [
                'assets/images/6ajpg',
                'assets/images/7a.jpg',
                'assets/images/8a.jpg'
            ]
        }
    },
    // ... We will add more products here later
];


// =======================================================
// 2. REVIEWS DATA
// Description: An array of review objects. Each review is
// linked to a product via the `productId` field. This
// keeps the data normalized and easy to manage.
// =======================================================
const reviews = [
    {
        id: 101,
        productId: 'eco-elec-001', // Links to the Aura Case
        rating: 5,
        title: 'Stylish and Sustainable!',
        author: 'Jessica L.',
        date: '2025-10-22',
        text: `I'm so impressed with this case. It feels sturdy, looks incredibly sleek, and I love the fact that it's made from recycled materials. It fits my phone perfectly. Highly recommended!`,
        verifiedPurchase: true
    },
    {
        id: 102,
        productId: 'eco-elec-001',
        rating: 4,
        title: 'Great case, slightly slippery.',
        author: 'Mark T.',
        date: '2025-10-19',
        text: `The case offers excellent protection and the color is fantastic. My only minor complaint is that the matte finish can be a little slippery at times, but it's not a deal-breaker.`,
        verifiedPurchase: true
    },
    {
        id: 103,
        productId: 'green-comp-001', // Links to the TerraBook Pro
        rating: 5,
        title: 'This machine is a powerhouse!',
        author: 'David Chen',
        date: '2025-10-15',
        text: `I was hesitant about buying refurbished, but this laptop has exceeded all my expectations. It's incredibly fast, the screen is beautiful, and it runs completely silent. The fact that it's eco-friendly is a huge bonus. Zero regrets.`,
        verifiedPurchase: true
    },
    {
        id: 104,
        productId: 'audio-001', // Links to the SonosGrove Speaker
        rating: 5,
        title: 'Amazing Sound and Design',
        author: 'Emily Rose',
        date: '2025-10-28',
        text: `This speaker is a piece of art! The bamboo finish is gorgeous and it looks perfect on my bookshelf. The sound quality is the real star—it's balanced, gets surprisingly loud, and fills the entire room.`,
        verifiedPurchase: true
    },
    {
        id: 105,
        productId: 'audio-001',
        rating: 4,
        title: 'Excellent sound, average battery.',
        author: 'Ben Carter',
        date: '2025-10-25',
        text: `The audio is phenomenal for a speaker of this size. My only wish is that the battery lasted a bit longer; I'm getting closer to 12-13 hours, not the advertised 15. Still a great purchase.`,
        verifiedPurchase: true
    }
];