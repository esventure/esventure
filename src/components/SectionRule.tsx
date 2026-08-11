import { cn } from "@/lib/utils";

/** Thin hairline used to separate major sections without a colour block. */
const SectionRule = ({ className }: { className?: string }) => (
  <div className={cn("container mx-auto px-4", className)} aria-hidden="true">
    <div className="mx-auto max-w-6xl border-t border-current opacity-20" />
  </div>
);

export default SectionRule;
