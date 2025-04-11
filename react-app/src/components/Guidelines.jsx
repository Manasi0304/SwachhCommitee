import React, { useState, useRef } from 'react';
import './Guidelines.css';
import Header2 from './Header2';
import GetStarted from './GetStarted';
import Footer from './Footer';

const Guidelines = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Create a ref for the category details container
  const categoryDetailsRef = useRef(null);

  const categories = [
    {
      id: 1,
      title: 'Plastic Waste',
      description: 'Learn how to recycle plastic waste effectively.',
      icon: './plasticWasteRe.png',
      guidelines: (
         <>
          <p>1. <strong>Segregate Plastic Waste:</strong> Separate plastic items based on their type, such as PET, HDPE, PVC, LDPE, PP, PS, etc.</p>
          <img src='./plastic1.png' alt="Segregating Plastic Waste" className="guideline-image" />
          
          <p>2. <strong>Clean the Plastic Waste:</strong> Rinse plastic items thoroughly to remove food or liquid residue.</p>
          <p>3. <strong>Avoid Mixing Plastics with Non-Recyclable Materials:</strong> Do not mix plastic with items that cannot be recycled.</p>
          <p>4. <strong>Use Recycling Stations:</strong> If your curbside collection does not accept certain plastics, look for designated recycling stations.</p>
          <img src='./plastic2.png' alt="img" className="guideline-image" />
        </>
      ),
      videos: [
        'https://www.youtube.com/embed/lNgAW4VRcKo?si=w_dT77n_a7l-vLuC',
        'https://www.youtube.com/embed/tPwY8y9A6fA?si=nN3ymd1LxhGHFdnf',
      ],
    },
    {
      id: 2,
      title: 'Electronic Waste',
      description: 'Guidelines for safe disposal and recycling of e-waste.',
      icon: './eWasteRe.png',
      guidelines: (
         <>
            <p>1. <strong>Sort and Identify E-Waste:</strong> Separate electronic items such as phones, laptops, batteries, and chargers. Identify hazardous components like lithium-ion batteries or mercury-containing parts.</p>

            <p>2. <strong>Backup and Wipe Data:</strong> Ensure personal data is backed up and securely erased from devices before recycling.</p>

            <p>3. <strong>Dispose of E-Waste Safely:</strong> Avoid discarding electronic waste in regular trash bins. Use designated e-waste recycling bins or centers.</p>

            <p>4. <strong>Donate Usable Devices:</strong> If devices are still functional, donate them to charities or organizations that can reuse them.</p>

            <p>5. <strong>Check Manufacturer or Retailer Programs:</strong> Participate in take-back or trade-in programs offered by manufacturers or retailers.</p>

            <p>6. <strong>Avoid Burning E-Waste:</strong> Burning electronic waste releases toxic fumes harmful to health and the environment. Always recycle properly.</p>

            <p>7. <strong>Use Authorized Recycling Centers:</strong> Dispose of your e-waste only at authorized centers to ensure safe and eco-friendly recycling.</p>
            <img src='./ewaste1.png' alt="img" className="guideline-image" />

        </>
      ),
      videos: [
        'https://www.youtube.com/embed/ApdkhWd7SfQ?si=hQEKthuwRbKtRh4b',
        'https://www.youtube.com/embed/C-oZZjchk4M?si=n2QL02Cy_CYUb0b-',
        'https://www.youtube.com/embed/v8JJCbfIlws?si=5lODZuuVzEhMdIg3'
      ],
    },
    {
      id: 3,
      title: 'Organic Waste',
      description: 'How to compost and manage organic waste.',
      icon: './orgWasteRe.png',
      guidelines: (
         <>
            <p>1. <strong>Segregate Organic Waste:</strong> Separate organic waste like fruit peels, vegetable scraps, eggshells, and garden  clippings from other waste.</p>
            <img src='./organic1.png' alt="img" className="guideline-image" />

            <p>2. <strong>Compost Organic Waste:</strong> Create a compost bin or pile to decompose organic waste into nutrient-rich compost for gardening.</p>

            <p>3. <strong>Avoid Mixing Organic Waste with Plastics:</strong> Do not mix organic waste with non-biodegradable materials like plastic or glass.</p>

            <p>4. <strong>Use Biodegradable Bags:</strong> If collecting organic waste in bags, ensure they are biodegradable to reduce environmental impact.</p>

            <p>5. <strong>Avoid Disposing of Organic Waste in Landfills:</strong> Organic waste in landfills produces methane gas, contributing to climate change. Use composting or recycling instead.</p>

            <p>6. <strong>Feed Livestock:</strong> Suitable organic waste, like vegetable scraps, can be given to livestock as feed.</p>

            <p>7. <strong>Utilize Community Composting:</strong> If you don't have space, join a community composting initiative to manage organic waste responsibly.</p>
            <img src='./organic2.png' alt="img" className="guideline-image" />
        </>
      ),
      videos: [
        'https://www.youtube.com/embed/Hcn3xk-2ZTc?si=m9bEOZlyd9-e5smx',
        'https://www.youtube.com/embed/xhu7Gu2G3nE?si=nisZqOjJIS3cWm_B',
        'https://www.youtube.com/embed/pWAD9b0DHuc?si=vCQAto6a-rlKMZUI'
      ],
    },
    {
      id: 4,
      title: 'Metal Waste',
      description: 'Recycle metals safely and efficiently.',
      icon: './MetalWasteRe.png',
      guidelines: (
         <>
            <p>1. <strong>Segregate Metal Waste:</strong> Separate metal items like aluminum cans, steel, copper wires, and scrap metal from other waste types.</p>
            <img src='./metal1.png' alt="Segregating Metal Waste" className="guideline-image" />

            <p>2. <strong>Clean Metal Waste:</strong> Remove any food residue or contaminants from metal items before recycling.</p>

            <p>3. <strong>Do Not Mix with Hazardous Waste:</strong> Keep metal waste separate from hazardous items like batteries or electronics.</p>

            <p>4. <strong>Recycle Properly:</strong> Take metal waste to designated recycling centers or scrap dealers for proper processing.</p>

            <p>5. <strong>Reuse When Possible:</strong> Repurpose old metal items such as cans or tools instead of discarding them.</p>

            <p>6. <strong>Contact Local Scrap Dealers:</strong> Sell or donate larger metal scraps to local scrap dealers who can recycle them effectively.</p>

            <p>7. <strong>Avoid Burning Metal Waste:</strong> Burning metal can release harmful chemicals into the air and should be avoided.</p>

            <p>8. <strong>Participate in Recycling Drives:</strong> Join local recycling drives or initiatives to dispose of metal waste sustainably.       </p>
            <img src='./metal2.png' alt="Cleaning Metal Waste" className="guideline-image" />
        </>
      ),
      videos: [
        'https://www.youtube.com/embed/rgEEXhbar3A?si=mpq4BDnZILLGoNqh',
        'https://www.youtube.com/embed/BuBIDn9kkY8?si=zBPVLJuVADZkKYeh',
      ],
    },
    {
      id: 5,
      title: 'Agricultural Waste',
      description: 'Recycle agricultural waste safely and efficiently.',
      icon: './agriWasteRe.png',
      guidelines: (
         <>
            <p>1. <strong>Compost Agricultural Waste:</strong> Convert organic agricultural waste like crop residues, leaves, and manure into nutrient-rich compost for soil enhancement.</p>

            <p>2. <strong>Utilize Biomass:</strong> Use agricultural waste such as husks, stalks, and shells as biomass fuel for energy generation.</p>
            <p>3. <strong>Avoid Burning Agricultural Waste:</strong> Refrain from burning crop residues as it contributes to air pollution and reduces soil fertility.</p>

            <p>4. <strong>Adopt Mulching:</strong> Use agricultural waste as mulch to retain soil moisture, regulate temperature, and prevent weed growth.</p>

            <p>5. <strong>Convert Waste to Animal Feed:</strong> Process crop residues and other suitable waste into feed for livestock.</p>

            <p>6. <strong>Explore Biogas Production:</strong> Use agricultural waste to produce biogas, a sustainable energy source for cooking and electricity.</p>
            <img src='./agri2.png' alt="img" className="guideline-image" />

            <p>7. <strong>Recycle Packaging Materials:</strong> Reuse or recycle packaging waste like sacks, plastic wraps, and containers used in agriculture.</p>

            <p>8. <strong>Collaborate with Waste Management Services:</strong> Partner with local waste management organizations for effective disposal and recycling of agricultural waste.</p>
            <img src='./agri1.png' alt="img" className="guideline-image" />
          </>
      ),
      videos: [
        'https://www.youtube.com/embed/ydO84ilqu2s?si=sc3SmrKHPnhFch3S',
        'https://www.youtube.com/embed/C6tJuKXCc4U?si=myR1zcw4bhGc1UlB',
      ],
    },
    {
      id: 6,
      title: 'Glass Waste',
      description: 'Recycle glasses safely and efficiently.',
      icon: './glassWasteRe.png',
      guidelines: (
         <>
            <p>1. <strong>Segregate Glass Waste:</strong> Separate glass items based on their type, such as clear, colored, or tempered glass, to facilitate recycling.</p>

            <p>2. <strong>Clean Glass Items:</strong> Rinse glass containers to remove any residue or contaminants before recycling.</p>

            <p>3. <strong>Avoid Mixing Glass with Non-Recyclables:</strong> Do not mix glass waste with other materials like plastic, paper, or food waste.</p>

            <p>4. <strong>Handle Glass Safely:</strong> Use protective gloves to handle broken glass, and package it securely to avoid injuries.</p>

            <p>5. <strong>Reuse Glass Containers:</strong> Repurpose glass bottles and jars for storage or decorative purposes instead of discarding them.</p>

            <p>6. <strong>Find Local Recycling Centers:</strong> Identify nearby facilities that accept glass for recycling, especially for types not handled by curbside programs.</p>

            <p>7. <strong>Avoid Disposing of Heat-Treated Glass:</strong> Do not mix heat-treated or tempered glass (e.g., Pyrex or windshield glass) with regular glass, as they require special recycling processes.</p>

            <p>8. <strong>Support Circular Economy:</strong> Buy products made from recycled glass to encourage sustainable practices and reduce waste.</p>
            <img src='./glass1.png' alt="Segregating Glass Waste" className="guideline-image" />
          </>
      ),
      videos: [
        'https://www.youtube.com/embed/tUYhhUtiBzE?si=CuLKm3vC63dLi-SY',
      ],
    },
    {
      id: 7,
      title: 'Cloths&Textile Waste',
      description: 'Turn old clothes and textiles into new products.',
      icon: './c&tWasteRe.png',
      guidelines: (
        <>
          <p>1. <strong>Sort Clothes and Textiles:</strong> Separate wearable clothes, damaged items, and different fabric types(cotton, polyester, wool, etc.) to streamline the recycling process.</p>

          <p>2. <strong>Donate Usable Clothes:</strong> Donate wearable items to charities, shelters, or thrift stores to extend their lifecycle.</p>

          <p>3. <strong>Repurpose Old Fabrics:</strong> Turn old clothes into cleaning rags, quilts, or craft materials instead of discarding them.</p>

          <p>4. <strong>Use Textile Recycling Bins:</strong> Find designated textile recycling bins or programs in your area for damaged or non-wearable items.</p>
          <img src='./cloth2.png' alt="img" className="guideline-image" />

          <p>5. <strong>Avoid Throwing Textiles in Landfills:</strong> Keep textiles out of landfills as they take years to decompose and release harmful greenhouse gases.</p>

          <p>6. <strong>Repair Before Discarding:</strong> Fix minor damages like tears, missing buttons, or broken zippers to prolong the life of your clothes.</p>

          <p>7. <strong>Recycle Synthetic Fabrics Separately:</strong> Recycle synthetic materials like polyester and nylon through specialized programs, as they require different processes than natural fibers.</p>

          <p>8. <strong>Support Sustainable Brands:</strong> Purchase from brands that offer take-back programs or produce items from recycled textiles.</p>
          <img src='./cloth1.png' alt="img" className="guideline-image" />
        </>
      ),
      videos: [
        'https://www.youtube.com/embed/O7P7R93qIjc?si=yuY4k2JQpoTIDi0O',
        'https://www.youtube.com/embed/YvBS6qagQdE?si=zJk0-vyen095B3bv',
        'https://www.youtube.com/embed/S67EG8ntlcM?si=ssaAAQkvhzTEZOIn'
      ],
    },
  ];

  // Handle category selection and scroll into view
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (categoryDetailsRef.current) {
      categoryDetailsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div>
        <Header2 />
        <div className="guidelines-section">
        <h1 className="guidelines-title">Recycling and Waste Management Guidelines</h1>
        <div className="category-grid">
            {categories.map((category) => (
            <div key={category.id} className="category-card">
                <img src={category.icon} alt={`${category.title} Icon`} className="category-icon" />
                <h2 className="category-title">{category.title}</h2>
                <p className="category-description">{category.description}</p>
                <button
                className="learn-more-button"
                onClick={() => handleCategorySelect(category)}
                >
                Check Guidelines
                </button>
            </div>
            ))}
        </div>

        {selectedCategory && (
            <div ref={categoryDetailsRef} className="category-details">
            <h2>{selectedCategory.title} Guidelines</h2>
            <p>{selectedCategory.guidelines}</p>
            {/* Map through the video URLs and render them */}
            <div className="video-container">
              {selectedCategory.videos.map((videoUrl, index) => (
                <iframe
                  key={index}
                  src={videoUrl}
                  title={`${selectedCategory.title} Video ${index + 1}`}
                  className="guidelines-video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ))}
            </div>
            <button className="close-button" onClick={() => setSelectedCategory(null)}>
                Close
            </button>
            </div>
        )}
        </div>
        <GetStarted />
        <Footer />
    </div>
  );
};

export default Guidelines;