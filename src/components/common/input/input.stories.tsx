import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormInput } from './input';

const meta: Meta<typeof FormInput> = {
  title: 'Component/Common/FormInput',
  component: FormInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  args: {
    label: '팀 이름',
    required: true,
    placeholder: '팀명 또는 활동명을 적어주세요',
  },
};

export const WithError: Story = {
  args: {
    label: '팀 이름',
    required: true,
    placeholder: '팀명 또는 활동명을 적어주세요',
    error: '필수 입력 사항입니다',
  },
};

function CounterExample() {
  const { register, watch } = useForm({
    defaultValues: { text: '' },
  });

  const text = watch('text');

  return (
    <div>
      <FormInput
        label="팀 이름"
        required
        placeholder="팀명 또는 활동명을 적어주세요"
        maxLength={20}
        showCount
        currentCount={text?.length || 0}
        {...register('text')}
      />
    </div>
  );
}

export const WithCounter: Story = {
  render: () => <CounterExample />,
  parameters: {
    docs: {
      description: {
        story: '글자수 카운터가 있는 입력 필드입니다. 입력할 때마다 실시간으로 글자수가 업데이트됩니다.',
      },
    },
  },
};

const signupSchema = z.object({
  teamName: z.string().min(1, '팀 이름은 필수 입력 사항입니다').max(20, '최대 20자까지 입력 가능합니다'),
  email: z.email('올바른 이메일을 입력해주세요'),
});

type SignupFormData = z.infer<typeof signupSchema>;

function ReactHookFormExample() {
  const [submittedData, setSubmittedData] = useState<SignupFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    watch,
  } = useForm<SignupFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(signupSchema),
    defaultValues: {
      teamName: '',
      email: '',
    },
  });

  const teamName = watch('teamName');

  const onSubmit = (data: SignupFormData) => {
    setSubmittedData(data);
  };

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof SignupFormData;
    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  return (
    <div className="max-w-md space-y-6">
      <div className="rounded-lg bg-blue-50 p-4">
        <p className="text-sm font-semibold text-blue-800">💡 테스트 방법</p>
        <ul className="mt-2 space-y-1 text-sm text-blue-700">
          <li>• 빈 칸으로 Submit 버튼 클릭 → 에러 표시</li>
          <li>• 20자 초과 입력 → 글자수 제한</li>
          <li>• 잘못된 이메일 형식 → Submit 버튼 클릭 → 에러 표시</li>
          <li>• 모두 입력 후 제출 → 아래에 결과 표시</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="팀 이름"
          required
          placeholder="팀명 또는 활동명을 적어주세요"
          maxLength={20}
          showCount
          currentCount={teamName?.length || 0}
          error={errors.teamName?.message}
          {...register('teamName')}
        />

        <FormInput
          label="이메일"
          required
          type="email"
          placeholder="example@email.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <button
          type="submit"
          className={`
            w-full rounded-full bg-blue-600 px-4 py-3 font-semibold text-white
            transition-colors
            hover:bg-blue-700
          `}
        >
          회원가입
        </button>
      </form>

      {submittedData && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="mb-2 font-semibold text-green-800">✅ 제출 성공!</p>
          <dl className="space-y-1 text-sm">
            <div className="flex">
              <dt className="w-20 font-semibold text-green-700">팀 이름:</dt>
              <dd className="text-green-900">{submittedData.teamName}</dd>
            </div>
            <div className="flex">
              <dt className="w-20 font-semibold text-green-700">이메일:</dt>
              <dd className="text-green-900">{submittedData.email}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}

export const WithReactHookForm: Story = {
  render: () => <ReactHookFormExample />,
  parameters: {
    docs: {
      description: {
        story: 'react-hook-form과 zod를 사용한 폼 검증 예시입니다. 포커스 아웃 시 검증되고, 에러 발생 후에는 Submit 버튼을 클릭해서 에러 상태를 제거할 수 있습니다.',
      },
    },
  },
};

function FocusExample() {
  const teamNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleFocusTeamName = () => {
    teamNameRef.current?.focus();
  };

  const handleFocusEmail = () => {
    emailRef.current?.focus();
  };

  return (
    <div className="max-w-md space-y-6">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleFocusTeamName}
          className={`
            rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white
            transition-colors
            hover:bg-green-700
          `}
        >
          팀 이름 포커스
        </button>
        <button
          type="button"
          onClick={handleFocusEmail}
          className={`
            rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white
            transition-colors
            hover:bg-purple-700
          `}
        >
          이메일 포커스
        </button>
      </div>

      <FormInput
        ref={teamNameRef}
        label="팀 이름"
        required
        placeholder="팀명 또는 활동명을 적어주세요"
      />

      <FormInput
        ref={emailRef}
        label="이메일"
        required
        type="email"
        placeholder="example@email.com"
      />
    </div>
  );
}

export const WithFocus: Story = {
  render: () => <FocusExample />,
  parameters: {
    docs: {
      description: {
        story: 'ref를 사용한 프로그래밍 방식의 포커스 제어 예시입니다. 버튼을 클릭하면 해당 필드로 포커스가 이동합니다.',
      },
    },
  },
};

function AllStatesExample() {
  const {
    register,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      valid: 'valid@example.com',
      error: '',
      withCounter: '',
      disabled: '',
    },
  });

  const withCounter = watch('withCounter');

  return (
    <div className="max-w-md space-y-6">
      <FormInput
        label="정상 상태"
        placeholder="example@email.com"
        {...register('valid')}
      />

      <FormInput
        label="에러 상태"
        required
        placeholder="필수 입력 필드"
        error="필수 입력 사항입니다"
        {...register('error')}
      />

      <FormInput
        label="글자수 카운터"
        required
        maxLength={20}
        showCount
        currentCount={withCounter?.length || 0}
        placeholder="최대 20자"
        {...register('withCounter')}
      />

      <FormInput
        label="비활성 상태"
        placeholder="입력 불가"
        disabled
        {...register('disabled')}
      />
    </div>
  );
}

export const AllStates: Story = {
  render: () => <AllStatesExample />,
  parameters: {
    docs: {
      description: {
        story: 'FormInput의 모든 상태를 한눈에 볼 수 있는 예시입니다.',
      },
    },
  },
};
