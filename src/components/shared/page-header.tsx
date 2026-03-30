import { Badge } from "@/components/ui/badge";

export function PageHeader({
  title,
  description,
  stub,
  children,
}: {
  title: string;
  description?: string;
  stub?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {stub && (
            <Badge variant="outline" className="border-dashed text-muted-foreground">
              Vision
            </Badge>
          )}
        </div>
        {description && (
          <p className="mt-1 text-[15px] text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
