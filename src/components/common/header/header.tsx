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
        layout="search"
        left={(
          <div className="flex items-center gap-8">
            <HeaderLogo />
            <div className="w-116">
              <HeaderSearch
                onSearch={props.onSearch}
                onSearchClear={props.onSearchClear}
                initialSearchKeyword={props.initialSearchKeyword}
                placeholder={props.searchPlaceholder}
              />
            </div>
          </div>
        )}
        middle={<div className="min-w-0 flex-1" />}
        right={(
          <div className="flex items-center gap-8">
            <HeaderNav align="right" />
            <HeaderAuth slotWidthClassName="w-36" />
          </div>
        )}

      />
    );
  }

  return (
    <HeaderShell
      layout="default"
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
