import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { AlertTriangle, Info, Plus } from "@/app/icons/lucide";

export function TownpickMessage() {
  return (
    <div className="flex flex-col gap-6 py-6 md:px-5">
      <Card>
        <CardHeader className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <CardTitle>발송 메시지</CardTitle>
            <span className="text-sm font-medium text-destructive">(필수)</span>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-semibold">제목</Label>
              <span className="text-sm font-medium text-destructive">(필수)</span>
            </div>
            <Input placeholder="가장 특징되는 설명을 간단하게 입력해주세요. 띄어쓰기 포함 최소 7자, 최대 32자까지 입력 가능합니다." />
            <div className="text-sm text-foreground">0 / 32자 입력</div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-semibold">내용</Label>
              <span className="text-sm font-medium text-destructive">(필수)</span>
            </div>
            <Textarea
              className="min-h-[120px]"
              placeholder="고객에게 전달할 내용을 자세히 입력해주세요. 연락처 기재 및 외부 플랫폼 유도 문구 기재시 등록이 제한됩니다."
            />
            <div className="text-sm text-foreground">0 / 1200자 입력</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col items-start gap-2">
          <CardTitle>연결된 매물</CardTitle>
          <CardDescription>연결된 매물 설정시 동네픽 메시지에서 바로 해당 매물을 확인할수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="h-32 w-32 flex-col gap-2">
            <Plus className="h-4 w-4" />
            추가
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col items-start gap-2">
          <CardTitle>발송 대상 고객</CardTitle>
          <CardDescription>최적화 타겟팅을 통해 선별된 고객에게 등록하신 동네픽 메시지가 전달됩니다.</CardDescription>
          <CardDescription className="text-destructive">
            타겟 대상으로 선택하신 지역, 시세, 단지 정보는 고객에게 직접 노출되지 않습니다.
          </CardDescription>
          <CardDescription>
            특정 지역, 단지에 대해 고객에게 안내가 필요한 경우, 발송 메시지의 제목 또는 내용에 상세하게 적어주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-semibold">신청 건수</Label>
                  <span className="text-sm font-medium text-destructive">(필수)</span>
                </div>
                <span className="text-sm text-mutedForeground">잔여건수 000건</span>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100건</SelectItem>
                  <SelectItem value="200">200건</SelectItem>
                  <SelectItem value="300">300건</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-semibold">지역 선택</Label>
                <span className="text-sm font-medium text-destructive">(필수)</span>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="메시지를 보낼 고객의 관심 지역을 선택해 주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seoul">서울</SelectItem>
                  <SelectItem value="gyeonggi">경기</SelectItem>
                  <SelectItem value="incheon">인천</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-sm font-semibold">매물 시세 조회 금액 선택</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="특정 금액대를 조회한 고객으로 타게팅할 수 있어요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="range-1">3억 이하</SelectItem>
                  <SelectItem value="range-2">3억 ~ 6억</SelectItem>
                  <SelectItem value="range-3">6억 이상</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-sm font-semibold">단지 선택</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="관심 단지로 타게팅을 원하실 경우, 선택해 주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sample-1">래미안</SelectItem>
                  <SelectItem value="sample-2">자이</SelectItem>
                  <SelectItem value="sample-3">힐스테이트</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <CardTitle>관심 태그</CardTitle>
            <Info className="h-4 w-4 text-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="선택 안함" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">선택 안함</SelectItem>
              <SelectItem value="near-station">역세권</SelectItem>
              <SelectItem value="new-build">신축</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Alert className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
        <AlertDescription className="text-sm text-foreground">
          허위로 작성된 메시지 신고 접수시 한달간 동네픽 등록이 제한되오니, 반드시 사실이 확인된 내용을
          작성해주세요.
        </AlertDescription>
      </Alert>

      <div className="flex justify-center">
        <Button disabled className="min-w-[200px]">
          메시지 미리보기
        </Button>
      </div>
    </div>
  );
}
