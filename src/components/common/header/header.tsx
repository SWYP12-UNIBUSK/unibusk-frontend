'use client';

import { HeaderAuth } from './header-auth';
import { HeaderLogo } from './header-logo';
import { HeaderNav } from './header-nav';
import { HeaderSearch } from './header-search';
import { HeaderShell } from './header-shell';

type HeaderProps
  = | {
    layout?: 'DEFAULT';
  }
  | {
    layout: 'SEARCH';
    onSearch: (searchKeyword: string) => void;
    onSearchClear?: () => void;
    initialSearchKeyword?: string;
    searchPlaceholder?: string;
  };

export function Header(props: HeaderProps) {
  if (props.layout === 'SEARCH') {
    return (
      <HeaderShell
        left={<HeaderLogo />}
        middle={(
          <div className="flex w-full min-w-0 items-center px-8">
            <div className="w-full max-w-116 min-w-0">
              <HeaderSearch
                onSearch={props.onSearch}
                onSearchClear={props.onSearchClear}
                initialSearchKeyword={props.initialSearchKeyword}
                placeholder={props.searchPlaceholder}
              />
            </div>
          </div>
        )}
        right={(
          <div className="flex items-center gap-10">
            <HeaderNav align="right" />
            <HeaderAuth />
          </div>
        )}
      />
    );
  }

  return (
    <HeaderShell
      left={<HeaderLogo />}
      middle={(
        <div className="flex w-full items-center justify-center px-8">
          <HeaderNav align="center" />
        </div>
      )}
      right={<HeaderAuth />}
    />
  );
}
