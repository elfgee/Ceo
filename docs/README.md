# PRD 문서

이 폴더는 CEO 프로젝트의 Product Requirements Document (PRD) 문서를 관리합니다.

## 폴더 구조

```
docs/
├── README.md (이 파일)
├── glossary.md (용어집)
└── prd/
    ├── prd.fake-ads-out-restrictions.md
    └── prd.fake-ads-out-policy.md (예정)
```

## 문서 작성 가이드

각 PRD 문서는 다음 구조를 따릅니다:

1. **개요**: 기능의 목적과 배경
2. **목표**: 달성하고자 하는 목표
3. **사용자 스토리**: 주요 사용자와 시나리오
4. **기능 요구사항**: 구현해야 할 기능 목록
5. **UI/UX 요구사항**: 디자인 및 사용자 경험 요구사항
6. **기술 요구사항**: API, 데이터 구조, 기술 스택
7. **우선순위**: 개발 단계별 우선순위
8. **참고사항**: 추가 고려사항
9. **변경 이력**: 문서 수정 내역

## 네이밍 규칙

- PRD 파일명은 `prd.{파일명}.md` 형식을 따릅니다
- 파일명은 URL 경로의 영문을 따라 작성
- URL 경로의 슬래시(/)는 하이픈(-)으로 변환
- 예: `/fake-ads-out/restrictions` → `prd.fake-ads-out-restrictions.md`
- 예: `/ads/apartment/items` → `prd.ads-apartment-items.md`

## 업데이트

PRD 문서는 기능 개발 전에 작성하고, 개발 과정에서 필요에 따라 업데이트합니다.
변경 사항은 문서 하단의 "변경 이력" 섹션에 기록합니다.
