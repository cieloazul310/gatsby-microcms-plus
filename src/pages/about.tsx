import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import { Flex, Button } from '@chakra-ui/react';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import Paper from '../components/Paper';
import chakraComponents from '../components/chakraComponents';
import type { MicrocmsHello } from '../../types';

type AboutPageQueryData = {
  microcmsHello: Pick<MicrocmsHello, 'text' | 'textarea' | 'image' | 'date' | 'socials'>;
};

function About({ data }: PageProps<AboutPageQueryData>) {
  const { microcmsHello } = data;
  const { textarea, image, date, socials } = microcmsHello;

  return (
    <BasicLayout title="About">
      <Paper>
        <article>
          <chakraComponents.h2>最初のAPIのテスト</chakraComponents.h2>
          <section>
            <chakraComponents.h3>テキストエリア</chakraComponents.h3>
            <chakraComponents.p>{textarea}</chakraComponents.p>
          </section>
          {image ? (
            <section>
              <chakraComponents.h3>画像</chakraComponents.h3>
              <chakraComponents.img borderRadius="xl" src={image.url} />
            </section>
          ) : null}
          <section>
            <chakraComponents.h3>日時</chakraComponents.h3>
            <chakraComponents.p>{date}</chakraComponents.p>
          </section>
          <section>
            <chakraComponents.h3>ソーシャル(カスタムフィールド)</chakraComponents.h3>
            <Flex direction={['column', 'row']} gap={2}>
              {socials.map(({ name, url }) => (
                <Button key={url} as={chakraComponents.a} href={url} colorScheme="primary">
                  {name}
                </Button>
              ))}
            </Flex>
          </section>
        </article>
      </Paper>
    </BasicLayout>
  );
}

export default About;

export function Head() {
  return <Seo title="About" />;
}

export const query = graphql`
  query {
    microcmsHello {
      text
      textarea
      image {
        url
        width
        height
      }
      date(formatString: "YYYY-MM-DD")
      socials {
        name
        url
      }
    }
  }
`;
