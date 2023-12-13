import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import {
  Card,
  Flex,
  Heading,
  Text,
} from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: { id: string };
}

const IssuePageDetails = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading as='h2'>{issue.title}</Heading>
      <Flex gap={'2'} my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issue.description}</Card>
    </div>
  );
};

export default IssuePageDetails;