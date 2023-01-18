import type { CreateNodeArgs, Node } from 'gatsby';
import { createRemoteFileNode } from 'gatsby-source-filesystem';
import type { MicrocmsBlogs } from '../../types';

function isMicorcmBlogs(node: Node): node is MicrocmsBlogs {
  return node.internal.type === 'MicrocmsBlogs';
}

export default async function onCreateNode({ node, actions: { createNode, createNodeField }, createNodeId, getCache }: CreateNodeArgs) {
  if (!isMicorcmBlogs(node) || !node.eyecatch) return;

  const fileNode = await createRemoteFileNode({
    url: node.eyecatch.url, // string that points to the URL of the image
    parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
    createNode, // helper function in gatsby-node to generate the node
    createNodeId, // helper function in gatsby-node to generate the node id
    getCache,
  });
  if (fileNode) {
    createNodeField({ node, name: 'localFile', value: fileNode.id });
  }
}
