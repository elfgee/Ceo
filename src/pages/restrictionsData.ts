export type RestrictionType = "warning-1" | "warning-2" | "permanent";

export interface Restriction {
  id: string;
  date: string; // yyyy-mm-dd
  officeId: string;
  officeName: string;
  representativeName: string;
  region: string; // "시 구" or "도 시 구"
  violationPolicies: string[]; // ["안심중개사규정", "안심광고관리규정"]
  action: RestrictionType;
}

const generateMockRestrictions = (): Restriction[] => {
  const offices = [
    { id: "office-1", name: "직방부동산", rep: "홍길동", region: "서울 강남구" },
    { id: "office-2", name: "호갱노노부동산", rep: "김철수", region: "경기 성남시 분당구" },
    { id: "office-3", name: "부동산중개", rep: "이영희", region: "서울 서초구" },
    { id: "office-4", name: "신뢰부동산", rep: "박민수", region: "서울 송파구" },
    { id: "office-5", name: "우리부동산", rep: "최지영", region: "경기 수원시 영통구" },
    { id: "office-6", name: "한국부동산", rep: "정대현", region: "서울 강동구" },
    { id: "office-7", name: "프리미엄부동산", rep: "윤서연", region: "서울 마포구" },
    { id: "office-8", name: "스마트부동산", rep: "장현우", region: "경기 고양시 일산동구" },
    { id: "office-9", name: "글로벌부동산", rep: "오수진", region: "서울 영등포구" },
    { id: "office-10", name: "프로부동산", rep: "한동욱", region: "서울 노원구" },
    { id: "office-11", name: "베스트부동산", rep: "강미영", region: "경기 용인시 기흥구" },
    { id: "office-12", name: "골드부동산", rep: "임태호", region: "서울 강서구" },
    { id: "office-13", name: "플러스부동산", rep: "신혜진", region: "서울 종로구" },
    { id: "office-14", name: "파워부동산", rep: "조성민", region: "경기 성남시 수정구" },
    { id: "office-15", name: "엘리트부동산", rep: "배지은", region: "서울 중구" }
  ];

  const policies = [
    ["안심중개사규정"],
    ["안심광고관리규정"],
    ["안심중개사규정", "안심광고관리규정"]
  ];

  const actions: RestrictionType[] = ["warning-1", "warning-2", "permanent"];

  const restrictions: Restriction[] = [];
  const today = new Date();

  for (let i = 0; i < 35; i++) {
    const office = offices[i % offices.length];
    const daysAgo = i;
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);

    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

    restrictions.push({
      id: String(i + 1),
      date: formattedDate,
      officeId: office.id,
      officeName: office.name,
      representativeName: office.rep,
      region: office.region,
      violationPolicies: policies[i % policies.length],
      action: actions[i % actions.length]
    });
  }

  return restrictions;
};

export const mockRestrictions: Restriction[] = generateMockRestrictions();
export const currentUserOfficeId = "office-1";

export const getDateRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    start: formatDate(startDate),
    end: formatDate(endDate)
  };
};

export const getActionLabel = (action: RestrictionType): string => {
  switch (action) {
    case "warning-1":
      return "경고 1회";
    case "warning-2":
      return "경고 2회";
    case "permanent":
      return "영구제한";
  }
};

export const getStatistics = (restrictions: Restriction[]) => {
  const uniqueOffices = new Set(restrictions.map((r) => r.officeId));
  const totalOffices = uniqueOffices.size;
  const totalActions = restrictions.length;
  const warning1 = restrictions.filter((r) => r.action === "warning-1").length;
  const warning2 = restrictions.filter((r) => r.action === "warning-2").length;
  const permanent = restrictions.filter((r) => r.action === "permanent").length;

  return { totalOffices, totalActions, warning1, warning2, permanent };
};

const maskText = (value: string) => {
  if (!value) return "";
  return `${value.slice(0, 1)}${"*".repeat(Math.max(0, value.length - 1))}`;
};

export const formatOfficeLabel = (restriction: Restriction) => {
  if (restriction.officeId === currentUserOfficeId) {
    return `${restriction.officeName}(대표:${restriction.representativeName})`;
  }
  return `${maskText(restriction.officeName)}(대표:${maskText(restriction.representativeName)})`;
};

export const getMostSevereRestriction = (restrictions: Restriction[]) => {
  if (!restrictions.length) return null;
  const severityOrder: Record<RestrictionType, number> = {
    "warning-1": 1,
    "warning-2": 2,
    permanent: 3
  };
  return [...restrictions]
    .sort((a, b) => {
      const severityDiff = severityOrder[b.action] - severityOrder[a.action];
      if (severityDiff !== 0) return severityDiff;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    [0];
};

export const getMyLatestRestriction = (
  restrictions: Restriction[] = mockRestrictions,
  officeId: string = currentUserOfficeId
) => getMostSevereRestriction(restrictions.filter((restriction) => restriction.officeId === officeId));
