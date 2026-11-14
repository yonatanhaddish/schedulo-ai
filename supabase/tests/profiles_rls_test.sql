begin;

select plan(9);

insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at
)
values
  (
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'owner@example.com',
    '',
    now(),
    '{"display_name":"Owner Example"}'::jsonb,
    now(),
    now()
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'stranger@example.com',
    '',
    now(),
    '{"display_name":"Stranger Example"}'::jsonb,
    now(),
    now()
  );

select is(
  (
    select display_name
    from public.profiles
    where id = '11111111-1111-1111-1111-111111111111'
  ),
  'Owner Example',
  'the auth trigger creates the owner profile'
);

select is(
  (
    select display_name
    from public.profiles
    where id = '22222222-2222-2222-2222-222222222222'
  ),
  'Stranger Example',
  'the auth trigger creates the stranger profile'
);

set local role anon;

select throws_ok(
  $$select * from public.profiles$$,
  '42501',
  null,
  'anonymous users cannot read profiles'
);

reset role;
set local role authenticated;
set local request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';

select results_eq(
  $$select display_name from public.profiles order by id$$,
  array['Owner Example'::text],
  'the owner reads only their profile'
);

select results_eq(
  $$
    update public.profiles
    set display_name = 'Updated Owner'
    where id = '11111111-1111-1111-1111-111111111111'
    returning display_name
  $$,
  array['Updated Owner'::text],
  'the owner updates their display name'
);

select throws_ok(
  $$
    insert into public.profiles (id, display_name)
    values ('33333333-3333-3333-3333-333333333333', 'Injected')
  $$,
  '42501',
  null,
  'authenticated users cannot insert profiles directly'
);

set local request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';

select is_empty(
  $$
    select display_name
    from public.profiles
    where id = '11111111-1111-1111-1111-111111111111'
  $$,
  'another user cannot read the owner profile'
);

select is_empty(
  $$
    update public.profiles
    set display_name = 'Stolen Name'
    where id = '11111111-1111-1111-1111-111111111111'
    returning display_name
  $$,
  'another user cannot update the owner profile'
);

select throws_ok(
  $$delete from public.profiles$$,
  '42501',
  null,
  'authenticated users cannot delete profiles'
);

select * from finish();
rollback;
