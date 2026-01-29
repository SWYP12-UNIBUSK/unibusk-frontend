'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type LayerKey
  = | 'header'
    | 'sidebar'
    | 'modalBackdrop'
    | 'modal'
    | 'nestedBackdrop'
    | 'nested'
    | 'popup';

const Z_TOKENS = {
  header: 100,
  sidebar: 200,
  modalBackdrop: 995,
  modal: 1000,
  nestedBackdrop: 1005,
  nested: 1010,
  popup: 1100,
} as const;

const LABEL: Record<LayerKey, string> = {
  header: 'Header',
  sidebar: 'Sidebar',
  modalBackdrop: 'Modal Backdrop',
  modal: 'Modal',
  nestedBackdrop: 'Nested Backdrop',
  nested: 'Nested Modal',
  popup: 'Popup',
};

function ToggleButton({
  pressed,
  label,
  sub,
  onClick,
  disabled,
}: {
  pressed: boolean;
  label: string;
  sub: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={`
        flex w-full items-center justify-between gap-3 rounded-xl border px-3
        py-2 text-left text-sm transition
        ${disabled ? 'opacity-50' : 'hover:-translate-y-0.5 hover:shadow-sm'}
        ${pressed ? 'border-border bg-card' : 'border-border bg-background'}
        focus:ring-2 focus:ring-ring focus:ring-offset-2
        focus:ring-offset-background focus:outline-none
      `}
    >
      <span className="flex flex-col">
        <span className="font-medium">{label}</span>
        <span className="text-xs text-gray-600">{sub}</span>
      </span>
      <span className="text-xs text-gray-600">{pressed ? 'ON' : 'OFF'}</span>
    </button>
  );
}

export default function ZIndexTestPage() {
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({
    header: true,
    sidebar: true,
    modalBackdrop: true,
    modal: true,
    nestedBackdrop: true,
    nested: true,
    popup: true,
  });

  const ordered = useMemo(
    () =>
      (Object.keys(Z_TOKENS) as LayerKey[])
        .slice()
        .sort((a, b) => Z_TOKENS[b] - Z_TOKENS[a]),
    [],
  );

  const setAll = (value: boolean) => {
    setLayers({
      header: value,
      sidebar: value,
      modalBackdrop: value,
      modal: value,
      nestedBackdrop: value,
      nested: value,
      popup: value,
    });
  };

  const toggle = (key: LayerKey) => {
    setLayers((prev) => {
      const next = { ...prev, [key]: !prev[key] };

      if ((key === 'nestedBackdrop' || key === 'nested') && next[key]) {
        next.modalBackdrop = true;
        next.modal = true;
      }

      if ((key === 'modalBackdrop' || key === 'modal') && !next.modal) {
        next.nestedBackdrop = false;
        next.nested = false;
      }

      return next;
    });
  };

  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Z-Index Test</h1>
            <p className="mt-1 text-sm text-gray-600">
              header(100) / sidebar(200) / modal-backdrop(995) / modal(1000) / nested-backdrop(1005) / nested(1010) / popup(1100)
            </p>
          </div>

          <Link
            href="/"
            className={`
              rounded-xl border border-border bg-card px-4 py-2 text-sm
              shadow-sm transition
              hover:-translate-y-0.5 hover:shadow-md
              focus:ring-2 focus:ring-ring focus:ring-offset-2
              focus:ring-offset-background focus:outline-none
            `}
          >
            홈으로
          </Link>
        </div>

        <div className={`
          grid gap-4
          lg:grid-cols-[360px_1fr]
        `}
        >
          <section className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Layers</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAll(true)}
                  className={`
                    rounded-xl border border-border bg-background px-3 py-2
                    text-xs transition
                    hover:-translate-y-0.5 hover:shadow-sm
                    focus:ring-2 focus:ring-ring focus:ring-offset-2
                    focus:ring-offset-background focus:outline-none
                  `}
                >
                  All ON
                </button>
                <button
                  type="button"
                  onClick={() => setAll(false)}
                  className={`
                    rounded-xl border border-border bg-background px-3 py-2
                    text-xs transition
                    hover:-translate-y-0.5 hover:shadow-sm
                    focus:ring-2 focus:ring-ring focus:ring-offset-2
                    focus:ring-offset-background focus:outline-none
                  `}
                >
                  All OFF
                </button>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <ToggleButton
                pressed={layers.header}
                label={`${LABEL.header} (z-header)`}
                sub={`${Z_TOKENS.header}`}
                onClick={() => toggle('header')}
              />
              <ToggleButton
                pressed={layers.sidebar}
                label={`${LABEL.sidebar} (z-sidebar)`}
                sub={`${Z_TOKENS.sidebar}`}
                onClick={() => toggle('sidebar')}
              />
              <ToggleButton
                pressed={layers.modalBackdrop}
                label={`${LABEL.modalBackdrop} (z-modal-backdrop)`}
                sub={`${Z_TOKENS.modalBackdrop}`}
                onClick={() => toggle('modalBackdrop')}
              />
              <ToggleButton
                pressed={layers.modal}
                label={`${LABEL.modal} (z-modal)`}
                sub={`${Z_TOKENS.modal}`}
                onClick={() => toggle('modal')}
              />
              <ToggleButton
                pressed={layers.nestedBackdrop}
                label={`${LABEL.nestedBackdrop} (z-modal-nested-backdrop)`}
                sub={`${Z_TOKENS.nestedBackdrop}`}
                onClick={() => toggle('nestedBackdrop')}
                disabled={!layers.modal}
              />
              <ToggleButton
                pressed={layers.nested}
                label={`${LABEL.nested} (z-modal-nested)`}
                sub={`${Z_TOKENS.nested}`}
                onClick={() => toggle('nested')}
                disabled={!layers.modal}
              />
              <ToggleButton
                pressed={layers.popup}
                label={`${LABEL.popup} (z-popup)`}
                sub={`${Z_TOKENS.popup}`}
                onClick={() => toggle('popup')}
              />
            </div>

            <div className={`
              mt-4 rounded-2xl border border-border bg-background p-3
            `}
            >
              <div className="text-xs font-medium text-gray-700">현재 ON 레이어(높은 z부터)</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {ordered
                  .filter(k => layers[k])
                  .map(k => (
                    <span
                      key={k}
                      className={`
                        rounded-full border border-border bg-card px-2 py-1
                        text-xs
                      `}
                    >
                      {LABEL[k]}
                      :
                      {Z_TOKENS[k]}
                    </span>
                  ))}
                {ordered.filter(k => layers[k]).length === 0 && (
                  <span className="text-xs text-gray-600">모두 OFF</span>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card">
            <div className="relative h-[680px] overflow-hidden rounded-2xl">
              <div className={`
                absolute top-20 left-6 z-0 rounded-xl border border-border
                bg-background px-4 py-3 text-sm shadow-sm
              `}
              >
                base (z-0)
              </div>

              {layers.header && (
                <div className={`
                  absolute top-0 left-0 z-header flex h-14 w-full items-center
                  justify-between border-b border-border bg-background/90 px-4
                  backdrop-blur
                `}
                >
                  <span className="text-sm font-medium">Header (z-header)</span>
                  <span className="text-xs text-gray-600">{Z_TOKENS.header}</span>
                </div>
              )}

              {layers.sidebar && (
                <aside className={`
                  absolute top-0 left-0 z-sidebar h-full w-72 border-r
                  border-border bg-background/90 p-4 pt-20 backdrop-blur
                `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sidebar (z-sidebar)</span>
                    <span className="text-xs text-gray-600">{Z_TOKENS.sidebar}</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className={`
                      h-10 rounded-xl border border-border bg-card
                    `}
                    />
                    <div className={`
                      h-10 rounded-xl border border-border bg-card
                    `}
                    />
                    <div className={`
                      h-10 rounded-xl border border-border bg-card
                    `}
                    />
                  </div>
                </aside>
              )}

              {layers.popup && (
                <div className={`
                  absolute top-20 right-6 z-popup rounded-xl border
                  border-border bg-background px-4 py-3 text-sm shadow-md
                `}
                >
                  <div className="flex items-center justify-between gap-6">
                    <span className="font-medium">Popup (z-popup)</span>
                    <span className="text-xs text-gray-600">{Z_TOKENS.popup}</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-600">항상 최상단이어야 정상</div>
                </div>
              )}

              {layers.modalBackdrop && (
                <div className="absolute inset-0 z-modal-backdrop bg-black/40" />
              )}

              {layers.modal && (
                <div className={`
                  absolute inset-0 z-modal flex items-center justify-center p-6
                `}
                >
                  <div className={`
                    relative w-full max-w-[560px] rounded-2xl border
                    border-border bg-background p-5 shadow-xl
                  `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Modal (z-modal)</span>
                      <span className="text-xs text-gray-600">{Z_TOKENS.modal}</span>
                    </div>

                    <p className="mt-3 text-sm text-gray-600">
                      모달은 헤더/사이드바/모달 백드롭보다 위에 떠야 합니다.
                    </p>

                    <div className="mt-6 flex gap-2">
                      <button className={`
                        rounded-xl border border-border bg-card px-3 py-2
                        text-sm
                      `}
                      >
                        Cancel
                      </button>
                      <button className={`
                        rounded-xl border border-border bg-card px-3 py-2
                        text-sm
                      `}
                      >
                        Confirm
                      </button>
                    </div>

                    <div className={`
                      mt-6 rounded-2xl border border-border bg-card p-4
                    `}
                    >
                      <div className="text-sm font-medium">Nested Modal Zone</div>
                      <div className="mt-1 text-xs text-gray-600">
                        Nested Backdrop/Panel이 Modal 위로 올라오는지 확인하세요.
                      </div>
                    </div>

                    {layers.nestedBackdrop && (
                      <div className={`
                        absolute inset-0 z-modal-nested-backdrop rounded-2xl
                        bg-black/35
                      `}
                      />
                    )}

                    {layers.nested && (
                      <div className={`
                        absolute inset-0 z-modal-nested flex items-center
                        justify-center p-4
                      `}
                      >
                        <div className={`
                          w-full max-w-[440px] rounded-2xl border border-border
                          bg-background p-5 shadow-2xl
                        `}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold">Nested Modal (z-modal-nested)</span>
                            <span className="text-xs text-gray-600">{Z_TOKENS.nested}</span>
                          </div>

                          <p className="mt-3 text-sm text-gray-600">
                            Nested는 Modal보다 위, Popup보다는 아래(또는 필요 시 위)로 보이면 정상입니다.
                          </p>

                          <div className="mt-6 flex gap-2">
                            <button className={`
                              rounded-xl border border-border bg-card px-3 py-2
                              text-sm
                            `}
                            >
                              Close
                            </button>
                            <button className={`
                              rounded-xl border border-border bg-card px-3 py-2
                              text-sm
                            `}
                            >
                              Action
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className={`
                absolute bottom-4 left-4 rounded-xl border border-border
                bg-background px-4 py-3 text-sm shadow-sm
              `}
              >
                기대 순서: Popup(1100) &gt; Nested(1010) &gt; Nested Backdrop(1005) &gt; Modal(1000) &gt; Modal Backdrop(995) &gt; Sidebar(200) &gt; Header(100)
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
