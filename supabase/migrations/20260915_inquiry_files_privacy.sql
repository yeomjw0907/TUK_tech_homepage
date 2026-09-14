-- IR·자회사 접수: 첨부파일, 개인정보 동의 저장
alter table public.inquiries
    add column if not exists files jsonb not null default '[]'::jsonb;

alter table public.inquiries
    add column if not exists privacy_agreed boolean not null default false;

-- 비로그인 방문자가 inquiries/ 경로에만 파일 업로드 가능
drop policy if exists "inquiries public upload" on storage.objects;
create policy "inquiries public upload"
on storage.objects
for insert
to anon, authenticated
with check (
    bucket_id = 'uploads'
    and split_part(name, '/', 1) = 'inquiries'
);
