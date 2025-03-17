import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticPropsWithTranslations = (): GetStaticProps => {
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