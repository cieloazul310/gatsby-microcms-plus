import * as React from 'react';
import { type PageProps } from 'gatsby';
import {
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import BasicLayout from '../layout/Basic';
import Seo from '../components/Seo';
import Paper from '../components/Paper';
import useArticle from '../utils/useArticle';
import type { MicroCMSBlogs } from '../../types';

function dateToYYYYMMDD(dateString?: string | null) {
  if (!dateString) return undefined;

  const date = new Date(dateString);
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];

  return `${year}年${(month + 1).toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日`;
}

type PreviewTemplateQueryData = {
  microcmsBlogs: Pick<MicroCMSBlogs, 'slug' | 'title' | 'createdAt' | 'publishedAt' | 'updatedAt' | 'content' | 'featuredImg'>;
};

function Preview({ location }: PageProps<PreviewTemplateQueryData>) {
  const { contentId, draftKey } = React.useMemo(() => {
    if (typeof window !== 'object') return { contentId: null, draftKey: null };
    const url = new URL(location.href);
    const id = url.searchParams.get('contentId');
    const key = url.searchParams.get('draftKey');
    return { contentId: id, draftKey: key };
  }, [location]);

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const initialRef = React.useRef<HTMLInputElement | null>(null);

  const [data, setData] = React.useState<PreviewTemplateQueryData | null>(null);

  const onSubmit = async () => {
    const apiKey = initialRef.current?.value;
    if (!apiKey) return;
    try {
      const fetched = await fetch(`https://cieloazul310.microcms.io/api/v1/blogs/${contentId}?draftKey=${draftKey}`, {
        headers: {
          'X-MICROCMS-API-KEY': apiKey,
        },
      }).then((res) => res.json());
      setData({ microcmsBlogs: fetched });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };
  const title = data?.microcmsBlogs?.title ?? 'Preview';
  const publishedAt = dateToYYYYMMDD(data?.microcmsBlogs?.publishedAt ?? data?.microcmsBlogs?.createdAt);
  const updatedAt = dateToYYYYMMDD(data?.microcmsBlogs?.updatedAt);
  const description = publishedAt;
  const content = data?.microcmsBlogs?.content ?? '<p>プレビュー</p>';
  const body = useArticle(content);

  return (
    <BasicLayout title={title} description={description}>
      <Paper as="article">{body}</Paper>
      <Paper as="footer">
        <Heading as="h1" size="sm" mb={2}>
          {title}
        </Heading>
        <Text>公開日: {publishedAt ?? 'YYYY年MM月DD日'}</Text>
        <Text>更新日: {updatedAt ?? 'YYYY年MM月DD日'}</Text>
      </Paper>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>contentId</FormLabel>
              <Input isReadOnly value={contentId ?? ''} />
              <FormLabel>draftKey</FormLabel>
              <Input isReadOnly value={draftKey ?? ''} />
              <FormLabel>microCMS API Key</FormLabel>
              <Input type="microCMS APIKEY" ref={initialRef} placeholder="X-MICROCMS-API-KEY" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </BasicLayout>
  );
}

export default Preview;

export function Head() {
  return <Seo title="Preview" />;
}
