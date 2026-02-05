import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from './date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Component/Common/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'React Hook Form과 통합된 DatePicker 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

function DatePickerWithForm(args: React.ComponentProps<typeof DatePicker>) {
  interface FormValues {
    targetDate: Date | undefined;
  }

  const [submittedData, setSubmittedData] = React.useState<FormValues | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      targetDate: undefined,
    },
    mode: 'onSubmit',
  });

  const onSubmit = (data: FormValues) => {
    setSubmittedData(data);
  };

  const watchedDate = watch('targetDate');

  return (
    <div className="w-[340px] space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">

          <Controller
            control={control}
            name="targetDate"
            rules={{ required: '공연 날짜를 선택해주세요.' }}
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <DatePicker
                {...args}
                ref={ref}
                label="공연 날짜"
                required
                value={value}
                onChange={onChange}
                error={!!error}
                errorMessage={error?.message}
                placeholder="날짜를 선택하세요"
              />
            )}
          />
        </div>

        <button
          type="submit"
          className={`
            w-full rounded-md bg-black px-4 py-2.5 text-sm font-bold text-white
            transition-colors
            hover:bg-gray-800
          `}
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div
          className={`
            rounded-lg border border-green-200 bg-green-50 p-4 text-sm
            text-green-800
          `}
        >
          <p className="mb-1 font-bold">🎉 제출 성공!</p>
          <p>
            선택된 날짜:
            {' '}
            <span className="font-mono font-bold">
              {submittedData.targetDate?.toLocaleDateString()}
            </span>
          </p>
        </div>
      )}

      <div
        className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs"
      >
        <p className="mb-1 font-semibold text-gray-500">Form State Watch:</p>
        <pre className="font-mono text-blue-600">
          {JSON.stringify({ targetDate: watchedDate ?? null, errors }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export const WithReactHookForm: Story = {
  name: 'With React Hook Form',
  render: args => <DatePickerWithForm {...args} />,
};

export const Disabled: Story = {
  name: 'Disabled State',
  args: {
    disabled: true,
    placeholder: '비활성화된 입력 필드',
  },
  render: (args) => {
    return (
      <div className="w-[340px]">
        <DatePicker {...args} />
        <p className="mt-2 text-xs text-gray-500">
          * 입력 필드가 비활성화되어 클릭해도 달력이 열리지 않습니다.
        </p>
      </div>
    );
  },
};
