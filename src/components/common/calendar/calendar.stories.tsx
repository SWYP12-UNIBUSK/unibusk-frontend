import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Calendar } from './calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Component/Common/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

function SingleDateComponent() {
  const [date, setDate] = useState<Date | undefined>(() => new Date(2026, 0, 1));

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  );
}

export const SingleDate: Story = {
  render: () => <SingleDateComponent />,
  parameters: {
    docs: {
      description: {
        story: '단일 날짜를 선택할 수 있는 캘린더입니다.',
      },
    },
  },
};

function WithDisabledDatesComponent() {
  const [date, setDate] = useState<Date>();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={(date) => {
        // 주말 비활성화
        const day = date.getDay();
        return day === 0 || day === 6;
      }}
    />
  );
}

export const WithDisabledDates: Story = {
  render: () => <WithDisabledDatesComponent />,
  parameters: {
    docs: {
      description: {
        story: '주말 날짜가 비활성화된 캘린더입니다.',
      },
    },
  },
};
