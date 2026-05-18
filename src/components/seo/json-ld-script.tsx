import type { Thing, WithContext } from 'schema-dts';

/* eslint-disable react-dom/no-dangerously-set-innerhtml -- JSON-LD must be rendered as raw JSON in a script tag. */

interface JsonLdScriptProps {
  data: WithContext<Thing>;
  id?: string;
}

export function JsonLdScript({ data, id }: JsonLdScriptProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
