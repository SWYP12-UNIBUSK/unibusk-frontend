export const PANEL_WIDTH = 343;
export const PANEL_GAP = 17; // 사이드바와 상세 패널 사이의 간격

export const BUSKING_MAP_SIDEBAR_CSS = {
  '--busking-header-height': '110px',
  '--busking-panel-top-gap': '6px',
  '--busking-panel-top': 'calc(var(--busking-header-height) + var(--busking-panel-top-gap))',
  '--busking-panel-left-gap': '32px',
  '--busking-panel-bottom-gap': '64px',
  '--busking-panel-width': `${PANEL_WIDTH}px`,
  '--busking-panel-gap': `${PANEL_GAP}px`,
} as const;
