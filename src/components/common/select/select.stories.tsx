import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

const meta = {
  title: 'Component/Common/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const times = Array.from({ length: 25 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-gray-800">Time Variant</h3>
        <div className="flex items-center gap-2.5">
          <label htmlFor="select-time" className="typo-body-m-3 text-gray-800">
            Select
          </label>
          <Select variant="time">
            <SelectTrigger id="select-time" showIcon={false}>
              <SelectValue placeholder="선택 (Time)" />
            </SelectTrigger>
            <SelectContent
              showIcon={false}
              className="max-h-50"
              position="popper"
              align="center"
            >
              <SelectGroup>
                {times.map(time => (
                  <SelectItem showIcon={false} key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-gray-800">Default Variant</h3>
        <div className="flex items-center gap-2.5">
          <label
            htmlFor="select-default"
            className="typo-body-m-3 text-gray-800"
          >
            Select
          </label>
          <Select>
            <SelectTrigger id="select-default">
              <SelectValue placeholder="선택 (Default)" />
            </SelectTrigger>
            <SelectContent className="max-h-50" position="popper">
              <SelectGroup>
                {times.map(time => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
};

const FormSchema = z.object({
  startTime: z.string({
    error: '시작 시간을 선택해주세요.',
  }),
  endTime: z.string({
    error: '종료 시간을 선택해주세요.',
  }),
});

function ReactHookFormExample() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [submittedData, setSubmittedData] = useState<z.infer<typeof FormSchema> | null>(null);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setSubmittedData(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-gray-800">
          <span className="text-red-500">*</span>
          공연 시간
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="start-time" className="typo-body-m-3 text-gray-800">시작</label>
            <Controller
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value} variant="time">
                  <SelectTrigger id="start-time" className="w-27.5" showIcon={false}>
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent
                    showIcon={false}
                    className="max-h-50"
                    position="popper"
                    align="center"
                  >
                    <SelectGroup>
                      {times.map(time => (
                        <SelectItem showIcon={false} key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="end-time" className="typo-body-m-3 text-gray-800">종료</label>
            <Controller
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value} variant="time">
                  <SelectTrigger id="end-time" className="w-27.5" showIcon={false}>
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent
                    showIcon={false}
                    className="max-h-50"
                    position="popper"
                    align="center"
                  >
                    <SelectGroup>
                      {times.map(time => (
                        <SelectItem showIcon={false} key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {form.formState.errors.startTime && (
            <span className="text-xs text-red-500">
              시작:
              {form.formState.errors.startTime.message}
            </span>
          )}
          {form.formState.errors.endTime && (
            <span className="text-xs text-red-500">
              종료:
              {form.formState.errors.endTime.message}
            </span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className={`
          rounded-md bg-slate-900 px-4 py-2 text-white
          hover:bg-slate-700
        `}
      >
        Submit
      </button>

      {submittedData && (
        <div className="mt-4 rounded-md bg-slate-100 p-4">
          <h4 className="mb-2 font-bold text-gray-800">제출된 데이터:</h4>
          <pre className="text-sm text-gray-700">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </form>
  );
}

export const WithReactHookForm: Story = {
  render: () => <ReactHookFormExample />,
};
