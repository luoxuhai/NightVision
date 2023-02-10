const zh = {
  common: {
    ok: '好',
    confirm: '确认',
    cancel: '取消',
    back: '返回',
    appName: '夜视仪',
    enable: '启动',
    disable: '禁用',
    enabled: '已启动',
    disabled: '已禁用',
    closed: '已关闭',
    opened: '已打开',
    close: '关闭',
    done: '完成',
    share: '分享',
    meter: '米',
    centimeter: '厘米',
  },
  homeScreen: {
    outOfRange: '超出检测范围：10cm - 5m',
    unavailable: {
      title: '无法在此设备运行',
      message:
        '只支持具有激光雷达扫描仪的设备，支持的机型：iPhone 12 Pro(Max)、iPhone 13 Pro (Max)、iPhone 14 Pro (Max)',
    },
    maskTip: '连续快速点击 3 次屏幕，可退出息屏模式',
  },
  settingsScreen: {
    title: '设置',
    version: '版本',
    connect: '联系开发者',
    goodReview: '给个好评',
    recommend: {
      title: 'App 推荐',
      appName: '隐私盒子',
      desc: '隐藏私密图片、视频和文件',
    },
    agreement: '协议',
    privacyPolicy: '隐私政策',
    userAgreement: '用户协议',
    advanced: {
      title: '高级设置',
      smoothed: '平滑处理',
      distance: '距离检测：',
    },
  },
  permissionManager: {
    camera: '相机',
    unavailable: '{{permission}}功能不可用',
    blocked: '请前往设置授予{{permissions}}权限，才能正常使用该功能',
    openSettings: '打开设置',
  },
};

export default zh;

export type Translations = typeof zh;
