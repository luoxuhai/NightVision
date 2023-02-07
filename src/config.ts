import { appId } from '../app.json';

export default {
  appId,
  email: 'darkce97@gmail.com',

  appStoreUrl: {
    cn: `https://apps.apple.com/cn/app/id${appId}`,
    global: `https://apps.apple.com/app/id${appId}`,
  },

  /** 隐私政策 */
  privacyPolicy: {
    zh_cn: 'https://night-vision-web.netlify.app/zh-cn/privacy-policy',
    en_us: 'https://night-vision-web.netlify.app/en-us/privacy-policy',
  },

  /** 用户协议 */
  userAgreement: {
    zh_cn: 'https://night-vision-web.netlify.app/zh-cn/user-agreement',
    en_us: 'https://night-vision-web.netlify.app/en-us/user-agreement',
  },
};
