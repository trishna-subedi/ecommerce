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
    // new 
        {
        id: 'eco-ewwlwec-002',
        name: 'Helios Solar-Panel Power Bank',
        price: 59.99,
        originalPrice: 79.99,
        category: 'electronics',
        stockStatus: 'in-stock',
        avgRating: 4.6,
        shortDescription: 'Charge your devices anywhere with the power of the sun.',
        description: `Never run out of battery again with the Helios Solar-Panel Power Bank. Featuring high-efficiency solar panels and a rugged, splashproof design, this 10,000mAh power bank is your perfect companion for hiking, camping, or daily commutes. It includes dual USB-A ports and a USB-C port for versatile charging.`,
        specifications: [
            { key: 'Capacity', value: '10,000mAh' },
            { key: 'Ports', value: '2x USB-A, 1x USB-C' },
            { key: 'Features', value: 'Integrated LED Flashlight, Splashproof IPX4' },
            { key: 'Materials', value: 'Recycled ABS, High-Efficiency Solar Cells' }
        ],
        image: {
            thumbnail: 'assets/images/prod-04-powerbank-thumb.jpg',
            gallery: [
                'assets/images/prod-04-powerbank-gallery-1.jpg',
                'assets/images/prod-04-powerbank-gallery-2.jpg'
            ]
        }
    },
    {
        id: 'audiwwwo-002',
        name: 'EchoWood Over-Ear Headphones',
        price: 179.00,
        originalPrice: 229.00,
        category: 'audio',
        stockStatus: 'in-stock',
        avgRating: 4.9,
        shortDescription: 'Studio-quality sound encased in certified sustainable wood.',
        description: `Immerse yourself in unparalleled audio fidelity with the EchoWood Headphones. The earcups are crafted from FSC-certified walnut wood, providing natural acoustic resonance. With plush, comfortable earpads and a 40-hour battery life, these headphones are designed for the discerning audiophile who values both quality and sustainability.`,
        specifications: [
            { key: 'Driver Size', value: '50mm Neodymium' },
            { key: 'Battery Life', value: '40 Hours Playtime' },
            { key: 'Connectivity', value: 'Bluetooth 5.3, 3.5mm Aux Cable' },
            { key: 'Materials', value: 'FSC-Certified Walnut, Recycled Aluminum, Vegan Leather' }
        ],
        image: {
            thumbnail: 'assets/images/prod-05-headphones-thumb.jpg',
            gallery: [
                'assets/images/prod-05-headphones-gallery-1.jpg',
                'assets/images/prod-05-headphones-gallery-2.jpg',
                'assets/images/prod-05-headphones-gallery-3.jpg'
            ]
        }
    },
    {
        id: 'green-cwwomp-002',
        name: 'Bamboo Ergonomic Keyboard & Mouse',
        price: 89.99,
        originalPrice: 99.99,
        category: 'computing',
        stockStatus: 'in-stock',
        avgRating: 4.4,
        shortDescription: 'A beautiful, eco-friendly upgrade for your workspace.',
        description: `Redefine your desk with this stunning keyboard and mouse set, crafted from solid, carbonized bamboo. The keyboard features quiet, responsive scissor-switch keys, while the ergonomic mouse fits comfortably in your hand. Both devices connect via a single USB dongle for a clean, wireless setup.`,
        specifications: [
            { key: 'Material', value: '100% Natural Moso Bamboo' },
            { key: 'Connectivity', value: '2.4GHz Wireless (Single Dongle)' },
            { key: 'Keyboard Layout', value: 'Full-size with Numpad' },
            { key: 'Compatibility', value: 'Windows, macOS, Linux' }
        ],
        image: {
            thumbnail: 'assets/images/prod-06-keyboard-thumb.jpg',
            gallery: [
                'assets/images/prod-06-keyboard-gallery-1.jpg',
                'assets/images/prod-06-keyboard-gallery-2.jpg'
            ]
        }
    },
    {
        id: 'eco-elwwwec-003',
        name: 'Smart-Leaf Indoor Garden',
        price: 249.00,
        originalPrice: 299.00,
        category: 'electronics',
        stockStatus: 'out-of-stock',
        avgRating: 4.8,
        shortDescription: 'Grow fresh herbs and greens year-round, effortlessly.',
        description: `Bring the joy of gardening indoors with the Smart-Leaf system. This self-contained unit uses energy-efficient, full-spectrum LED lighting and a self-watering system to create the perfect environment for your plants. Grow anything from basil and mint to cherry tomatoes, right on your countertop.`,
        specifications: [
            { key: 'Capacity', value: '9 Plant Pods' },
            { key: 'Lighting', value: '24W Full-Spectrum LED' },
            { key: 'Water Reservoir', value: '4 Liters' },
            { key: 'Features', value: 'Automatic Light Timer, Water Level Sensor' }
        ],
        image: {
            thumbnail: 'assets/images/prod-07-garden-thumb.jpg',
            gallery: [
                'assets/images/prod-07-garden-gallery-1.jpg',
                'assets/images/prod-07-garden-gallery-2.jpg'
            ]
        }
    },
    {
        id: 'audiwwo-003',
        name: 'Drift Recycled Fabric Earbuds',
        price: 79.99,
        originalPrice: 99.99,
        category: 'audio',
        stockStatus: 'low-stock',
        avgRating: 4.3,
        shortDescription: 'Compact true wireless earbuds with a unique, tactile finish.',
        description: `Stand out from the crowd with the Drift True Wireless Earbuds. The charging case is wrapped in a durable, attractive fabric made from 100% recycled plastic bottles. The earbuds themselves offer a snug fit, IPX5 water resistance, and deliver clear, balanced sound for music and calls.`,
        specifications: [
            { key: 'Battery Life', value: '6 Hours (Earbuds) + 24 Hours (Case)' },
            { key: 'Water Resistance', value: 'IPX5' },
            { key: 'Connectivity', value: 'Bluetooth 5.2' },
            { key: 'Materials', value: 'Recycled Plastic Fabric, Recycled ABS' }
        ],
        image: {
            thumbnail: 'assets/images/prod-08-earbuds-thumb.jpg',
            gallery: [
                'assets/images/prod-08-earbuds-gallery-1.jpg',
                'assets/images/prod-08-earbuds-gallery-2.jpg'
            ]
        }
    }
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
        productId: 'audio-002112', // Links to the Aura Case
        rating: 5,
        title: 'Stylish and Sustainable!',
        author: 'Jessica L.',
        date: '2025-10-22',
        text: `I'm so impressed with this case. It feels sturdy, looks incredibly sleek, and I love the fact that it's made from recycled materials. It fits my phone perfectly. Highly recommended!`,
        verifiedPurchase: true
    },
    {
        id: 102,
        productId: 'audiwwo-003',
        rating: 4,
        title: 'Great case, slightly slippery.',
        author: 'Mark T.',
        date: '2025-10-19',
        text: `The case offers excellent protection and the color is fantastic. My only minor complaint is that the matte finish can be a little slippery at times, but it's not a deal-breaker.`,
        verifiedPurchase: true
    },
    {
        id: 103,
        productId: 'green-comp-00a2', // Links to the TerraBook Pro
        rating: 5,
        title: 'This machine is a powerhouse!',
        author: 'David Chen',
        date: '2025-10-15',
        text: `I was hesitant about buying refurbished, but this laptop has exceeded all my expectations. It's incredibly fast, the screen is beautiful, and it runs completely silent. The fact that it's eco-friendly is a huge bonus. Zero regrets.`,
        verifiedPurchase: true
    },
    {
        id: 104,
        productId: 'green-comp-00a2', // Links to the SonosGrove Speaker
        rating: 5,
        title: 'Amazing Sound and Design',
        author: 'Emily Rose',
        date: '2025-10-28',
        text: `This speaker is a piece of art! The bamboo finish is gorgeous and it looks perfect on my bookshelf. The sound quality is the real star—it's balanced, gets surprisingly loud, and fills the entire room.`,
        verifiedPurchase: true
    },
    {
        id: 105,
        productId: 'green-comp-00a2',
        rating: 4,
        title: 'Excellent sound, average battery.',
        author: 'Ben Carter',
        date: '2025-10-25',
        text: `The audio is phenomenal for a speaker of this size. My only wish is that the battery lasted a bit longer; I'm getting closer to 12-13 hours, not the advertised 15. Still a great purchase.`,
        verifiedPurchase: true
    }
];