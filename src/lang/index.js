import { createI18n } from "vue-i18n";
import { cn } from "./cn.js";
import { en } from "./en.js";
import { th } from "./th.js";

const messages = { en, cn, th };
const i18n = createI18n({
  legacy: false, // 设置为 false，启用 composition API 模式
  messages,
  locale: localStorage.getItem("lang") || "cn", // 设置默认语言
  fallbackLocale: "en",
  fallbackWarn: false,//去除警告
  missingWarn: false,//去除警告
});
export default i18n;