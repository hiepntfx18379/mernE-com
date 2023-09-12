import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "vn",
  fallbackLng: "vn",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        title: "technoly shop",
        label: "Select another language!",
        shop: "Shop",
        products: "Products",
      },
    },
    vn: {
      translation: {
        title: "Cửa hàng công nghệ",
        label: "Chọn ngôn ngữ khác!",
        shop: "Trang chủ",
        products: "Sản phẩm",
      },
    },
  },
});

export default i18n;
