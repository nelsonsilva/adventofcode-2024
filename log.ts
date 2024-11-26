import * as log from '@std/log';

const logHandler = new class extends log.BaseHandler {
  messages: string[] = [];

  override log(msg: string) {
    this.messages.push(msg);
  }
}('INFO')

log.setup({
  handlers: {
    default: logHandler,
  },
});

export default logHandler