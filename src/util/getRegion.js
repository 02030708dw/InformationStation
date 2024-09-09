const DomainMappings = {
    TH: {
      domain: ["thb.44dog.com","www.44dog.com","localhost",],
      currency: "THB"
    },
    INA: {
      domain: ["idn.44dog.com"],
      currency: "IDR"
    },
    VND: {
      domain: ["vnd.44dog.com"],
      currency: "VND"
    },
    PH: {
      domain: ["php.44dog.com"],
      currency: "PHP"
    },
  };
  

  export function getRegion() {
    const hostname = new URL(window.location).hostname;
  
    for (const [country, { domain, currency }] of Object.entries(DomainMappings)) {
      if (domain.some((d) => d.includes(hostname))) {
        return { country, currency };
      }
    }
  
    return null; 
  }
  