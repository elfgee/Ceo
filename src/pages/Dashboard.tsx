import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/auth/auth";

export function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="mx-auto grid max-w-5xl gap-4 px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle>홈 (Dashboard)</CardTitle>
          <CardDescription>로그인 상태에서 보이는 홈입니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-sm text-mutedForeground">좌측 LNB는 홈에서는 노출되지 않습니다.</div>
          <Button variant="outline" onClick={logout}>
            로그아웃
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

