import { issueSchema } from '@/app/validationSchemas';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { error } from 'console';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }

  const editedIssue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!editedIssue) {
    return NextResponse.json(
      { error: 'Invalid issue' },
      { status: 404 },
    );
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: editedIssue.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}
