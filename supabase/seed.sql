-- 초기 데이터 (기존 홈페이지 목업 데이터를 서버로 이관)

insert into public.posts (id, category, title, date, author, views, content, is_new, file_type, file_name, file_url, files) values
(1, 'notice', '한국공학대학교 기술지주회사 홈페이지 리뉴얼 안내', '2026.08.27', '관리자', 86, '<p>한국공학대학교 기술지주회사 홈페이지가 새롭게 리뉴얼되었습니다.</p><p>투자, 자회사, 회사소식 등 주요 정보를 보다 쉽게 확인하실 수 있습니다.</p>', true, null, null, null, '[]'::jsonb),
(2, 'notice', '2026년 입주기업 상시 모집 안내', '2026.08.20', '관리자', 142, '<p>시흥비즈니스센터 입주기업을 상시 모집합니다.</p><p>자세한 내용은 지원하기 메뉴를 통해 문의해 주시기 바랍니다.</p>', true, null, null, null, '[]'::jsonb),
(4, 'press', '한국공학대 기술지주회사, 시흥창업펀드 70억 조성', '2025.01.20', '관리자', 154, '한국공학대학교 기술지주회사가 시흥산업진흥원과 함께 시흥창업펀드를 조성했다.
이번 펀드는 총 70억원 규모로, 관내 우수 창업기업 발굴 및 육성에 투입될 예정이다.
...', false, null, null, null, '[]'::jsonb),
(5, 'resources', '기술지주회사 리플렛', '2026.08.27', '관리자', 0, '한국공학대학교 기술지주회사 소개 리플렛입니다.', false, 'PDF', '한국공학대학교기술지주회사_리플렛.pdf', '/files/한국공학대학교기술지주회사_리플렛.pdf', '[{"name":"한국공학대학교기술지주회사_리플렛.pdf","type":"PDF","url":"/files/한국공학대학교기술지주회사_리플렛.pdf"}]'::jsonb),
(10, 'press', '기술지주회사 자회사 ㈜퓨처리스텍, 시리즈A 50억 투자 유치', '2025.01.15', '홍보팀', 892, '한국공학대학교 기술지주회사의 자회사인 ㈜퓨처리스텍이 시리즈A 라운드에서 50억 원 규모의 투자를 유치했다고 밝혔다.

이번 투자는 KB인베스트먼트가 리드하였으며, 기존 투자자인 한국기술지주펀드와 신규 투자자 2곳이 참여했다.

㈜퓨처리스텍은 AI 기반 스마트 팩토리 솔루션을 개발하는 기업으로, 이번 투자금은 글로벌 시장 진출과 R&D 인력 확충에 사용할 예정이다.

회사 관계자는 "이번 투자를 통해 기술 고도화와 해외 진출에 박차를 가할 것"이라고 밝혔다.', false, null, null, null, '[]'::jsonb),
(11, 'press', '한국공학대 기술지주, CES 2025 참가 자회사 5곳 지원', '2025.01.08', '홍보팀', 567, '한국공학대학교 기술지주회사가 자회사 5곳의 CES 2025 참가를 지원했다.

이번에 참가한 자회사는 ㈜이노테크, ㈜에이치엠오, ㈜더웨이, ㈜나노누리, ㈜스태커스 등 5개 기업이다.

각 기업은 AI, IoT, 친환경 기술 분야에서 혁신적인 제품을 선보였으며, 현지에서 글로벌 바이어들과 활발한 상담을 진행했다.

기술지주회사는 자회사들의 해외 전시회 참가 비용 일부와 부스 운영을 지원했다.', false, null, null, null, '[]'::jsonb),
(15, 'press', '기술지주회사, 2024년 투자 성과 발표... 신규 투자 15건 달성', '2024.12.28', '홍보팀', 723, '한국공학대학교 기술지주회사가 2024년 한 해 동안 총 15건의 신규 투자를 집행하며 역대 최고 실적을 달성했다고 밝혔다.

2024년 신규 투자 규모는 총 45억 원으로, 전년 대비 30% 증가한 수치다. 투자 분야는 AI/SW(6건), 바이오헬스(4건), 친환경에너지(3건), 기타(2건) 순이었다.

기술지주회사 관계자는 "2025년에는 딥테크 분야 투자를 확대하고, 기존 포트폴리오 기업들의 후속 투자 유치를 적극 지원할 계획"이라고 밝혔다.', false, null, null, null, '[]'::jsonb),
(20, 'faq', '어떤 기업이 투자 검토 대상인가요?', '2026.08.27', '기업투자본부', 0, '기술기반 창업기업 또는 예비창업자로서 차별화된 기술과 성장 가능성을 보유한 기업을 대상으로 투자를 검토합니다.', false, null, null, null, '[]'::jsonb),
(21, 'faq', 'IR은 어떻게 접수하나요?', '2026.08.27', '기업투자본부', 0, '홈페이지 IR 접수 또는 이메일을 통해 사업계획서(IR 자료)를 제출해 주시면 기업투자본부에서 검토 후 개별 안내드립니다.', false, null, null, null, '[]'::jsonb),
(22, 'faq', '투자 검토는 얼마나 걸리나요?', '2026.08.27', '기업투자본부', 0, '제출 자료와 기업 상황에 따라 달라질 수 있으며, 일반적으로 IR 접수 후 검토 결과는 순차적으로 안내드립니다.', false, null, null, null, '[]'::jsonb),
(23, 'faq', 'TIPS 추천은 어떻게 받을 수 있나요?', '2026.08.27', '기업투자본부', 0, '당사의 투자 및 심사를 거친 기업을 대상으로 기술성, 성장성 등을 종합 검토하여 TIPS 운영사 추천 여부를 결정합니다.', false, null, null, null, '[]'::jsonb),
(24, 'faq', '어떤 지원을 받을 수 있나요?', '2026.08.27', '기업투자본부', 0, '투자뿐만 아니라 TU-RN Up 프로그램, 창업보육센터, 기술사업화 및 정부 연구개발(R&D) 연계 등 다양한 성장지원 프로그램을 제공합니다.', false, null, null, null, '[]'::jsonb),
(25, 'faq', '자회사와 투자기업의 차이는 무엇인가요?', '2026.08.27', '기업투자본부', 0, '자회사는 대학 기술을 활용하여 기술지주회사가 일정 지분을 보유한 기업이며, 투자기업은 기술지주회사가 투자한 포트폴리오 기업을 의미합니다.', false, null, null, null, '[]'::jsonb)
on conflict (id) do nothing;
select setval(pg_get_serial_sequence('public.posts', 'id'), greatest((select max(id) from public.posts), 1));

insert into public.companies (id, name, ceo, founded_date, business, room, move_in_date, homepage, note, is_tips, category, logo, bg_image, short_desc, sort_order) values
('주링크솔루션', '(주)링크솔루션', '권지수', '2023-02-15', '메타버스 콘텐츠 플랫폼', 'P동 310호', '2023-04-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/링크솔루션', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '혁신적인 기술로 미래를 선도합니다', 0),
('㈜이노테크', '㈜이노테크', '김영호', '2021-06-28', 'AI 기반 의료영상 분석 솔루션 개발', 'P동 316호', '2023-05-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/이노테크', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '글로벌 시장을 목표로 도전합니다', 1),
('㈜더웨이', '㈜더웨이', '조은비', '2024-04-09', '신재생에너지 발전 시스템', 'P동 316호', '2023-04-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/더웨이', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '글로벌 시장을 목표로 도전합니다', 2),
('㈜제이케이테크놀로지', '㈜제이케이테크놀로지', '강민재', '2019-04-12', '클라우드 기반 ERP 서비스', 'P동 308호', '2023-04-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/제이케이테크놀로지', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '기술과 사람을 연결합니다', 3),
('주비타민상상력', '(주)비타민상상력', '강민재', '2020-11-24', '클라우드 기반 ERP 서비스', 'P동 316호', '2023-03-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/비타민상상력', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '글로벌 시장을 목표로 도전합니다', 4),
('이트렌코텍', '이트렌코텍', '송민규', '2019-08-03', '빅데이터 분석 컨설팅', 'P동 317호', '2024-01-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/이트렌코텍', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '지속가능한 성장을 추구합니다', 5),
('㈜에이치엠오', '㈜에이치엠오', '조은비', '2019-08-28', '신재생에너지 발전 시스템', 'P동 312호', '2023-02-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/에이치엠오', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '지속가능한 성장을 추구합니다', 6),
('㈜퓨처리스텍', '㈜퓨처리스텍', '송민규', '2019-02-22', '빅데이터 분석 컨설팅', 'P동 309호', '2024-02-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/퓨처리스텍', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '산업의 디지털 전환을 이끕니다', 7),
('㈜비오에스', '㈜비오에스', '오세진', '2018-01-01', 'IoT 스마트홈 솔루션', 'P동 308호', '2023-05-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/비오에스', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '기술과 사람을 연결합니다', 8),
('㈜이소프트', '㈜이소프트', '오세진', '2019-03-15', 'IoT 스마트홈 솔루션', 'P동 312호', '2023-09-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/이소프트', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '지속가능한 성장을 추구합니다', 9),
('㈜이코모스', '㈜이코모스', '김영호', '2024-07-19', 'AI 기반 의료영상 분석 솔루션 개발', 'P동 316호', '2023-08-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/이코모스', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '글로벌 시장을 목표로 도전합니다', 10),
('㈜제노', '㈜제노', '김영호', '2021-01-28', 'AI 기반 의료영상 분석 솔루션 개발', 'P동 308호', '2023-04-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/제노', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '기술과 사람을 연결합니다', 11),
('㈜티케이', '㈜티케이', '김영호', '2018-04-19', 'AI 기반 의료영상 분석 솔루션 개발', 'P동 300호', '2023-07-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/티케이', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '혁신적인 기술로 미래를 선도합니다', 12),
('㈜스태커스', '㈜스태커스', '강민재', '2023-05-19', '클라우드 기반 ERP 서비스', 'P동 316호', '2023-01-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/스태커스', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '글로벌 시장을 목표로 도전합니다', 13),
('㈜케이제이테크', '㈜케이제이테크', '오세진', '2018-09-19', 'IoT 스마트홈 솔루션', 'P동 304호', '2023-08-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/케이제이테크', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '산업의 디지털 전환을 이끕니다', 14),
('㈜에스비에너지', '㈜에스비에너지', '조은비', '2020-11-13', '신재생에너지 발전 시스템', 'P동 312호', '2023-04-01', 'https://www.tukorea.ac.kr', '-', false, 'subsidiary', '/company-logos/에스비에너지', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '지속가능한 성장을 추구합니다', 15),
('엘포톤', '엘포톤', '박서준', '2021-05-12', '친환경 에너지 저장 장치 제조', 'P동 310호', '2023-04-01', 'https://www.tukorea.ac.kr', '-', true, 'portfolio', '/company-logos/엘포톤', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '혁신적인 기술로 미래를 선도합니다', 16),
('기억', '기억', '노현우', '2022-05-21', '전기차 배터리 관리 시스템', 'P동 307호', '2024-01-01', 'https://www.tukorea.ac.kr', '-', true, 'portfolio', '/company-logos/기억', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '지속가능한 성장을 추구합니다', 17),
('와첸', '와첸', '오세진', '2020-05-12', 'IoT 스마트홈 솔루션', 'P동 300호', '2023-03-01', 'https://www.tukorea.ac.kr', '-', false, 'portfolio', '/company-logos/와첸', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '혁신적인 기술로 미래를 선도합니다', 18),
('네이앤컴퍼니', '네이앤컴퍼니', '강민재', '2022-01-23', '클라우드 기반 ERP 서비스', 'P동 308호', '2023-03-01', 'https://www.tukorea.ac.kr', '-', false, 'portfolio', '/company-logos/네이앤컴퍼니', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '기술과 사람을 연결합니다', 19),
('유쾌한프로젝트', '유쾌한프로젝트', '유재석', '2022-06-01', '산업용 로봇 제어 시스템', 'P동 309호', '2024-05-01', 'https://www.tukorea.ac.kr', '-', false, 'portfolio', '/company-logos/유쾌한프로젝트', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '산업의 디지털 전환을 이끕니다', 20),
('메디앤리서치', '메디앤리서치', '조은비', '2024-07-27', '신재생에너지 발전 시스템', 'P동 300호', '2023-09-01', 'https://www.tukorea.ac.kr', '-', false, 'portfolio', '/company-logos/메디앤리서치', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '혁신적인 기술로 미래를 선도합니다', 21),
('이안나노텍', '이안나노텍', '송민규', '2018-02-26', '빅데이터 분석 컨설팅', 'P동 305호', '2024-05-01', 'https://www.tukorea.ac.kr', '-', false, 'portfolio', '/company-logos/이안나노텍', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '혁신적인 기술로 미래를 선도합니다', 22),
('셀바크이노베이션', '셀바크이노베이션', '박서준', '2024-03-28', '친환경 에너지 저장 장치 제조', 'P동 314호', '2023-04-01', 'https://www.tukorea.ac.kr', '-', true, 'portfolio', '/company-logos/셀바크이노베이션', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '산업의 디지털 전환을 이끕니다', 23),
('쉘피아', '쉘피아', '오세진', '2020-06-14', 'IoT 스마트홈 솔루션', 'P동 300호', '2023-05-01', 'https://www.tukorea.ac.kr', '-', false, 'portfolio', '/company-logos/쉘피아', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '혁신적인 기술로 미래를 선도합니다', 24),
('스카일리', '스카일리', '신예린', '2024-04-07', '반도체 검사 장비 개발', 'P동 302호', '2023-02-01', 'https://www.tukorea.ac.kr', '-', true, 'portfolio', '/company-logos/스카일리', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '지속가능한 성장을 추구합니다', 25),
('퀀텀매트릭스', '퀀텀매트릭스', '한도윤', '2021-05-11', '디지털 트윈 시뮬레이션 소프트웨어', 'P동 311호', '2024-04-01', 'https://www.tukorea.ac.kr', '-', true, 'portfolio', '/company-logos/퀀텀매트릭스', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '글로벌 시장을 목표로 도전합니다', 26),
('액티부키', '액티부키', '윤지원', '2019-06-15', '자율주행 센서 기술 개발', 'P동 313호', '2024-03-01', 'https://www.tukorea.ac.kr', '-', false, 'portfolio', '/company-logos/액티부키', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '기술과 사람을 연결합니다', 27),
('큐티뮨바이오', '큐티뮨바이오', '권지수', '2022-06-04', '메타버스 콘텐츠 플랫폼', 'P동 302호', '2023-09-01', 'https://www.tukorea.ac.kr', '-', true, 'portfolio', '/company-logos/큐티뮨바이오', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '지속가능한 성장을 추구합니다', 28),
('어플라이드서멀', '어플라이드서멀', '오세진', '2019-11-11', 'IoT 스마트홈 솔루션', 'P동 300호', '2023-02-01', 'https://www.tukorea.ac.kr', '-', false, 'portfolio', '/company-logos/어플라이드서멀', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '혁신적인 기술로 미래를 선도합니다', 29),
('크림', '크림', '오세진', '2018-04-07', 'IoT 스마트홈 솔루션', 'P동 304호', '2023-06-01', 'https://www.tukorea.ac.kr', '-', false, 'portfolio', '/company-logos/크림', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '산업의 디지털 전환을 이끕니다', 30),
('에버트레져', '에버트레져', '조은비', '2022-09-16', '신재생에너지 발전 시스템', 'P동 312호', '2023-05-01', 'https://www.tukorea.ac.kr', '-', false, 'portfolio', '/company-logos/에버트레져', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '지속가능한 성장을 추구합니다', 31),
('프로미엘', '프로미엘', '신예린', '2023-02-09', '반도체 검사 장비 개발', 'P동 318호', '2023-01-01', 'https://www.tukorea.ac.kr', '-', true, 'portfolio', '/company-logos/프로미엘', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '기술과 사람을 연결합니다', 32),
('엘엠케이', '엘엠케이', '조은비', '2021-01-25', '신재생에너지 발전 시스템', 'P동 316호', '2023-04-01', 'https://www.tukorea.ac.kr', '-', false, 'portfolio', '/company-logos/엘엠케이', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', '글로벌 시장을 목표로 도전합니다', 33)
on conflict (id) do nothing;

insert into public.popups (id, title, image, content, link, start_date, end_date, is_visible) values
(1, '2025 입주기업 모집', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop', null, 'https://www.tukorea.ac.kr', '2025-01-20', '2025-03-30', true)
on conflict (id) do nothing;
select setval(pg_get_serial_sequence('public.popups', 'id'), greatest((select max(id) from public.popups), 1));
