import * as React from 'react';
import { type PageProps } from 'gatsby';
import {
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

type PreviewTemplateQueryData = {
  microcmsBlogs: Pick<MicroCMSBlogs, 'slug' | 'title' | 'createdAt' | 'content' | 'featuredImg'>;
};

function Preview({ location }: PageProps<PreviewTemplateQueryData>) {
  const url = new URL(location.href);
  const contentId = url.searchParams.get('contentId');
  const draftKey = url.searchParams.get('draftKey');
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
  const description = data?.microcmsBlogs?.createdAt ?? undefined;
  const content = data?.microcmsBlogs?.content ?? '<p>プレビュー</p>';
  const body = useArticle(content);

  return (
    <BasicLayout title={title} description={description}>
      <Paper as="article">{body}</Paper>
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
