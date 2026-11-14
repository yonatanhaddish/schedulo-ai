begin;

drop trigger if exists on_auth_user_created_profile on auth.users;
drop table if exists public.profiles cascade;
drop function if exists public.handle_new_auth_user_profile();
drop function if exists public.set_profile_updated_at();

commit;
