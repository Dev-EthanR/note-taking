import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PreviewNoteLoading() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <Skeleton className="h-8 w-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-2 w-full" />
      </CardContent>
    </Card>
  );
}
