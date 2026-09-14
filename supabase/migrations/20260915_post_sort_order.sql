-- Q&A 등 게시글 노출 순서
alter table public.posts
    add column if not exists sort_order integer not null default 0;

-- 기존 Q&A는 현재 id 순서를 초기 노출 순서로 사용
update public.posts p
set sort_order = o.rn
from (
    select id, (row_number() over (order by id) - 1)::integer as rn
    from public.posts
    where category = 'faq'
) o
where p.id = o.id
  and p.category = 'faq';

create index if not exists posts_category_sort_idx
    on public.posts (category, sort_order, id);
