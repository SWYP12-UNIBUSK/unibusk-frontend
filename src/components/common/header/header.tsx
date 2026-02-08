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
    initialSearchKeyword?: string;
    searchPlaceholder?: string;
  };

export function Header(props: HeaderProps) {
  if (props.layout === 'SEARCH') {
    return (
      <HeaderShell
        left={<HeaderLogo />}
        middle={(
          <div className="flex w-full items-center gap-8 pr-8 pl-8">
            <div className="w-116">
              <HeaderSearch
                onSearch={props.onSearch}
                initialSearchKeyword={props.initialSearchKeyword}
                placeholder={props.searchPlaceholder}
              />
            </div>
            <HeaderNav align="right" className="ml-auto" />
          </div>
        )}
        right={<HeaderAuth />}
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
