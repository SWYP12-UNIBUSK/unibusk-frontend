import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';
import { HeaderSearch } from './header-search';
import { MobileHeader } from './mobile-header';

const meta: Meta<typeof MobileHeader> = {
  title: 'Component/Common/Header',
  component: MobileHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { value: 'mobile' },
  },
};

export default meta;
type Story = StoryObj<typeof MobileHeader>;

const loggedInAuth: ReturnType<typeof useAuth> = {
  user: {
    memberId: 1,
    email: 'unibusk@example.com',
    name: '날아다니는 우주 4606',
  },
  isAuthenticated: true,
  isPending: false,
  logout: async () => {},
  isLogoutPending: false,
};

const loggedOutAuth: ReturnType<typeof useAuth> = {
  user: null,
  isAuthenticated: false,
  isPending: false,
  logout: async () => {},
  isLogoutPending: false,
};

export const MobileLoggedIn: Story = {
  args: {
    auth: loggedInAuth,
  },
};

export const MobileLoggedOut: Story = {
  args: {
    auth: loggedOutAuth,
  },
};

export const MobileSearch: Story = {
  args: {
    auth: loggedOutAuth,
  },
  render: args => <MobileSearchHeader {...args} />,
};

function MobileSearchHeader({ auth }: React.ComponentProps<typeof MobileHeader>) {
  const [keyword, setKeyword] = useState('');

  return (
    <MobileHeader
      auth={auth}
      search={(
        <HeaderSearch
          searchKeyword={keyword}
          onSearchKeywordChange={setKeyword}
          onSearch={() => {}}
          compact={true}
        />
      )}
    />
  );
}
