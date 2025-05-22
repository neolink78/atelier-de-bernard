import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticPropsWithTranslations = () => {
  return async ({ locale }: any) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
            'common',
            'index',
            'gallery',
            'contact',
            'paintingId',
            'cart'
        ])),
      },
    };
  };
};