
export type LOG_LEVEL = 'fatal' | 'error' | 'warning' | 'info' | 'debug';
export type LOG_CATEGORY = 'API' | 'ClassroomApp';

type LogProps = {
  level?: LOG_LEVEL;
  category?: LOG_CATEGORY;
  message: string;
  data?: any;
};

export const log = (props: LogProps) => {
  const { level = 'debug' } = props;

  switch (level) {
    case 'info':
      console.info(description(props));
      break;
    case 'debug':
      console.debug(description(props));
      break;
    case 'warning':
      console.warn(description(props));
      break;
    default:
      console.log(description(props));
      break;
  }
};

// CONVENIENCE

const fatal = (category: LOG_CATEGORY, message: string, data: any = null) => {
  log({ level: 'fatal', message, category, data });
};

const error = (category: LOG_CATEGORY, message: string, data: any = null) => {
  log({ level: 'error', message, category, data });
};

const warning = (category: LOG_CATEGORY, message: string, data: any = null) => {
  log({ level: 'warning', message, category, data });
};

const info = (category: LOG_CATEGORY, message: string, data: any = null) => {
  log({ level: 'info', message, category, data });
};

const debug = (category: LOG_CATEGORY, message: string, data: any = null) => {
  log({ level: 'debug', message, category, data });
};

const Log = { fatal, error, warning, info, debug };
export default Log;

// --------------------------------------------
// Helpers
// --------------------------------------------

const description = (props: LogProps) => {
  const { level = 'debug', category, message, data } = props;
  const emoji = levelEmoji(level);
  var output = `${emoji} ${level.toUpperCase()}`;
  if (category) output = `${output} [${category}]`;
  output = `${output}\n${message}`;
  try {
    if (data) output = `${output}\n\n${JSON.stringify(data, null, 2)}`;
  } catch (e) {
    console.log('ERROR stringifying JSON for error description', 'debugging', data)
  }
  return output;
};

const levelEmoji = (level: LOG_LEVEL): string => {
  switch (level) {
    case 'fatal':
      return '❌';
    case 'error':
      return '🚫';
    case 'debug':
      return '🛠';
    case 'info':
      return 'ℹ️';
    case 'warning':
      return '🟡';
  }
}