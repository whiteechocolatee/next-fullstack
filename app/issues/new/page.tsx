'use client';

import 'easymde/dist/easymde.min.css';

import {
  Button,
  Callout,
  TextField,
} from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const router = useRouter();
  const [errors, setErrors] = useState('');

  const { register, control, handleSubmit } =
    useForm<IssueForm>();

  return (
    <div className='max-w-xl'>
      {errors && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{errors}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=' space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setErrors('An unexpected error occurred.');
          }
        })}>
        <TextField.Root>
          <TextField.Input
            placeholder='Title'
            {...register('title')}
          />
        </TextField.Root>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder='Description'
              {...field}
            />
          )}
        />
        <Button>Submit new Issue</Button>
      </form>
    </div>
  );
};

export default NewIssue;
