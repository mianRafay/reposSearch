import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useLocales = (localeKey: string, section?: string) => {
    const [Locales, setLocales] = useState<any>({});
    const { locales } = useSelector((state: any) => state?.locales ?? {});

    useEffect(() => {
        section = section ?? 'webbloom';
        if (locales && locales[section]) {
            const loc = locales[section][localeKey];
            if (loc) {
                setLocales(loc);
            }
        }
    }, [locales]);

    return [Locales];
};
() => {};

export default useLocales;
