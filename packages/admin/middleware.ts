import acceptLanguage from 'accept-language';
import {locales, defaultLocale} from '@/config';
import {NextApiRequest} from 'next';

// 如果路径名以 .xxx结尾就视为静态文件
const staticFile = /\.(.*)$/;

acceptLanguage.languages(locales);

// 获取 请求头中的语言环境信息
function getLocale(req: NextApiRequest) {
    let languages = acceptLanguage.get(req.headers.accept);
    if (!languages) languages = defaultLocale;
    return languages;
}

// 这段代码主要的作用是通过middleware中间件特性，帮我们在浏览器输入url后，根据特定的条件（请求头中的语言环境信息）去做304的重定向跳转
export function middleware(request: any) {
    const {pathname} = request.nextUrl;

    // 判断请求路径中是否已存在语言，已存在语言则跳过
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;
    
    // 如果是 public 文件，不重定向
    if (staticFile.test(pathname)) return;

    // 获取匹配的 locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return Response.redirect(request.nextUrl);
}

/**
 * 中间件的配置对象。
 * 
 * 这定义了中间件应该匹配的路径模式。通过这种方式，可以排除不需要进行语言环境处理的特定路径，
 * 如 API 路径、静态文件路径等。
 */
export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)'],
};
