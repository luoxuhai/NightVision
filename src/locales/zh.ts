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
    rectTip: '双指捏放检测框可调整大小',
    color: '颜色',
    distance: '测距',
    take: '拍摄',
    offLight: '息屏',
    saveToPhotos: '已保存到相册',
  },
  settingsScreen: {
    title: '设置',
    version: '版本',
    connect: '联系开发者',
    goodReview: '给个5星好评',
    recommend: {
      title: '我的更多 App',
      appName: '隐私盒子',
      desc: '隐藏私密图片、视频和文件',
    },
    agreement: '协议',
    privacyPolicy: '隐私政策',
    userAgreement: '用户协议',
    advanced: {
      title: '高级设置',
      smoothed: '平滑处理',
      distance: '最小距离：',
      shake: '摇一摇息屏',
      vibrationEnabled: '开启震动',
    },
    donate: {
      success: '感谢您的捐助',
      fail: '捐助失败',
      title: '请我喝咖啡（捐助）',
      subtitle: '支持我们开发更多免费好用的 App',
    },
  },
  permissionManager: {
    camera: '相机',
    saveToPhoto: '添加到相册',
    unavailable: '{{permission}}功能不可用',
    blocked: '请前往设置授予{{permissions}}权限，才能正常使用该功能',
    openSettings: '打开设置',
  },
};

export default zh;

export type Translations = typeof zh;
