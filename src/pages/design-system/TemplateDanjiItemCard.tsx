import * as React from "react";
import { DanjiItemCard } from "@/app/templates/DanjiItemCard";

export function TemplateDanjiItemCard() {
  return (
    <div className="flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold leading-7 text-foreground">DanjiItemCard</h1>
        <p className="text-sm font-normal leading-5 text-mutedForeground">
          단지 매물 카드 템플릿입니다. 기본 width는 510px이며, 반응형으로 줄어듭니다.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Default</h2>
          <div className="flex justify-center p-6 border border-border rounded-[6px] bg-background">
            <div className="w-full" style={{ maxWidth: "510px" }}>
              <DanjiItemCard
                danjiName="래미안 대치 팰리스"
                priceLabel="전세 15억"
                specLeft="84㎡"
                specRight="34층"
                registeredAtLabel="2024.01.15 등록"
                tagPrimary="즉시입주가능"
                tagSecondary="실매물 확인중"
                tagMemo="메모"
                onViewDetail={() => console.log("상세보기")}
                onCloseItem={() => console.log("종료하기")}
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">With Image</h2>
          <div className="flex justify-center p-6 border border-border rounded-[6px] bg-background">
            <div className="w-full" style={{ maxWidth: "510px" }}>
              <DanjiItemCard
                imageSrc="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop"
                danjiName="힐스테이트 청담"
                priceLabel="매매 18억 5천"
                specLeft="102㎡"
                specRight="15층"
                registeredAtLabel="2024.01.20 등록"
                tagPrimary="즉시입주가능"
                tagSecondary="실매물 확인중"
                tagMemo="급매물"
                onViewDetail={() => console.log("상세보기")}
                onCloseItem={() => console.log("종료하기")}
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Needs Check (확인 필요)</h2>
          <div className="flex justify-center p-6 border border-border rounded-[6px] bg-background">
            <div className="w-full" style={{ maxWidth: "510px" }}>
              <DanjiItemCard
                danjiName="자이 아파트"
                priceLabel="전세 12억"
                specLeft="74㎡"
                specRight="8층"
                registeredAtLabel="2024.01.18 등록"
                needsCheck
                tagPrimary="즉시입주가능"
                tagSecondary="실매물 확인중"
                tagMemo="확인 요망"
                onViewDetail={() => console.log("상세보기")}
                onCloseItem={() => console.log("종료하기")}
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Long Text (긴 텍스트 처리)</h2>
          <div className="flex justify-center p-6 border border-border rounded-[6px] bg-background">
            <div className="w-full" style={{ maxWidth: "510px" }}>
              <DanjiItemCard
                danjiName="아주 긴 단지 이름 예시로 텍스트가 어떻게 처리되는지 확인하기 위한 테스트"
                priceLabel="전세 20억 5천만원"
                specLeft="150㎡"
                specRight="45층"
                registeredAtLabel="2024.01.22 등록"
                tagPrimary="즉시입주가능"
                tagSecondary="실매물 확인중이며 추가 정보가 필요한 상태입니다"
                tagMemo="긴 메모 텍스트 예시입니다"
                onViewDetail={() => console.log("상세보기")}
                onCloseItem={() => console.log("종료하기")}
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Responsive (반응형)</h2>
          <p className="text-sm font-normal leading-5 text-mutedForeground">
            카드는 컨테이너 너비에 맞춰 자동으로 줄어듭니다.
          </p>
          <div className="flex flex-col gap-4 p-6 border border-border rounded-[6px] bg-background">
            <div className="w-full" style={{ maxWidth: "510px" }}>
              <DanjiItemCard
                danjiName="래미안 대치 팰리스"
                priceLabel="전세 15억"
                specLeft="84㎡"
                specRight="34층"
                registeredAtLabel="2024.01.15 등록"
                tagPrimary="즉시입주가능"
                tagSecondary="실매물 확인중"
                tagMemo="메모"
                onViewDetail={() => console.log("상세보기")}
                onCloseItem={() => console.log("종료하기")}
              />
            </div>
            <div className="w-full" style={{ maxWidth: "400px" }}>
              <DanjiItemCard
                danjiName="힐스테이트 청담"
                priceLabel="매매 18억 5천"
                specLeft="102㎡"
                specRight="15층"
                registeredAtLabel="2024.01.20 등록"
                tagPrimary="즉시입주가능"
                tagSecondary="실매물 확인중"
                tagMemo="급매물"
                onViewDetail={() => console.log("상세보기")}
                onCloseItem={() => console.log("종료하기")}
              />
            </div>
            <div className="w-full" style={{ maxWidth: "300px" }}>
              <DanjiItemCard
                danjiName="자이 아파트"
                priceLabel="전세 12억"
                specLeft="74㎡"
                specRight="8층"
                registeredAtLabel="2024.01.18 등록"
                tagPrimary="즉시입주가능"
                tagSecondary="실매물 확인중"
                tagMemo="메모"
                onViewDetail={() => console.log("상세보기")}
                onCloseItem={() => console.log("종료하기")}
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold leading-7 text-foreground">Card Structure</h2>
          <div className="flex flex-col gap-2 p-4 border border-border rounded-[6px] bg-background">
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground">
              <li>
                <strong>CardHeader:</strong> 이미지 + 단지 정보 (단지명, 가격, 평형/층수, 등록일, 확인 필요 배지)
              </li>
              <li>
                <strong>CardContent:</strong> 태그 (즉시입주가능, 실매물 확인중, 메모) + 액션 버튼 (상세보기, 종료하기)
              </li>
              <li>
                <strong>기본 너비:</strong> 510px (max-w-md 기반)
              </li>
              <li>
                <strong>반응형:</strong> 부모 컨테이너 너비에 맞춰 자동 조절
              </li>
              <li>
                <strong>텍스트 처리:</strong> 긴 텍스트는 truncate 처리
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
