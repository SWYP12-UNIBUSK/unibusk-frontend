import type { useAuth } from '@/hooks/use-auth';
import { HeaderAuth } from './header-auth';
import { HeaderLogo } from './header-logo';
import { HeaderNav } from './header-nav';
import { HeaderSearch } from './header-search';
import { HeaderShell } from './header-shell';

interface DesktopHeaderProps {
  auth: ReturnType<typeof useAuth>;
  search?: {
    keyword: string;
    onKeywordChange: (searchKeyword: string) => void;
    onSearch: (searchKeyword: string) => void;
    placeholder?: string;
  };
}

export function DesktopHeader({ auth, search }: DesktopHeaderProps) {
  if (search) {
    return (
      <HeaderShell
        layout="search"
        left={(
          <div className="flex items-center gap-8">
            <HeaderLogo />
            <div className="w-116">
              <HeaderSearch
                searchKeyword={search.keyword}
                onSearchKeywordChange={search.onKeywordChange}
                onSearch={search.onSearch}
                placeholder={search.placeholder}
              />
            </div>
          </div>
        )}
        middle={<div className="min-w-0 flex-1" />}
        right={(
          <div className="flex items-center gap-8">
            <HeaderNav align="right" />
            <HeaderAuth auth={auth} slotWidthClassName="w-36" />
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
      right={<HeaderAuth auth={auth} />}
    />
  );
}
