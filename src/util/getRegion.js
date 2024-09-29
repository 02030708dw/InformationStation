import { showDialog } from "vant";
const DomainMappings = {
  TH: {
    domain: ["thb.44dog.com", "www.44dog.com", "localhost"],
    currency: "THB",
    merchantCode:'NewGW_THB'
  },
  INA: {
    domain: ["idn.44dog.com"],
    currency: "IDR",
    merchantCode:'NewGW_IDR'
  },
  VND: {
    domain: ["vnd.44dog.com"],
    currency: "VND",
    merchantCode:'NewGW_VND'
  },
  PH: {
    domain: ["php.44dog.com"],
    currency: "PHP",
    merchantCode:'NewGW_PHP'
  },
};

const cityURL = {
  PHP: "https://www.doraphp.com/register",
  THB: "https://www.dorathb.com/register",
  VND: "https://www.doravnd.com/register",
  IDR: "https://www.doraidr.com/register",
  test: "https://dorabettest.mvkbnb.com/register",
};
export function getRegion() {
  const hostname = new URL(window.location).hostname;

  for (const [country, { domain, currency,merchantCode }] of Object.entries(
    DomainMappings
  )) {
    if (domain.some((d) => d.includes(hostname))) {
      return { country, currency,merchantCode };
    }
  }
  return null;
}

export function skipUrl() {
  let { currency } = getRegion();
  return cityURL["test"];
}

export async function skipAIA(){
  try{
      await showDialog({ message: '是否去注册',showCancelButton:true })
      window.open(skipUrl())
  }
  catch(e){console.log('取消')}
}