/**
 * A box-and-arrow diagram drawn as plain SVG on the server: no script, so it
 * reads the same with JavaScript off. Edges are given as explicit points
 * (orthogonal routes are easier to keep tidy by hand than to auto-route),
 * and a dashed "current" slides along each one in the direction of flow.
 * The slide stops when the visitor asks for reduced motion (globals.css).
 */

export type NodeKind = "person" | "app" | "core" | "engine" | "charger" | "store" | "outside" | "edge";

export type DiagramNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: NodeKind;
  title: string;
  lines?: string[];
};

export type DiagramEdge = {
  /** points the edge passes through, start to end */
  points: [number, number][];
  label?: string;
  /** where the label sits; defaults to the middle of the longest segment */
  at?: [number, number];
  /** both directions (no moving current) */
  both?: boolean;
  /** optional or conditional path */
  dashed?: boolean;
};

const kindClass: Record<NodeKind, string> = {
  person: "fill-available-soft stroke-available",
  app: "fill-volt-soft stroke-volt",
  core: "fill-[#efeafd] stroke-[#6a4bc4]",
  engine: "fill-volt-soft stroke-ink-soft",
  charger: "fill-charging-soft stroke-charging-text",
  store: "fill-white stroke-line-strong",
  outside: "fill-[#fbe9f2] stroke-[#a8336f]",
  edge: "fill-paper stroke-ink",
};

function path(points: [number, number][]) {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
}

function labelPoint(points: [number, number][]): [number, number] {
  let best = 0;
  let at: [number, number] = points[0];
  for (let i = 1; i < points.length; i++) {
    const [ax, ay] = points[i - 1];
    const [bx, by] = points[i];
    const len = Math.abs(bx - ax) + Math.abs(by - ay);
    if (len > best) {
      best = len;
      at = [(ax + bx) / 2, (ay + by) / 2];
    }
  }
  return at;
}

export default function FlowDiagram({
  id,
  width,
  height,
  label,
  nodes,
  edges,
}: {
  id: string;
  width: number;
  height: number;
  label: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}) {
  const arrow = `${id}-arrow`;
  return (
    <div className="no-scrollbar overflow-x-auto rounded-2xl bg-white ring-1 ring-line">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
        className="block h-auto w-full"
        style={{ minWidth: Math.round(width * 0.72) }}
      >
        <defs>
          <marker
            id={arrow}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="fill-muted" />
          </marker>
        </defs>

        <g fill="none">
          {edges.map((e, i) => {
            const d = path(e.points);
            return (
              <g key={i}>
                <path
                  d={d}
                  className="stroke-muted"
                  strokeWidth={1.5}
                  strokeDasharray={e.dashed ? "6 5" : undefined}
                  markerEnd={`url(#${arrow})`}
                  markerStart={e.both ? `url(#${arrow})` : undefined}
                />
                {e.both ? null : <path d={d} className="flow-current stroke-charging" strokeWidth={2.4} />}
              </g>
            );
          })}
        </g>

        {nodes.map((n) => {
          const lines = n.lines ?? [];
          const block = 15 + (lines.length ? 5 + lines.length * 15 : 0);
          const top = n.y + n.h / 2 - block / 2;
          return (
            <g key={n.id}>
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx={10}
                strokeWidth={1.4}
                className={kindClass[n.kind]}
              />
              <text
                x={n.x + n.w / 2}
                y={top + 12}
                textAnchor="middle"
                className="fill-ink text-[13px] font-semibold"
              >
                {n.title}
              </text>
              {lines.map((l, i) => (
                <text
                  key={i}
                  x={n.x + n.w / 2}
                  y={top + 32 + i * 15}
                  textAnchor="middle"
                  className="fill-muted text-[11.5px]"
                >
                  {l}
                </text>
              ))}
            </g>
          );
        })}

        {edges.map((e, i) => {
          if (!e.label) return null;
          const [x, y] = e.at ?? labelPoint(e.points);
          return e.label.split("\n").map((t, j, all) => (
            <text
              key={`${i}-${j}`}
              x={x}
              y={y + (j - (all.length - 1) / 2) * 13 + 4}
              textAnchor="middle"
              className="fill-body text-[11px]"
              style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 5, strokeLinejoin: "round" }}
            >
              {t}
            </text>
          ));
        })}
      </svg>
    </div>
  );
}
