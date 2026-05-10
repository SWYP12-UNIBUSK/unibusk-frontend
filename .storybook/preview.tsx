import type { Preview } from '@storybook/nextjs-vite';
import { Toaster } from '../src/components/common/toast';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    viewport: {
      options: {
        mobile: {
          name: 'Mobile (< 576px)',
          styles: { width: '375px', height: '667px' },
        },
        sm: {
          name: 'SM — 576px',
          styles: { width: '576px', height: '812px' },
        },
        md: {
          name: 'MD — 768px',
          styles: { width: '768px', height: '1024px' },
        },
        lg: {
          name: 'LG — 1024px',
          styles: { width: '1024px', height: '100%' },
        },
        xl: {
          name: 'XL — 1200px',
          styles: { width: '1200px', height: '100%' },
        },
      },
    },
  },

  initialGlobals: {
    viewport: { value: 'mobile', isRotated: false },
  },

  decorators: [
    Story => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default preview;
