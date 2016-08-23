var seeder = require('mongoose-seed')

// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGODB_URI, function () {
  // Load Mongoose models
  seeder.loadModels([
    'models/product.js'
  ])

  // Clear specified collections
  seeder.clearModels(['Product'], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data)
  })
})

// Data array containing seed data - documents organized by Model
var data = [
  {
    'model': 'Product',
    'documents': [
      {
        'title': 'Anti-Gravity MEGAVERSE: One Phone Case, Many Uses',
        'price': 49,
        'description': 'Now with more nano-suction surface area, new colors and swappable backplates, the MEGAVERSE™ Anti-Gravity Case™ is one case with many uses!' +
        'The MEGAVERSE Anti-Gravity Case sticks even better to windows, mirrors, whiteboards, metal, kitchen cabinets, tile, flat car dashboards and more!' + 'NEW! Swappable MegaBack™ plates allow you to add a leather wallet, shatter-proof mirror or bottle opener to the back of your case in seconds!',
        'picture': 'https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_limit,w_620/v1470855947/kboplbdmgc9ndajramiu.jpg',
        'stock': 100,
        'categories': ['Technology']
      },
      {
        'title': 'Bagel: The World\'s Smartest Tape Measure',
        'price': 72,
        'description': 'Bagel is the only tape measure you will ever need. With three different measuring modes, Bagel lets you measure just about anything. ' +
        'It can also save measurements, record voice memos, and send data to its mobile app, where you can easily organize and analyze your measurements. That’s why we call Bagel a smart tape measure.',
        'picture': 'https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,f_auto,h_240,w_320/v1470838853/dm4soteaaw2ogzzj9zxr.jpg',
        'stock': 100,
        'categories': ['Technology']
      },
      {
        'title': 'Kite Shield: DEET-free Mosquito Repellent Spray',
        'price': 40,
        'description': 'Sure, there are other mosquito repellents out there, but did you know most of them contain harsh chemicals? You have probably been putting them on your family’s skin for years! Now with Kite Shield, you can get harmless protection for everyone. ' +
        'You shouldn’t have to use a repellent that is just as annoying as the mosquitoes themselves. Kite Shield comes in a convenient 100 ml (3.38 fl. oz) spray bottle that contains our effective, patent-pending formula and can be re-applied as needed. ',
        'picture': 'https://lh6.googleusercontent.com/Fx5JYCNlVkEwQyOHaBdqqdRwz_Kh8f8kg1kfgM91dFqhmovTscvsbHilSdUIFLtqSn8piJH9gDmDOnSQQuuQA5aj2s48O-HiUw5bGGj2EvBHRMQJt2UZ8H34wrLuYvLvb8W_O_44',
        'stock': 100,
        'categories': ['Health']
      },
      {
        'title': 'Ava Fertility Bracelet & Women\'s Health Tracker',
        'price': 199,
        'description': 'Too often, we assume that men’s bodies are the default. But women’s bodies change in subtle but significant ways throughout the month. As the complex dance of your menstrual cycle unfolds, it impacts your heart rate, sleep patterns, temperature, and stress levels. ' + 'The Ava bracelet is a holistic health tracker designed specifically for women’s bodies. It brings together sleep, stress, and menstrual cycle monitoring into a single device, worn only at night. With Ava, you’ll get information about:',
        'picture': 'https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,f_auto,h_240,w_320/v1470440732/yaaudcqkwm9ombajvjxn.jpg',
        'stock': 100,
        'categories': ['Health']
      },
      {
        'title': 'Evapolar - World\'s first personal air conditioner',
        'price': 179,
        'description': 'Start enjoying eco-friendly and energy efficient evaporative climate technology right now with Evapolar! Create your personal microclimate and enjoy ultimate comfort exactly when you need it and where you need it!' + 'Evapolar works on power of water evaporation — the simplest and most efficient cooling technology since ancient times. Evaporative coolers already exist but you may have never heard about them - they are all very bulky and if your hot season is short they are not presented on your market at all. But Evapolar is not just another evaporative cooler. It received a number of upgrades that make it truly unique. And the main one is that we managed to make it both powerful and compact so you could put it on your table.',
        'picture': 'https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_limit,w_620/v1467107281/Evapolar_02_color_z8pfdz.png',
        'stock': 100,
        'categories': ['Living']
      },
      {
        'title': 'Fizzics: Your Favorite Beer on Tap.',
        'price': 30,
        'description': 'Meet Fizzics, the world’s first and only universal beer dispenser that delivers an awesome fresh from the tap experience from any can, bottle or growler.',
        'picture': 'http://res.cloudinary.com/indiegogo-media-prod-cld/image/upload/c_limit,w_620/v1433894155/fajm8ba6plmiilvqcqka.jpg',
        'stock': 100,
        'categories': ['Living']
      },
      {
        'title': 'ELF emmit: A Wearable for the Optimized Self',
        'price': 119,
        'description': 'Each of the ELF emmit\'s five mood settings emits extra-low frequency electromagnetic pulses. These pulses gently coax the natural frequencies of your mind and body to speed up or slow down and match your desired mood. Our ability to transition through these frequencies determines how successful we are at managing stress, focusing & getting a good night\'s sleep.',
        'picture': 'https://s3-us-west-1.amazonaws.com/indiegogo-gifs/Elf+emmit/01.gif',
        'stock': 100,
        'categories': ['Tech']
      },
      {
        'title': 'CoWatch: The Most Affordable High-End Smartwatch',
        'price': 39,
        'description': 'With a design philosophy that marries style with accessibility, CoWatch packs next-level features, while being one of the most affordable smartwatches on the market. As the world\'s first smartwatch to integrate Alexa, Amazon\'s advanced voice-recognition software, CoWatch is your perfect companion into the future.',
        'picture': 'https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_limit,w_620/v1460981661/00_-_Header-3_usjb8d.jpg',
        'stock': 100,
        'categories': ['Lifestyle']
      },
      {
        'title': 'Breathe - World\'s smallest wearable air purifier',
        'price': 89,
        'description': 'Eliminates air pollution in silence within seconds, no filter replacement required.',
        'picture': 'https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_limit,w_620/v1464206539/2_m12wcr.jpg',
        'stock': 100,
        'categories': ['Lifestyle']
      }
    ]
  }
]
