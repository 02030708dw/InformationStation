import { showDialog } from "vant";
const DomainMappings = {
  TH: {
    domain: ["thb.44dog.com", "www.44dog.com","localhost","192.168.124.6:8888" ],
    currency: "THB",
    merchantCode:'NewGW_THB',
    trialMerchantCode:'NewGW_THB_trial'
  },
  INA: {
    domain: ["idn.44dog.com",],
    currency: "IDR",
    merchantCode:'NewGW_IDR',
    trialMerchantCode:'NewGW_IDR_trial'
  },
  VND: {
    domain: ["vnd.44dog.com"],
    currency: "VND",
    merchantCode:'NewGW_VND',
    trialMerchantCode:'NewGW_VND_trial'
  },
  PH: {
    domain: ["php.44dog.com"],
    currency: "PHP",
    merchantCode:'NewGW_PHP',
    trialMerchantCode:'NewGW_PHP_trial'
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

  for (const [country, { domain, currency,merchantCode,trialMerchantCode }] of Object.entries(
    DomainMappings
  )) {
    if (domain.some((d) => d.includes(hostname))) {
      return { country, currency,merchantCode,trialMerchantCode };
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