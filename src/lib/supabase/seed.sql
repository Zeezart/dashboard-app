insert into public.role_permissions (role, permission)
values
  ('admin', 'books.delete'),
  ('admin', 'books.update'),
  ('admin', 'books.create'),
  ('admin', 'books.read'),
  ('admin', 'member.read'),
  ('admin', 'member.delete'),
  ('admin', 'member.create'),
  ('admin', 'member.update'),
  ('user', 'books.update'),
  ('user', 'books.create'),
  ('user', 'books.read'),
  ('user', 'books.delete');