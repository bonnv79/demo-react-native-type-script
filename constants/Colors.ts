const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const ALERT_COLOR = {
  danger: '#f44336',
  success: '#04AA6D',
  info: '#2196F3',
  warning: '#ff9800',
};

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  ALERT_COLOR,
};
