import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useLocation } from "react-router-dom";

export function SectionPlaceholder({ title }: { title: string }) {
  const location = useLocation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>현재는 구조/라우팅 템플릿 단계입니다.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-mutedForeground">현재 경로: {location.pathname}</CardContent>
    </Card>
  );
}

