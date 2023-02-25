import BaseConfig from './config.base';
import ProdConfig from './config.prod';
import DevConfig from './config.dev';

let ExtraConfig = ProdConfig;

if (__DEV__) {
  ExtraConfig = DevConfig;
}

const Config = { ...BaseConfig, ...ExtraConfig };

export default Config;
