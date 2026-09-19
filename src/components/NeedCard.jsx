import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { categoryById, statusMeta } from "../data/categories";
import { pct } from "../utils/format";
import Progress from "./ui/Progress.jsx";

export default function NeedCard({ need, layout = "vertical" }) {
  const cat = categoryById(need.category);
  const percent = pct(need.collected, need.target);
  const status = statusMeta[need.status];
  const Icon = cat.icon;
  const remaining =
    need.status === "selesai"
      ? "Kebutuhan terpenuhi"
      : need.unit === "Rp"
        ? `Kurang ${(need.target - need.collected).toLocaleString("id-ID")}`
        : `Kurang ${need.target - need.collected} ${need.unit}`;

  if (layout === "horizontal") {
    return (
      <Link
        to={`/kebutuhan/${need.id}`}
        className="group flex gap-4 rounded-2xl border border-sand-200/80 bg-white p-3 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
      >
        <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-xl">
          <img
            src={need.media[0]?.url || cat.image}
            alt={need.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-lg text-white shadow-soft"
            style={{ backgroundColor: cat.color }}
          >
            <Icon size={14} />
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col py-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: cat.color }}>
              {cat.name}
            </span>
            {status && (
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${status.tone}`}>
                {status.label}
              </span>
            )}
          </div>
          <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-sand-950">{need.title}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-sand-500">
            <MapPin size={12} /> {need.location.village}, {need.location.regency}
          </p>
          <div className="mt-auto pt-2">
            <Progress collected={need.collected} target={need.target} tone="moss" size="sm" showPct />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/kebutuhan/${need.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200/80 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={need.media[0]?.url || cat.image}
          alt={need.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-sand-950/55 to-transparent" />
        <span
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow-soft"
          style={{ backgroundColor: cat.color }}
        >
          <Icon size={12} /> {cat.name}
        </span>
        {status && (
          <span
            className={`absolute right-3 top-3 rounded-full border bg-white/95 px-2.5 py-1 text-[10px] font-bold ${status.tone}`}
          >
            {status.label}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-sand-950">{need.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-sand-500">
          <MapPin size={12} /> {need.location.village}, {need.location.regency}
        </p>
        <p className="tnum mt-2 text-sm font-semibold text-sand-800">
          {need.collected.toLocaleString("id-ID")} / {need.target.toLocaleString("id-ID")}{" "}
          {need.unit === "Rp" ? "— dana" : need.unit}
        </p>
        <div className="mt-2">
          <Progress collected={need.collected} target={need.target} tone="moss" size="sm" showPct />
        </div>
        <p className="mt-2.5 text-xs font-semibold text-brand-700">{remaining}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-all group-hover:gap-2.5 group-hover:text-brand-800">
          Ambil Bagian <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}
