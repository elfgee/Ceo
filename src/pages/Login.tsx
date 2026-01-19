import * as React from "react";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { useAuth } from "@/app/auth/auth";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");

  return (
    <div className="mx-auto flex min-h-[calc(100vh-66px)] max-w-5xl items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>로그인이 필요합니다</CardTitle>
          <CardDescription>현재는 템플릿 단계라서, 버튼으로 로그인 상태만 토글합니다.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="grid gap-2">
            <div className="text-sm font-semibold">이메일</div>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
          </div>
          <Button onClick={login}>로그인</Button>
        </CardContent>
      </Card>
    </div>
  );
}

