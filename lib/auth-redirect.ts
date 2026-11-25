export function getAdminRedirectTo(value: unknown): string {
  if (
    typeof value === 'string'
    && (value === '/admin' || (value.startsWith('/admin/') && !value.includes('\\')))
  ) {
    return value;
  }

  return '/admin';
}
