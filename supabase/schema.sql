-- Acadvizen Academy assessment database schema
-- Run this entire file in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.courses (
  id text primary key,
  title text not null,
  category text not null,
  level text not null default 'Beginner',
  duration text not null default 'Self-paced',
  price numeric(10,2) not null default 0 check (price >= 0),
  short_description text not null,
  description text not null,
  image_url text,
  icon_key text not null default 'code',
  art text not null default 'art-purple',
  featured boolean not null default false,
  skills text[] not null default '{}',
  curriculum text[] not null default '{}',
  published boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  email text not null check (char_length(trim(email)) <= 254),
  subject text not null default 'Course enquiry' check (char_length(subject) <= 200),
  message text not null check (char_length(trim(message)) between 10 and 5000),
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;
alter table public.contact_messages enable row level security;

-- Public visitors can only read published courses. No public write policy is provided.
drop policy if exists "Anyone can read published courses" on public.courses;
create policy "Anyone can read published courses"
  on public.courses for select
  to anon, authenticated
  using (published = true);

-- Contact form submissions are allowed for anonymous visitors. RLS restricts this
-- role to INSERT only; visitors cannot read messages. For production, add CAPTCHA,
-- server-side rate limiting, and abuse monitoring before exposing the form publicly.
drop policy if exists "Public can submit contact messages" on public.contact_messages;
create policy "Public can submit contact messages"
  on public.contact_messages for insert
  to anon, authenticated
  with check (
    char_length(trim(name)) between 2 and 120
    and char_length(trim(email)) between 3 and 254
    and char_length(trim(message)) between 10 and 5000
  );

-- Keep table privileges aligned with the RLS policies.
grant select on public.courses to anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;
revoke all on public.contact_messages from anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;

-- Sample assessment content. These are illustrative courses and prices, not a claim
-- that these exact courses/prices are officially offered by Acadvizen.
insert into public.courses
(id,title,category,level,duration,price,short_description,description,icon_key,art,featured,skills,curriculum,published,sort_order)
values
('digital-marketing-ai','Digital Marketing with AI','Business','Beginner friendly','8 weeks',12999,'Learn modern marketing strategy, content workflows, analytics and practical AI tools.','Build a strong foundation in digital marketing and learn how AI tools can support research, content planning, campaign optimization and performance reporting.','megaphone','art-purple',true,array['Digital marketing fundamentals','SEO and content strategy','Social media campaigns','AI-assisted content workflows','Analytics and campaign reporting'],array['Marketing foundations and audience research','SEO, content and social media','Paid campaign planning','AI tools and responsible workflows','Analytics, reporting and capstone project'],true,1),
('web-development','Web Development Fundamentals','Technology','Beginner','10 weeks',14999,'Create responsive websites and learn the foundations of modern frontend development.','Get hands-on with HTML, CSS, JavaScript and React concepts as you build a portfolio-ready website from the ground up.','code','art-mint',true,array['HTML and semantic structure','CSS and responsive layouts','JavaScript fundamentals','React components','Git and deployment basics'],array['HTML and accessible page structure','CSS, layout and responsive design','JavaScript fundamentals','React components and state','Portfolio project and deployment'],true,2),
('ui-ux-design','UI/UX Design Essentials','Design','Beginner','6 weeks',9999,'Turn user problems into thoughtful, usable digital experiences and polished prototypes.','Explore user research, information architecture, wireframing, visual design and prototyping through a practical design project.','palette','art-peach',true,array['User research','Journey mapping','Wireframing','Visual design systems','Interactive prototyping'],array['Design thinking and user research','Personas and journey mapping','Wireframes and information architecture','UI patterns and design systems','Prototype, test and present'],true,3),
('ai-tools-professionals','AI Tools for Professionals','Technology','All levels','4 weeks',6999,'Use generative AI thoughtfully to research, write, plan and improve everyday workflows.','Learn practical prompt design, evaluate AI outputs and build repeatable workflows for common professional tasks.','bot','art-blue',false,array['Prompt design','Output evaluation','Research workflows','Productivity automation','AI safety basics'],array['How generative AI works','Prompting patterns and iteration','Research and writing workflows','Automation and productivity','Responsible use and final workflow'],true,4),
('performance-marketing','Performance Marketing','Business','Intermediate','7 weeks',11999,'Understand campaign objectives, audience targeting, conversion metrics and optimization.','Learn how to plan measurable marketing campaigns, interpret performance indicators and make data-informed improvements.','trending-up','art-yellow',false,array['Campaign objectives','Audience segmentation','Conversion tracking','Budget planning','Performance analysis'],array['Campaign strategy and objectives','Audience and creative planning','Tracking and measurement','Optimization and testing','Reporting and campaign presentation'],true,5),
('career-readiness','Career Readiness & Interview Skills','Career Development','All levels','3 weeks',4999,'Prepare a stronger portfolio, communicate your value and practise interview scenarios.','Create a focused career plan, improve your professional profile and practise structured responses to common interview questions.','briefcase','art-pink',false,array['Resume and portfolio basics','Professional communication','Interview practice','Career planning','Job-search organization'],array['Career goals and role research','Resume and portfolio workshop','Professional communication','Interview practice and feedback','Personal action plan'],true,6)
on conflict (id) do update set
  title=excluded.title, category=excluded.category, level=excluded.level,
  duration=excluded.duration, price=excluded.price,
  short_description=excluded.short_description, description=excluded.description,
  icon_key=excluded.icon_key, art=excluded.art, featured=excluded.featured,
  skills=excluded.skills, curriculum=excluded.curriculum,
  published=excluded.published, sort_order=excluded.sort_order,
  updated_at=now();
