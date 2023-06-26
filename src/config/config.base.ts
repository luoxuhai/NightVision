import { appId } from '../../app.json';

interface IBaseConfig {
  appId: string;
  email: string;
  productId: string;
  productId2: string;

  appStoreUrl: {
    cn: string;
    global: string;
    urlSchema: string;
  };

  privacyPolicy: {
    zh_cn: string;
    en_us: string;
  };

  userAgreement: {
    zh_cn: string;
    en_us: string;
  };
}

const BaseConfig: IBaseConfig = {
  appId,
  email: 'darkce97@gmail.com',

  productId: 'net.darkce.nvd.premium.8',
  productId2: 'net.darkce.nvd.donate_2',

  appStoreUrl: {
    cn: `https://apps.apple.com/cn/app/id${appId}`,
    global: `https://apps.apple.com/app/id${appId}`,
    urlSchema: `itms-apps://itunes.apple.com/app/id${appId}`,
  },

  privacyPolicy: {
    zh_cn: 'https://night-vision-web.netlify.app/zh-cn/privacy-policy',
    en_us: 'https://night-vision-web.netlify.app/en-us/privacy-policy',
  },

  userAgreement: {
    zh_cn: 'https://night-vision-web.netlify.app/zh-cn/user-agreement',
    en_us: 'https://night-vision-web.netlify.app/en-us/user-agreement',
  },
};

export default BaseConfig;
