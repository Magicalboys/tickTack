export const windowConsole = {
    name: 'console',
    action: (text: string = '此为默认输出消息')  => {
        console.log(text);
    }
}