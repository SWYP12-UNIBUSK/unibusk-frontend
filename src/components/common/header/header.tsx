'use client';

import { useRef, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { DesktopHeader } from './desktop-header';
import { HeaderSearch } from './header-search';
import { MobileHeader } from './mobile-header';

export type HeaderProps
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
  const auth = useAuth();

  if (props.layout === 'SEARCH') {
    return <SearchHeader auth={auth} props={props} />;
  }

  return (
    <>
      <div className="md:hidden">
        <MobileHeader auth={auth} />
      </div>
      <div className={`
        hidden
        md:block
      `}
      >
        <DesktopHeader auth={auth} />
      </div>
    </>
  );
}

function SearchHeader({
  auth,
  props,
}: {
  auth: ReturnType<typeof useAuth>;
  props: Extract<HeaderProps, { layout: 'SEARCH' }>;
}) {
  const [searchKeyword, setSearchKeyword] = useState(props.initialSearchKeyword ?? '');
  const lastKeywordRef = useRef(props.initialSearchKeyword ?? '');

  const handleSearchKeywordChange = (nextKeyword: string) => {
    const wasEmpty = lastKeywordRef.current.trim() === '';
    const isEmpty = nextKeyword.trim() === '';

    setSearchKeyword(nextKeyword);
    lastKeywordRef.current = nextKeyword;

    if (!wasEmpty && isEmpty) {
      props.onSearchClear?.();
    }
  };

  const search = {
    keyword: searchKeyword,
    onKeywordChange: handleSearchKeywordChange,
    onSearch: props.onSearch,
    placeholder: props.searchPlaceholder,
  };

  return (
    <>
      <div className="md:hidden">
        <MobileHeader
          auth={auth}
          search={(
            <HeaderSearch
              searchKeyword={search.keyword}
              onSearchKeywordChange={search.onKeywordChange}
              onSearch={search.onSearch}
              placeholder={search.placeholder}
              compact={true}
            />
          )}
        />
      </div>
      <div className={`
        hidden
        md:block
      `}
      >
        <DesktopHeader auth={auth} search={search} />
      </div>
    </>
  );
}
