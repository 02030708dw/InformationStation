// https://doravnd.mvkbnb.com  // 越南
// https://doraphp.mvkbnb.com  // 菲律宾
// https://doraidn.mvkbnb.com  // 印度尼西亚
// https://dorathb.mvkbnb.com  // 泰国
// https://dorabettest.mvkbnb.com  // 测试

// Domain and Currency Mappings
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
  
  /**
   * Function to get country and currency based on the current hostname
   * @returns {Object} An object containing country and currency code, or null if not found
   */
  export function getRegion() {
    const hostname = new URL(window.location).hostname;
  
    for (const [country, { domain, currency }] of Object.entries(DomainMappings)) {
      if (domain.some((d) => d.includes(hostname))) {
        return { country, currency };
      }
    }
  
    return null; // Return null if no match found
  }
  