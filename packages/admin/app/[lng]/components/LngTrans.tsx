'use client';

import {useState} from 'react';
import {
    useParams,
    useRouter,
    useSelectedLayoutSegments,
} from 'next/navigation';
import {Button, Menu, Radio} from 'antd';


const LangSwitch = () => {
    const urlSegments = useSelectedLayoutSegments();
    const router = useRouter();
    const params = useParams();
    const [locale, setLocal] = useState(params?.lng);


    const handleLocaleChange = (newLocale) => {
        const newUrl = `/${newLocale}/${urlSegments.join('/')}`;
        return newUrl;
    };

    const handleLinkClick = (newLocale) => {
        const resolvedUrl = handleLocaleChange(newLocale);
        router.push(resolvedUrl);
    };

    return (
        <div className="relative inline-block text-left mr-5">
            <Menu>
                <div>
                    <Button>
                        {locale.charAt(0).toUpperCase() + locale.slice(1)}
                    </Button>
                </div>
                <Menu.Item className="absolute right-0 z-50 mt-2 w-12 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                    <Radio.Group value={locale} onChange={handleLinkClick}>
                        <div className="py-1">
                            {languages.map((newLocale) => (
                                <Menu.Item key={newLocale}>
                                    <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm">
                                        {newLocale.charAt(0).toUpperCase() + newLocale.slice(1)}
                                    </button>
                                </Menu.Item>
                            ))}
                        </div>
                    </Radio.Group>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default LangSwitch;

