import { showDialog } from "vant";
import { useUserStore } from "@/stores/modules/userinfo";
import i18n from "@/lang/index";
export const DomainMappings = [
  {
    country: "TH",
    domain: ["thb.44dog.com", "www.44dog.com", "localhost", "192.168.124.6:8888"],
    currency: "THB",
    merchantCode: 'NewGW_THB',
    trialMerchantCode: 'NewGW_THB_trial'
  },
  {
    country: "INA",
    domain: ["idn.44dog.com"],
    currency: "IDR",
    merchantCode: 'NewGW_IDR',
    trialMerchantCode: 'NewGW_IDR_trial'
  },
  {
    country: "VND",
    domain: ["vnd.44dog.com"],
    currency: "VND",
    merchantCode: 'NewGW_VND',
    trialMerchantCode: 'NewGW_VND_trial'
  },
  {
    country: "PH",
    domain: ["php.44dog.com"],
    currency: "PHP",
    merchantCode: 'NewGW_PHP',
    trialMerchantCode: 'NewGW_PHP_trial'
  }
];

const cityURL = {
  PHP: "https://www.doraphp.com/register",
  THB: "https://www.dorathb.com/register",
  VND: "https://www.doravnd.com/register",
  IDR: "https://www.doraidr.com/register",
  test: "https://dorabettest.mvkbnb.com/register",
};
export function getRegion() {
  const userState = useUserStore();
  if (userState.currency) {
    let obj=DomainMappings.find(item=>item.currency==userState.currency)
    return obj
  }

  const hostname = new URL(window.location.href).hostname;

  for (const obj of DomainMappings) {
    if (obj.domain.some((d) => hostname.includes(d))) {
      return obj;
    }
  }
  return null;
}

export function skipUrl() {
  const userState = useUserStore();
  if(userState.registerUrl){
    return userState.registerUrl
  }else{
    let { currency } = getRegion();
    return cityURL[currency];
  }
}

export async function skipAIA(){
  try{
      await showDialog({ 
        message: i18n.global.t('是否去注册'),
        showCancelButton:true,
        confirmButtonText:i18n.global.t('确定'),
        cancelButtonText:i18n.global.t('取消')
      })
      window.open(skipUrl())
  }
  catch(e){console.log('取消')}
}