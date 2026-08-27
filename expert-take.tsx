import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface ExpertTakeProps {
  content: string;
}

export function ExpertTake({ content }: ExpertTakeProps) {
  return (
    <Card className="mb-8 bg-muted/50 border-primary/30">
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <Lightbulb className="h-6 w-6 text-primary" />
        <CardTitle>Expert Take (MirbInsight)</CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
          {content}
        </blockquote>
      </CardContent>
    </Card>
  );
}
